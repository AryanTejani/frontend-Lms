# VidyaSetu Frontend — Student Portal

The student-facing web application for **VidyaSetu**, an AI-powered multilingual learning platform for rural India (PS18 Track 4). Built with Next.js 16 and connects to the [Backend API](../traderlion-platform-backend/) on port 5000 via session cookies.

---

## Prerequisites

- **Node.js** 20+
- **Backend** running on port 5000 (see [backend README](../traderlion-platform-backend/README.md))

---

## Tech Stack

| Item | Detail |
| :--- | :--- |
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| State | Zustand + TanStack React Query |
| i18n | `next-intl` (Hindi, Telugu, English) |
| Validation | Zod |
| HTTP Client | Axios (custom `@/lib/fetch.client`) |
| Auth | Cookie-based sessions (`session_id`) |
| React | 19 |
| Dev Port | **3000** |

---

## Project Structure

```
app/
├── (auth)/                # Sign-in, sign-up, password reset
├── (onboarding)/          # Multi-step onboarding wizard
├── (platform)/            # Authenticated pages (dashboard, courses, AI tutor)
├── (payment)/             # Subscription plan picker, success page
└── api/                   # API routes (auth callbacks)

src/
├── features/              # Feature modules (domain logic + UI)
│   ├── academy/           # Course catalogue, lessons, quizzes
│   ├── account/           # User profile, preferences, theme
│   ├── assistant/         # AI Tutor chat interface
│   ├── auth/              # Login, signup, OAuth, password reset
│   ├── dashboard/         # Home page with progress
│   ├── onboarding/        # Language, grade, subjects wizard
│   ├── payment/           # Stripe checkout, plans
│   └── videos/            # Video browsing
├── components/ui/         # Shared UI components (Button, TextField, Badge, etc.)
├── lib/                   # Fetch client, helpers
├── stores/                # Zustand stores (UI state)
└── styles/globals.css     # Design tokens (CSS variables)
```

---

## Page Routes

### Auth — `app/(auth)/`

| URL | Description |
| :--- | :--- |
| `/sign-in` | Email/password login form + Google OAuth button |
| `/sign-up` | New account registration |
| `/forgot-password` | Request password reset email |
| `/reset-password` | Enter new password using email token |
| `/reset-password-required` | Forced reset screen when `PASSWORD_RESET_REQUIRED` error occurs |
| `/callback` | Google OAuth callback handler (reads `?success=true&isNewUser=...`) |

### Onboarding — `app/(onboarding)/`

| URL | Description |
| :--- | :--- |
| `/onboarding` | Multi-step wizard: language, age, grade, subjects, learning goals |

### Platform — `app/(platform)/`

| URL | Description |
| :--- | :--- |
| `/dashboard` | Logged-in home: subscription status, enrolled courses, progress |
| `/academy` | Full course catalogue (paginated grid) |
| `/academy/[slug]` | Course detail: description, sections, lessons list, purchase CTA |
| `/academy/[slug]/lessons/[lessonId]` | Video/text lesson viewer with Bunny CDN embed |
| `/academy/[slug]/quizzes/[quizId]` | Interactive quiz with multiple-choice questions, timer, score |
| `/videos` | Browse all individual video clips (not course-bound) |
| `/assistant` | AI Tutor chat interface — 4 subject profiles |
| `/account` | User profile, language preferences, subscription management |

### Payment — `app/(payment)/`

| URL | Description |
| :--- | :--- |
| `/payment` | Subscription plan picker (Free/Standard/Premium cards) |
| `/payment/success` | Post-checkout success/confirmation screen |

---

## API Calls by Feature

All calls go to `NEXT_PUBLIC_API_URL` (default: `http://localhost:5000`).

### Auth Feature (`src/features/auth/client/api.ts`)

