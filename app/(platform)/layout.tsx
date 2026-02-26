import { cookies } from 'next/headers';
import { Sidebar } from '@/components/layout';

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sidebarExpanded = cookieStore.get('sidebar-expanded')?.value === 'true';

  return (
    <div className="min-h-screen flex">
      <Sidebar defaultExpanded={sidebarExpanded} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
