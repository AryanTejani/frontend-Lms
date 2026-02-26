import { env } from '@/config';

interface StreamChatParams {
  tutorProfile: string;
  message: string;
  history: Array<{ role: 'user' | 'model'; text: string }>;
  language: string;
  image?: { base64: string; mimeType: string };
}

export async function streamChat(params: StreamChatParams): Promise<Response> {
  const res = await fetch(`${env.API_URL}/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.status}`);
  }

  return res;
}

interface GenerateQuizParams {
  tutorProfile: string;
  topic: string;
  language: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export async function generateQuiz(params: GenerateQuizParams): Promise<QuizData> {
  const res = await fetch(`${env.API_URL}/assistant/generate-quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(`Quiz generation failed: ${res.status}`);
  }

  return res.json() as Promise<QuizData>;
}
