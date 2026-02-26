const STORAGE_KEY = 'vidyasetu_chats';

export interface StoredMessage {
  role: 'user' | 'model';
  text: string;
  quiz?: { title: string; questions: Array<{ question: string; options: string[]; correctIndex: number }> };
}

export interface StoredConversation {
  id: string;
  tutorProfile: string;
  title: string;
  messages: StoredMessage[];
  updatedAt: number;
}

function getAll(): Record<string, StoredConversation> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredConversation>) : {};
  } catch {
    return {};
  }
}

function setAll(data: Record<string, StoredConversation>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveConversation(id: string, messages: StoredMessage[], tutorProfile: string): void {
  const all = getAll();
  const firstUserMsg = messages.find((m) => m.role === 'user');
  const title = firstUserMsg ? firstUserMsg.text.slice(0, 60) : 'New Chat';

  all[id] = { id, tutorProfile, title, messages, updatedAt: Date.now() };
  setAll(all);
}

export function loadConversation(id: string): StoredConversation | null {
  const all = getAll();
  return all[id] ?? null;
}

export function listConversations(): StoredConversation[] {
  const all = getAll();
  return Object.values(all).sort((a, b) => b.updatedAt - a.updatedAt);
}

export function deleteConversation(id: string): void {
  const all = getAll();
  delete all[id];
  setAll(all);
}
