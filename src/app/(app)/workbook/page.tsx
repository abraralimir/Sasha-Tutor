
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Bot, Loader2, Sparkles, BrainCircuit, GripVertical, Plus, Trash2, Calculator, Sheet, FileText, Upload } from 'lucide-react';
import { completeNote, extractTextFromImage } from '@/lib/actions';
import { PageHeader } from '@/components/page-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Scientific Calculator Component ---
const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setExpression('');
    } else if (value === '=') {
      try {
        // Basic eval, not safe for production with arbitrary user input, but fine for a calculator.
        const result = new Function('return ' + expression.replace('^', '**').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/log/g, 'Math.log10').replace(/sqrt/g, 'Math.sqrt'))();
        setDisplay(String(result));
        setExpression(String(result));
      } catch (error) {
        setDisplay('Error');
        setExpression('');
      }
    } else if (value === 'DEL') {
        setExpression(prev => prev.slice(0, -1));
        setDisplay(prev => prev.slice(0,-1) || '0');
    }
    else {
      setExpression(prev => {
        // Handle function inputs
        if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(value)) {
            return prev + `${value}(`;
        }
        return prev + value;
      });
      setDisplay(prev => (prev === '0' || prev === 'Error' ? value : prev + value));
    }
  };

  const buttons = [
    'sin', 'cos', 'tan', 'C',
    'log', 'sqrt', '^', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '(', '0', ')', '=',
  ];

  return (
    <Card className="max-w-xs mx-auto shadow-lg">
        <CardHeader>
            <CardTitle>Scientific Calculator</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="bg-muted text-right p-4 rounded-lg mb-4">
                <p className="text-xs text-muted-foreground break-all">{expression || ' '}</p>
                <p className="text-3xl font-bold break-all">{display}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {buttons.map((btn) => (
                <Button
                    key={btn}
                    onClick={() => handleButtonClick(btn)}
                    variant={['C', '=', '*', '/', '-', '+', '^'].includes(btn) ? 'secondary' : 'outline'}
                    className="text-lg font-bold h-14"
                >
                    {btn}
                </Button>
                ))}
                 <Button
                    onClick={() => handleButtonClick('DEL')}
                    variant="destructive"
                    className="text-lg font-bold h-14 col-span-4"
                >
                    Delete
                </Button>
            </div>
        </CardContent>
    </Card>
  );
};


