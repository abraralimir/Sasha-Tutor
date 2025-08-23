
import { PageHeader } from '@/components/page-header';

export default function AdminPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Admin Dashboard"
        description="Manage your learning content here."
      />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <p>Welcome to the admin area. Content management features will be added here.</p>
        </div>
      </main>
    </div>
  );
}