| Function | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| `signUp` | `POST` | `/auth/signup` | Register + receive session cookie |
| `signIn` | `POST` | `/auth/login` | Login + receive session cookie |
| `logout` | `POST` | `/auth/logout` | Clear session |
| `getCurrentUser` | `GET` | `/auth/me` | Fetch authenticated user details |
| `getGoogleAuthUrl` | `GET` | `/auth/google` | Get Google OAuth redirect URL |
| `requestPasswordReset` | `POST` | `/auth/forgot-password` | Send reset email |
| `resetPassword` | `POST` | `/auth/forgot-password/reset` | Set new password with token |

### Academy Feature (`src/features/academy/client/api.ts`)

| Function | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| `fetchCourses` | `GET` | `/courses` | List all published courses |
| `fetchCourse` | `GET` | `/courses/:slug` | Get course with sections/lessons/purchase status |
| `fetchLesson` | `GET` | `/courses/:slug/lessons/:lessonId` | Get lesson content + video embed URL |
| `fetchTopic` | `GET` | `/courses/:slug/topics/:topicId` | Get a topic (sub-lesson text content) |
| `fetchQuizzes` | `GET` | `/courses/:slug/quizzes` | List all quizzes for a course |
| `fetchQuiz` | `GET` | `/courses/:slug/quizzes/:quizId` | Get quiz with questions and answer options |
| `createCourseCheckoutSession` | `POST` | `/checkout/course-session` | One-time purchase checkout for a single course |

### Payment Feature (`src/features/payment/api/index.ts`)

| Function | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| `getPlans` | `GET` | `/plans` | List all active subscription plans |
| `createCheckoutSession` | `POST` | `/checkout/session` | Stripe sub checkout. Body: `{ price_id, promotion_code? }` |
| `createPortalSession` | `POST` | `/checkout/portal` | Open Stripe billing/manage portal |
| `getSubscriptionStatus` | `GET` | `/checkout/subscription-status` | Current sub status, plan name, expiry |

### Videos Feature (`src/features/videos/client/api.ts`)

| Function | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| `fetchVideos` | `GET` | `/videos` | List videos. Query: `?page&limit&category_id` |

### Onboarding Feature (`src/features/onboarding/client/api.ts`)

| Function | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| `saveOnboarding` | `POST` | `/customers/me/onboarding` | Save full onboarding data |
| `updateLanguagePreference` | `PATCH` | `/customers/me/preferences` | Update language after first setup |

---

## AI Assistant

The `/assistant` page embeds a subject-specific AI tutor chat interface. Profiles are client-side only (no backend call) — they configure the AI persona.

| Tutor Persona | Subjects |
| :--- | :--- |
| Maths AI | Arithmetic, Fractions, Geometry, Mental Math |
| Science AI | Biology, Physics, Chemistry (NCERT 1-8) |
| Language AI | Hindi, Telugu, Tamil, Marathi reading & writing |
| Social AI | History, Geography, Civics (NCERT 3-8) |

---

## Auth Flow

1. User lands → middleware checks `session_id` cookie → redirect to `/sign-in` if missing.
2. Login/signup → backend sets `session_id` HttpOnly cookie.
3. Google OAuth → redirects to `/auth/google` backend → redirects to `/callback?success=true`.
4. Session validated server-side on every protected route via `get-session.ts` Server Action.

---

## i18n

`next-intl` with message files in `messages/` supporting:
- `en` (English)
- `hi` (Hindi)
- `te` (Telugu)

Language is user-selected at onboarding and persisted via the backend `preferences` endpoint.

---

## Environment Variables

| Variable | Default | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Backend Core API base URL |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | This app's public URL |

---

## Running Locally

```bash
# 1. Create .env file
cp .env.example .env
# Or create manually:
#   NEXT_PUBLIC_API_URL=http://localhost:5000
#   NEXT_PUBLIC_APP_URL=http://localhost:3000

# 2. Install and run
npm install
npm run dev   # Starts on http://localhost:3000
```

Make sure the backend is running on port 5000 before starting the frontend.
