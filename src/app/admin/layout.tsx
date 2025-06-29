import Header from '@/components/layout/header';
import AdminSidebar from './components/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            <AdminSidebar />
            <div>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
