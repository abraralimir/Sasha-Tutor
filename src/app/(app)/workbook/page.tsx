
import { PageHeader } from "@/components/page-header";
import { Bot, DraftingCompass, Pencil } from "lucide-react";

export default function WorkbookPage() {
    return (
        <div className="flex flex-col h-full">
            <PageHeader
                title="AI Workbook"
                description="Your personal canvas for learning and creativity."
            />
            <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
                <div className="text-center">
                     <div className="inline-flex p-4 bg-muted rounded-full">
                        <DraftingCompass className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold">The Workbook is Coming Soon</h2>
                    <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                        This will be your interactive space with draggable tools, a live IDE, and AI assistance to tackle any learning challenge.
                    </p>
                </div>
            </main>
        </div>
    );
}