// --- Spreadsheet Component ---
const Spreadsheet = () => {
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(5);
    const [data, setData] = useState<Record<string, string>>({});
    const [evaluatedData, setEvaluatedData] = useState<Record<string, string>>({});

    const getCellId = (rowIndex: number, colIndex: number) => `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;

    const evaluateCell = (cellId: string, currentData: Record<string, string>): string => {
        const cellValue = currentData[cellId] || '';
        if (cellValue.startsWith('=')) {
            try {
                const formula = cellValue.substring(1).replace(/[A-Z]+\d+/g, (match) => {
                    // Prevent circular references
                    if (match === cellId) throw new Error('Circular reference');
                    return `(${evaluateCell(match, currentData) || '0'})`;
                });
                return String(new Function('return ' + formula)());
            } catch (error) {
                return '#ERROR';
            }
        }
        return cellValue;
    };

    useEffect(() => {
        const newEvaluatedData: Record<string, string> = {};
        Object.keys(data).forEach(cellId => {
            newEvaluatedData[cellId] = evaluateCell(cellId, data);
        });
        setEvaluatedData(newEvaluatedData);
    }, [data, rows, cols]);

    const handleCellChange = (cellId: string, value: string) => {
        setData(prev => ({ ...prev, [cellId]: value }));
    };

    const addRow = () => setRows(r => r + 1);
    const removeRow = () => setRows(r => Math.max(1, r - 1));
    const addCol = () => setCols(c => c + 1);
    const removeCol = () => setCols(c => Math.max(1, c - 1));

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Spreadsheet</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    <Button onClick={addRow} size="sm"><Plus className="mr-2"/> Add Row</Button>
                    <Button onClick={removeRow} size="sm" variant="outline" disabled={rows <= 1}><Trash2 className="mr-2"/> Remove Row</Button>
                    <Button onClick={addCol} size="sm"><Plus className="mr-2"/> Add Column</Button>
                    <Button onClick={removeCol} size="sm" variant="outline" disabled={cols <= 1}><Trash2 className="mr-2"/> Remove Column</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="border-collapse w-full">
                        <thead>
                            <tr>
                                <th className="border p-2 bg-muted w-12"></th>
                                {Array.from({ length: cols }).map((_, colIndex) => (
                                    <th key={colIndex} className="border p-2 bg-muted min-w-[120px]">{String.fromCharCode(65 + colIndex)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: rows }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="border p-2 bg-muted text-center font-bold">{rowIndex + 1}</td>
                                    {Array.from({ length: cols }).map((_, colIndex) => {
                                        const cellId = getCellId(rowIndex, colIndex);
                                        return (
                                            <td key={cellId} className="border p-0">
                                                <Input
                                                    type="text"
                                                    value={data[cellId] || ''}
                                                    onChange={(e) => handleCellChange(cellId, e.target.value)}
                                                    placeholder={evaluatedData[cellId] || ''}
                                                    className="w-full h-full border-none rounded-none focus-visible:ring-1 focus-visible:ring-primary"
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

// --- Document Hub Component ---
const DocumentHub = () => {
    const [extractedText, setExtractedText] = useState('');
    const [isExtracting, setIsExtracting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // For now, only handle images. PDF/Word would require more complex libraries.
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (e.g., PNG, JPG, WEBP).');
            return;
        }

        setIsExtracting(true);
        setError(null);
        setExtractedText('');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const imageDataUri = reader.result as string;
            try {
                const result = await extractTextFromImage({ imageDataUri });
                setExtractedText(result.extractedText);
                toast({ title: 'Text Extracted', description: 'The text from your image is now ready.' });
            } catch (err) {
                console.error('OCR failed', err);
                setError('Failed to extract text from the image. Please try again.');
            } finally {
                setIsExtracting(false);
            }
        };
        reader.onerror = () => {
            setError('Failed to read the file.');
            setIsExtracting(false);
        };
    };

    const handleAutocomplete = async () => {
        if (!extractedText) return;
        setIsCompleting(true);
        try {
            const result = await completeNote({ text: extractedText });
            setExtractedText(prev => prev + result.completion);
            toast({
                title: 'Notes Completed',
                description: 'Sasha has helped organize your extracted text.',
            });
        } catch (error) {
            console.error('Failed to get completion', error);
            toast({
                title: 'Error',
                description: 'An error occurred while completing the text.',
                variant: 'destructive',
            });
        } finally {
            setIsCompleting(false);
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Hub</CardTitle>
                <CardDescription>
                    Upload an image of a document to extract its text, then let AI turn it into comprehensive notes.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                     <Upload className="w-10 h-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop or click to upload an image</p>
                    <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" disabled={isExtracting} />
                    <label htmlFor="file-upload" className="mt-2">
                        <Button asChild variant="outline" disabled={isExtracting}>
                            <span>{isExtracting ? "Processing..." : "Select File"}</span>
                        </Button>
                    </label>
                </div>

                {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                
                {(isExtracting || extractedText) && (
                     <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Extracted Text</h3>
                        <Textarea
                        value={isExtracting ? "AI is reading your document..." : extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        placeholder="Extracted text will appear here..."
                        className="h-96 resize-none font-body text-base"
                        disabled={isExtracting}
                        />
                        <div className="flex justify-end">
                            <Button onClick={handleAutocomplete} disabled={isCompleting || !extractedText || isExtracting}>
                            {isCompleting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            {isCompleting ? 'Organizing...' : 'Autocomplete with AI'}
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}


export default function WorkbookPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleAutocomplete = async () => {
    if (!notes) return;
    setIsLoading(true);
    try {
      const result = await completeNote({ text: notes });
      setNotes(prev => prev + result.completion);
      toast({
        title: "Text Completed",
        description: "Sasha has helped complete your notes.",
      });
    } catch (error) {
      console.error('Failed to get completion', error);
      toast({
        title: "Error",
        description: "Sorry, an error occurred while trying to complete the text.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="AI Workbook"
        description="Your personal canvas for learning with powerful tools at your fingertips."
      />
      <main className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="notes" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notes"><FileText className="mr-2"/>Notes</TabsTrigger>
            <TabsTrigger value="hub"><BrainCircuit className="mr-2"/>Document Hub</TabsTrigger>
            <TabsTrigger value="calculator"><Calculator className="mr-2"/>Calculator</TabsTrigger>
            <TabsTrigger value="spreadsheet"><Sheet className="mr-2"/>Spreadsheet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-6">
             <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">My Notes</h2>
                <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Start writing your notes here... Sasha can help you finish them!"
                className="h-96 resize-none font-body text-base"
                autoComplete="off"
                />
                <div className="flex justify-end">
                    <Button onClick={handleAutocomplete} disabled={isLoading || !notes}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {isLoading ? 'Thinking...' : 'Autocomplete with AI'}
                    </Button>
                </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hub" className="mt-6">
            <DocumentHub />
          </TabsContent>

          <TabsContent value="calculator" className="mt-6">
             <ScientificCalculator />
          </TabsContent>
          
          <TabsContent value="spreadsheet" className="mt-6">
            <Spreadsheet />
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
