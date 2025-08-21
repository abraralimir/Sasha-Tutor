import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export default function ResourcesRedirectPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Resource Hub"
        description="This page has moved."
      />
      <main className="flex-1 overflow-auto p-6 flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold">The Resource Hub is now the Learning Path</h2>
          <p className="mt-2 text-muted-foreground">All learning content is now organized in a structured, chapter-by-chapter course.</p>
          <Link href="/learning-path" className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Go to Learning Path
          </Link>
        </div>
      </main>
    </div>
  );
}
