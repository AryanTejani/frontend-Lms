import { cookies } from 'next/headers';
import { AssistantLayoutClient } from './AssistantLayoutClient';

export default async function AssistantLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sidebarExpanded = cookieStore.get('ai-sidebar-expanded')?.value === 'true';

  return (
    <AssistantLayoutClient defaultSidebarExpanded={sidebarExpanded}>
      {children}
    </AssistantLayoutClient>
  );
}
