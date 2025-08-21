import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const jupyterCells = [
  {
    type: 'markdown',
    content:
      '# Introduction to List Comprehensions\n\nList comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence or iterable, or to create a subsequence of those elements that satisfy a certain condition.',
  },
  {
    type: 'code',
    input: `squares = []
for x in range(10):
    squares.append(x**2)
    
print(squares)`,
    output: '[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]',
  },
  {
    type: 'markdown',
    content:
      'The above code can be written more concisely using a list comprehension:',
  },
  {
    type: 'code',
    input: `squares = [x**2 for x in range(10)]
print(squares)`,
    output: '[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]',
  },
  {
    type: 'markdown',
    content:
      '## List Comprehensions with a Condition\n\nYou can also add a conditional statement to filter elements.',
  },
  {
    type: 'code',
    input: `even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)`,
    output: '[0, 4, 16, 36, 64]',
  },
];

export default function JupyterPathPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Jupyter Learning Path"
        description="Experience interactive, cell-by-cell Python exercises."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {jupyterCells.map((cell, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                {cell.type === 'markdown' ? (
                  <div
                    className="prose prose-sm max-w-none p-6"
                    dangerouslySetInnerHTML={{ __html: cell.content }}
                  />
                ) : (
                  <div>
                    <div className="p-4 bg-muted/50">
                        <Badge variant="outline">In [{index}]</Badge>
                        <pre className="mt-2 bg-background p-4 rounded-md overflow-x-auto">
                            <code className="language-python font-code">{cell.input}</code>
                        </pre>
                    </div>
                    <div className="p-4 border-t">
                        <Badge variant="secondary">Out [{index}]</Badge>
                         <pre className="mt-2 text-muted-foreground">
                            <code>{cell.output}</code>
                        </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
