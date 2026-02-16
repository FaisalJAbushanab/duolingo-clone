# CLAUDE.md - Qudlab (معمل القدرات) Complete Project Reference

> **Arabic aptitude training platform** built as a Duolingo-style interactive learning app.
> This document is the single source of truth for all project architecture, design patterns, UI/UX components, backend connections, and database schema.
>
> **See also:** [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for detailed UI/UX styling guidelines with exact component examples, color system, typography, animations, and interaction patterns.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Environment Variables](#3-environment-variables)
4. [Database Schema](#4-database-schema)
5. [Authentication & Middleware](#5-authentication--middleware)
6. [Routing & Pages](#6-routing--pages)
7. [UI Component Library](#7-ui-component-library)
8. [Application Components](#8-application-components)
9. [Modals & State Management](#9-modals--state-management)
10. [Server Actions](#10-server-actions)
11. [API Routes (Admin CRUD)](#11-api-routes-admin-crud)
12. [Data Fetching & Queries](#12-data-fetching--queries)
13. [Stripe Payment Integration](#13-stripe-payment-integration)
14. [Styling & Design System](#14-styling--design-system)
15. [Animations & Interactions](#15-animations--interactions)
16. [Audio System](#16-audio-system)
17. [Business Logic](#17-business-logic)
18. [Admin Panel](#18-admin-panel)
19. [Scripts & Commands](#19-scripts--commands)
20. [Public Assets](#20-public-assets)
21. [Design Patterns Summary](#21-design-patterns-summary)

---

## 1. Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 14.2.33 |
| **Language** | TypeScript | 5.x |
| **UI Library** | React | 18.x |
| **Styling** | Tailwind CSS + PostCSS + Autoprefixer | 3.3.0 |
| **UI Primitives** | Radix UI (shadcn/ui) | Various |
| **Database** | PostgreSQL (Neon Serverless) | - |
| **ORM** | Drizzle ORM | 0.44.2 |
| **Auth** | Clerk | 6.22.0 |
| **Payments** | Stripe | 14.22.0 |
| **State Management** | Zustand | 4.5.2 |
| **Data Fetching** | React cache() + Server Components | - |
| **Admin Panel** | React Admin | 4.16.20 |
| **Icons** | Lucide React | 0.359.0 |
| **Toasts** | Sonner | 1.4.32 |
| **Animations** | tailwindcss-animate, react-confetti | - |
| **Progress Bars** | react-circular-progressbar | 2.1.0 |
| **Utilities** | react-use, clsx, tailwind-merge, CVA | - |
| **Font** | IBM Plex Sans Arabic (Google Fonts) | - |
| **Direction** | RTL (Arabic) | - |

---

## 2. Project Structure

```
duolingo-clone/
├── actions/                          # Server Actions (mutations)
│   ├── challenge-progress.ts         #   Challenge completion logic
│   ├── user-progress.ts              #   Course selection, hearts, points
│   └── user-subscription.ts          #   Stripe checkout/portal URLs
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    #   Root layout (Clerk, font, modals, toaster)
│   ├── globals.css                   #   Tailwind + CSS variables (light/dark)
│   │
│   ├── (marketing)/                  # PUBLIC - Landing page group
│   │   ├── layout.tsx                #   Header + Footer wrapper
│   │   ├── page.tsx                  #   Hero, CTA buttons, auth-aware
│   │   ├── header.tsx                #   Logo + Clerk auth buttons
│   │   └── footer.tsx                #   Feature buttons (desktop only)
│   │
│   ├── (auth)/                       # PUBLIC - Authentication group
│   │   ├── layout.tsx                #   Centered auth layout
│   │   ├── header.tsx                #   Logo + sign-in button
│   │   ├── sign-in/[[...sign-in]]/page.tsx   # Clerk SignIn
│   │   └── sign-up/[[...sign-up]]/page.tsx   # Clerk SignUp
│   │
│   ├── (main)/                       # PROTECTED - Main app group
│   │   ├── layout.tsx                #   Sidebar + MobileHeader wrapper
│   │   ├── courses/                  #   Course selection
│   │   │   ├── page.tsx              #     Server: getCourses + getUserProgress
│   │   │   ├── list.tsx              #     Client: course grid with selection
│   │   │   ├── card.tsx              #     Course card with active indicator
│   │   │   └── loading.tsx           #     Spinner fallback
│   │   ├── learn/                    #   Main learning dashboard
│   │   │   ├── page.tsx              #     Server: units, progress, subscription
│   │   │   ├── header.tsx            #     Back button + course title
│   │   │   ├── unit.tsx              #     Unit with banner + lesson buttons
│   │   │   ├── unit-banner.tsx       #     Green banner with continue button
│   │   │   ├── lesson-button.tsx     #     Client: circular progress, wavy path
│   │   │   └── loading.tsx           #     Spinner fallback
│   │   ├── leaderboard/              #   Top 10 users by points
│   │   │   ├── page.tsx              #     Server: getTopTenUsers
│   │   │   └── loading.tsx           #     Spinner fallback
│   │   ├── quests/                   #   Point-based quests with progress bars
│   │   │   ├── page.tsx              #     Server: getUserProgress
│   │   │   └── loading.tsx           #     Spinner fallback
│   │   └── shop/                     #   Hearts refill + subscription upgrade
│   │       ├── page.tsx              #     Server: getUserProgress + subscription
│   │       ├── items.tsx             #     Client: refill/upgrade actions
│   │       └── loading.tsx           #     Spinner fallback
│   │
│   ├── lesson/                       # PROTECTED - Lesson/Quiz experience
│   │   ├── layout.tsx                #   Full-height flex wrapper
│   │   ├── page.tsx                  #   Server: current lesson (getLesson)
│   │   ├── [lessonId]/page.tsx       #   Server: specific lesson by ID
│   │   ├── quiz.tsx                  #   Client: main quiz engine (complex state)
│   │   ├── challenge.tsx             #   Challenge options grid
│   │   ├── card.tsx                  #   Client: answer card (audio, keyboard)
│   │   ├── question-bubble.tsx       #   Mascot + question speech bubble
│   │   ├── header.tsx                #   Hearts + progress bar + exit
│   │   ├── footer.tsx                #   Check/Next/Retry buttons + keyboard
│   │   └── result-card.tsx           #   Points/hearts result display
│   │
│   ├── admin/                        # ADMIN - React Admin panel
│   │   ├── page.tsx                  #   Server: admin check + dynamic import
│   │   ├── app.tsx                   #   Client: React Admin with 5 resources
│   │   ├── course/{list,create,edit}.tsx
│   │   ├── unit/{list,create,edit}.tsx
│   │   ├── lesson/{list,create,edit}.tsx
│   │   ├── challenge/{list,create,edit}.tsx
│   │   └── challengeOption/{list,create,edit}.tsx
│   │
│   └── api/                          # API Routes (Admin CRUD + Stripe webhook)
│       ├── courses/route.ts          #   GET (list), POST (create)
│       ├── courses/[courseId]/route.ts #  GET, PUT, DELETE
│       ├── units/route.ts
│       ├── units/[unitId]/route.ts
│       ├── lessons/route.ts
│       ├── lessons/[lessonId]/route.ts
│       ├── challenges/route.ts
│       ├── challenges/[challengeId]/route.ts
│       ├── challengeOptions/route.ts
│       ├── challengeOptions/[challengeOptionId]/route.ts
│       └── webhooks/stripe/route.ts  #   Stripe webhook (public)
│
├── components/                       # Shared Components
│   ├── ui/                           #   shadcn/ui primitives
│   │   ├── avatar.tsx                #     Radix Avatar (compound)
│   │   ├── button.tsx                #     CVA button (12 variants, 5 sizes)
│   │   ├── dialog.tsx                #     Radix Dialog (compound)
│   │   ├── progress.tsx              #     Radix Progress bar
│   │   ├── separator.tsx             #     Radix Separator
│   │   ├── sheet.tsx                 #     Radix Sheet (slide-out panel)
│   │   └── sonner.tsx                #     Toast notification container
│   ├── modals/                       #   Global modals (Zustand-controlled)
│   │   ├── exit-modal.tsx            #     "Are you sure?" during lesson
│   │   ├── hearts-modal.tsx          #     "Out of hearts" prompt
│   │   └── practice-modal.tsx        #     "Practice to earn hearts" info
│   ├── banner.tsx                    #   Top promotional banner (localStorage)
│   ├── feed-wrapper.tsx              #   Main content wrapper (flex-1)
│   ├── mobile-header.tsx             #   Mobile nav bar (green, lg:hidden)
│   ├── mobile-sidebar.tsx            #   Sheet-based mobile menu
│   ├── promo.tsx                     #   Upgrade to Pro card
│   ├── quests.tsx                    #   Quest progress widget
│   ├── sidebar.tsx                   #   Desktop sidebar (fixed right)
│   ├── sidebar-item.tsx              #   Client: nav item with active state
│   ├── sticky-wrapper.tsx            #   Sticky sidebar content wrapper
│   └── user-progress.tsx             #   Points + hearts + course display
│
├── db/                               # Database Layer
│   ├── schema.ts                     #   Drizzle schema (8 tables)
│   ├── drizzle.ts                    #   Neon connection + Drizzle instance
│   └── queries.ts                    #   Cached query functions (9 queries)
│
├── store/                            # Zustand Stores
│   ├── use-exit-modal.ts             #   { isOpen, open, close }
│   ├── use-hearts-modal.ts           #   { isOpen, open, close }
│   └── use-practice-modal.ts         #   { isOpen, open, close }
│
├── lib/                              # Utility Libraries
│   ├── admin.ts                      #   getIsAdmin() - Clerk admin check
│   ├── stripe.ts                     #   Stripe client instance
│   └── utils.ts                      #   cn() class merger + absoluteUrl()
│
├── config/
│   └── index.ts                      # Site metadata + links
│
├── scripts/
│   └── prod.ts                       # Database seed script
│
├── public/                           # Static Assets (SVGs, audio)
├── constants.ts                      # POINTS_TO_REFILL, MAX_HEARTS, QUESTS
├── middleware.ts                      # Clerk auth middleware
├── drizzle.config.ts                 # Drizzle Kit config
├── environment.d.ts                  # Env variable type declarations
├── next.config.mjs                   # Next.js config (CORS, images)
├── tailwind.config.ts                # Tailwind config (theme, animations)
├── tsconfig.json                     # TypeScript config (strict, @/ alias)
├── .eslintrc.js                      # ESLint + Prettier config
├── .prettierrc.json                  # Prettier config
├── components.json                   # shadcn/ui config
└── postcss.config.js                 # PostCSS plugins
```

---

## 3. Environment Variables

| Variable | Type | Description |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public | Clerk publishable key |
| `CLERK_SECRET_KEY` | Secret | Clerk server-side secret |
| `CLERK_ADMIN_IDS` | Secret | Comma-separated admin user IDs |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Public | Sign-in route (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Public | Sign-up route (`/sign-up`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Public | Post sign-in redirect (`/`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | Public | Post sign-up redirect (`/`) |
| `DATABASE_URL` | Secret | Neon PostgreSQL connection string |
| `STRIPE_API_SECRET_KEY` | Secret | Stripe API secret key |
| `STRIPE_WEBHOOK_SECRET` | Secret | Stripe webhook signing secret |
| `NEXT_PUBLIC_APP_URL` | Public | App base URL (`http://localhost:3000`) |
| `NEXT_TELEMETRY_DISABLED` | Optional | Disable Next.js telemetry (`1`) |

Type declarations: `environment.d.ts`

---

## 4. Database Schema

**Provider:** Neon Serverless PostgreSQL via `@neondatabase/serverless`
**ORM:** Drizzle ORM (`db/schema.ts`)
**Connection:** `db/drizzle.ts` using `drizzle-orm/neon-http`

### Entity Relationship Diagram

```
courses (1) ──────< units (1) ──────< lessons (1) ──────< challenges (1) ──────< challenge_options
   │                                                          │
   │                                                          │
   ▼                                                          ▼
user_progress (userId PK)                            challenge_progress
   │
   ▼
user_subscription
```

### Tables

#### `courses`
| Column | Type | Constraints |
|---|---|---|
| id | serial | PK |
| title | text | NOT NULL |
| imageSrc | text | NOT NULL |

#### `units`
| Column | Type | Constraints |
|---|---|---|
| id | serial | PK |
| title | text | NOT NULL |
| description | text | NOT NULL |
| courseId | integer | FK -> courses.id, CASCADE DELETE |
| order | integer | NOT NULL |

#### `lessons`
| Column | Type | Constraints |
|---|---|---|
| id | serial | PK |
| title | text | NOT NULL |
| unitId | integer | FK -> units.id, CASCADE DELETE |
| order | integer | NOT NULL |

#### `challenges`
| Column | Type | Constraints |
|---|---|---|
| id | serial | PK |
| lessonId | integer | FK -> lessons.id, CASCADE DELETE |
| type | enum | `"SELECT"` or `"ASSIST"`, NOT NULL |
| question | text | NOT NULL |
| order | integer | NOT NULL |

- **SELECT**: Multiple choice with images (pick the correct translation)
- **ASSIST**: Text-based assistance (identify the correct answer without images)

#### `challenge_options`
| Column | Type | Constraints |
|---|---|---|
| id | serial | PK |
| challengeId | integer | FK -> challenges.id, CASCADE DELETE |
| text | text | NOT NULL |
| correct | boolean | NOT NULL |
| imageSrc | text | nullable |
| audioSrc | text | nullable |

#### `challenge_progress`
| Column | Type | Constraints |
|---|---|---|
| id | serial | PK |
| userId | text | NOT NULL (Clerk user ID) |
| challengeId | integer | FK -> challenges.id, CASCADE DELETE |
| completed | boolean | NOT NULL, default `false` |

#### `user_progress`
| Column | Type | Constraints |
|---|---|---|
| userId | text | PK (Clerk user ID) |
| userName | text | NOT NULL, default `"User"` |
| userImageSrc | text | NOT NULL, default `"/mascot.svg"` |
| activeCourseId | integer | FK -> courses.id, CASCADE DELETE, nullable |
| hearts | integer | NOT NULL, default `5` (MAX_HEARTS) |
| points | integer | NOT NULL, default `0` |

#### `user_subscription`
| Column | Type | Constraints |
|---|---|---|
| id | serial | PK |
| userId | text | NOT NULL, UNIQUE |
| stripeCustomerId | text | NOT NULL, UNIQUE |
| stripeSubscriptionId | text | NOT NULL, UNIQUE |
| stripePriceId | text | NOT NULL |
| stripeCurrentPeriodEnd | timestamp | NOT NULL |

**Subscription active check:** `stripePriceId` exists AND `stripeCurrentPeriodEnd + 1 day > now()`

---

## 5. Authentication & Middleware

### Clerk Authentication

**Provider:** `@clerk/nextjs` v6 with Arabic localization (`@clerk/localizations`)

**Root Layout** (`app/layout.tsx`):
- `ClerkProvider` wraps entire app with `localization={arSA}`

**Middleware** (`middleware.ts`):
- Uses `clerkMiddleware()` with `createRouteMatcher()`
- **Public routes:** `/`, `/sign-in(.*)`, `/sign-up(.*)`, `/api/webhooks/stripe`
- **Protected routes:** Everything else requires authentication
- Matcher excludes static files (`_next`, images, etc.)

### Admin Authorization

**File:** `lib/admin.ts`

```typescript
getIsAdmin(): boolean
// Reads CLERK_ADMIN_IDS env var (comma+space separated)
// Checks if current Clerk userId is in the list
```

Used by: All API routes (`app/api/**`)

### Auth State in Components

| Component | Clerk Elements Used |
|---|---|
| Marketing Header | `ClerkLoading`, `ClerkLoaded`, `SignedOut` -> `SignInButton`, `SignedIn` -> `UserButton` |
| Marketing Page | `ClerkLoading`, `ClerkLoaded`, `SignedOut`, `SignedIn`, `SignInButton`, `SignUpButton` |
| Auth Header | `ClerkLoading`, `ClerkLoaded`, `SignedOut` -> `SignInButton` |
| Sidebar | `ClerkLoading` -> spinner, `ClerkLoaded` -> `UserButton` |

---

## 6. Routing & Pages

### Route Map

| Route | Auth | Layout Group | Data Fetching | Description |
|---|---|---|---|---|
| `/` | Public | `(marketing)` | Client-side auth check | Landing page with hero + CTA |
| `/sign-in` | Public | `(auth)` | None | Clerk SignIn component |
| `/sign-up` | Public | `(auth)` | None | Clerk SignUp component |
| `/courses` | Protected | `(main)` | `getCourses()`, `getUserProgress()` | Course selection grid |
| `/learn` | Protected | `(main)` | `getUserProgress()`, `getCourseProgress()`, `getUnits()`, `getLessonPercentage()`, `getUserSubscription()` | Main learning dashboard |
| `/leaderboard` | Protected | `(main)` | `getUserProgress()`, `getTopTenUsers()`, `getUserSubscription()` | Top 10 ranking |
| `/quests` | Protected | `(main)` | `getUserProgress()`, `getUserSubscription()` | Quest progress tracking |
| `/shop` | Protected | `(main)` | `getUserProgress()`, `getUserSubscription()` | Hearts refill + subscription |
| `/lesson` | Protected | `lesson` | `getLesson()`, `getUserProgress()`, `getUserSubscription()` | Current lesson quiz |
| `/lesson/[id]` | Protected | `lesson` | `getLesson(id)`, `getUserProgress()`, `getUserSubscription()` | Specific lesson quiz |
| `/admin` | Admin | None | `getIsAdmin()` | React Admin CRUD panel |
| `/api/webhooks/stripe` | Public | None | Stripe webhook | Subscription events |

### Layout Hierarchy

```
RootLayout (ClerkProvider, Modals, Toaster, IBM Plex Sans Arabic, RTL)
├── (marketing)/layout (Header + Footer)
│   └── page.tsx (/)
├── (auth)/layout (Header + centered content)
│   ├── sign-in/page.tsx
│   └── sign-up/page.tsx
├── (main)/layout (Sidebar + MobileHeader)
│   ├── courses/page.tsx
│   ├── learn/page.tsx
│   ├── leaderboard/page.tsx
│   ├── quests/page.tsx
│   └── shop/page.tsx
├── lesson/layout (full-height flex)
│   ├── page.tsx
│   └── [lessonId]/page.tsx
└── admin/page.tsx (standalone)
```

### Loading States

Every `(main)` page has a `loading.tsx` with a centered `Loader` spinner (`animate-spin`).

---

## 7. UI Component Library

### Base: shadcn/ui + Radix UI

Configuration in `components.json`:
- Style: `default`
- RSC: `true`
- Base color: `slate`
- CSS Variables: `true`
- Path alias: `@/components`, `@/lib/utils`

### Button (`components/ui/button.tsx`)

Uses **class-variance-authority (CVA)** for variant management.

**12 Variants:**

| Variant | Description | Colors |
|---|---|---|
| `default` | Standard with 3D border effect | bg-white, border-slate-200 |
| `primary` | Green action button | bg-sky-400, border-sky-500 |
| `primaryOutline` | Outlined sky button | text-sky-500, bg-white |
| `secondary` | Green button | bg-green-500, border-green-600 |
| `secondaryOutline` | Outlined green | text-green-500, bg-white |
| `danger` | Red destructive button | bg-rose-500, border-rose-600 |
| `dangerOutline` | Outlined red | text-rose-500, bg-white |
| `super` | Purple premium button | bg-indigo-500, border-indigo-600 |
| `superOutline` | Outlined purple | text-indigo-500, bg-white |
| `ghost` | Transparent, hover gray | bg-transparent |
| `sidebar` | Sidebar nav (inactive) | bg-transparent, text-slate-500 |
| `sidebarOutline` | Sidebar nav (active) | bg-sky-500/15, text-sky-500 |
| `locked` | Disabled locked state | bg-neutral-200, border-neutral-400 |

**5 Sizes:** `default`, `sm`, `lg`, `icon`, `rounded`

All buttons use `border-b-4` for 3D depth effect with `active:border-b-0` press animation.

### Other UI Primitives

| Component | Base | Exports |
|---|---|---|
| `avatar.tsx` | Radix Avatar | `Avatar`, `AvatarImage`, `AvatarFallback` |
| `dialog.tsx` | Radix Dialog | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` |
| `progress.tsx` | Radix Progress | `Progress` (green indicator bar) |
| `separator.tsx` | Radix Separator | `Separator` (horizontal/vertical) |
| `sheet.tsx` | Radix Dialog | `Sheet`, `SheetContent`, `SheetTrigger`, `SheetHeader`, `SheetTitle`, `SheetDescription` |
| `sonner.tsx` | Sonner | `Toaster` (theme-aware toast container) |

---

## 8. Application Components

### Layout Components

| Component | File | Type | Purpose |
|---|---|---|---|
| `FeedWrapper` | `components/feed-wrapper.tsx` | Server | Main content area wrapper (`flex-1 pb-10`) |
| `StickyWrapper` | `components/sticky-wrapper.tsx` | Server | Sticky sidebar widget wrapper (`hidden lg:block`) |
| `Sidebar` | `components/sidebar.tsx` | Server | Desktop navigation (fixed right, 256px) |
| `SidebarItem` | `components/sidebar-item.tsx` | Client | Nav item with `usePathname()` active detection |
| `MobileHeader` | `components/mobile-header.tsx` | Server | Mobile top bar (green, `h-[50px]`, `lg:hidden`) |
| `MobileSidebar` | `components/mobile-sidebar.tsx` | Server | Sheet-based mobile menu with Sidebar inside |

### Sidebar Navigation Items

| Label | Icon | Route |
|---|---|---|
| تعلم (Learn) | `/learn.svg` | `/learn` |
| لوحة المتصدرين (Leaderboard) | `/leaderboard.svg` | `/leaderboard` |
| المهمات (Quests) | `/quests.svg` | `/quests` |
| المتجر (Shop) | `/shop.svg` | `/shop` |

### Data Display Components

| Component | File | Type | Props | Purpose |
|---|---|---|---|---|
| `UserProgress` | `components/user-progress.tsx` | Server | `activeCourse, hearts, points, hasActiveSubscription` | Points + hearts + course badge in sidebar |
| `Quests` | `components/quests.tsx` | Server | `points` | Quest progress bars widget |
| `Promo` | `components/promo.tsx` | Server | None | "Upgrade to Pro" card (shown when not subscribed) |
| `Banner` | `components/banner.tsx` | Client | `hide, setHide` | Dismissible top banner (localStorage persisted) |

### Learn Page Components

| Component | File | Type | Key Features |
|---|---|---|---|
| `LearnHeader` | `app/(main)/learn/header.tsx` | Server | Sticky header with back arrow + course title |
| `Unit` | `app/(main)/learn/unit.tsx` | Server | Renders UnitBanner + LessonButton list |
| `UnitBanner` | `app/(main)/learn/unit-banner.tsx` | Server | Green banner with unit title + "Continue Learning" |
| `LessonButton` | `app/(main)/learn/lesson-button.tsx` | Client | Circular progress, wavy path layout, 3 states (locked/current/completed) |

**LessonButton States:**
- **Locked:** Gray `Lock` icon, no interaction
- **Current:** `Star` icon + `CircularProgressbar` + bouncing "Start Lesson" tooltip
- **Completed:** Green `Check` icon, navigates to `/lesson/{id}`

**Wavy Path Layout:** LessonButton uses index-based indentation to create a snake/S-curve pattern for visual appeal.

### Lesson/Quiz Components

| Component | File | Type | Key Features |
|---|---|---|---|
| `Quiz` | `app/lesson/quiz.tsx` | Client | Main quiz engine - manages hearts, percentage, challenges, audio, confetti |
| `Challenge` | `app/lesson/challenge.tsx` | Server | Grid of answer cards (1 col for ASSIST, 2+ cols for SELECT) |
| `Card` | `app/lesson/card.tsx` | Client | Answer option - audio playback, keyboard shortcuts (Shift+1-9), status colors |
| `QuestionBubble` | `app/lesson/question-bubble.tsx` | Server | Mascot image + speech bubble with question text |
| `LessonHeader` | `app/lesson/header.tsx` | Server | Hearts counter (or infinity), progress bar, exit button |
| `LessonFooter` | `app/lesson/footer.tsx` | Server | Check/Next/Retry buttons, Enter key shortcut, status messages |
| `ResultCard` | `app/lesson/result-card.tsx` | Server | Points or hearts summary (orange/rose color coding) |

### Course Components

| Component | File | Type | Key Features |
|---|---|---|---|
| `CoursesList` | `app/(main)/courses/list.tsx` | Client | Grid of cards, `upsertUserProgress` on select, `useTransition` |
| `CourseCard` | `app/(main)/courses/card.tsx` | Server | Image + title + checkmark if active, hover effects |

### Shop Components

| Component | File | Type | Key Features |
|---|---|---|---|
| `ShopItems` | `app/(main)/shop/items.tsx` | Client | Refill hearts (10 points) + Unlimited hearts (Stripe) |

---

## 9. Modals & State Management

### Zustand Stores (`store/`)

All three modal stores share the same pattern:

```typescript
type ModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};
```

| Store | File | Triggered By |
|---|---|---|
| `useExitModal` | `store/use-exit-modal.ts` | Lesson header X button |
| `useHeartsModal` | `store/use-hearts-modal.ts` | Quiz when hearts reach 0 |
| `usePracticeModal` | `store/use-practice-modal.ts` | Quiz on mount if lesson has completed challenges |

### Modal Components (`components/modals/`)

| Modal | Image | Primary Action | Secondary Action |
|---|---|---|---|
| `ExitModal` | `mascot_sad.svg` | Continue lesson (close) | End session (navigate to `/learn`) |
| `HeartsModal` | `mascot_bad.svg` | Get Pro (navigate to `/store`) | Close |
| `PracticeModal` | Heart SVG | Close (OK) | - |

All modals use Radix Dialog via shadcn/ui, render only after client hydration (`useEffect` + `isClient` state), and are mounted globally in `app/layout.tsx`.

---

## 10. Server Actions

### `actions/challenge-progress.ts`

#### `upsertChallengeProgress(challengeId: number)`
- **Auth:** Requires Clerk userId
- **First attempt:** Checks hearts > 0 (or subscription active), inserts `challenge_progress` record, adds 10 points
- **Practice (retry):** Updates existing record, adds 1 heart (cap at MAX_HEARTS=5), adds 10 points
- **Returns:** `void` or `{ error: "hearts" }` if no hearts left
- **Revalidates:** `/learn`, `/lesson`, `/quests`, `/leaderboard`, `/lesson/{lessonId}`

### `actions/user-progress.ts`

#### `upsertUserProgress(courseId: number)`
- **Auth:** Requires Clerk userId + `currentUser()`
- **Validates:** Course exists with at least 1 unit containing 1 lesson
- **New user:** Inserts `user_progress` with Clerk name/image
- **Existing user:** Updates `activeCourseId`, `userName`, `userImageSrc`
- **Redirects:** `/learn`
- **Revalidates:** `/courses`, `/learn`

#### `reduceHearts(challengeId: number)`
- **Auth:** Requires Clerk userId
- **Guards:** Returns `{ error: "practice" }` if already completed, `{ error: "subscription" }` if subscribed, `{ error: "hearts" }` if already 0
- **Action:** Decrements hearts by 1 (minimum 0)
- **Revalidates:** `/shop`, `/learn`, `/quests`, `/leaderboard`, `/lesson/{lessonId}`

#### `refillHearts()`
- **Validates:** Hearts < MAX_HEARTS, points >= POINTS_TO_REFILL (10)
- **Action:** Sets hearts = MAX_HEARTS, deducts 10 points
- **Revalidates:** `/shop`, `/learn`, `/quests`, `/leaderboard`

### `actions/user-subscription.ts`

#### `createStripeUrl()`
- **Auth:** Requires Clerk userId + `currentUser()`
- **Existing subscriber:** Returns Stripe billing portal URL
- **New subscriber:** Returns Stripe checkout session URL (20 SAR/month)
- **Returns:** `{ data: string }` (redirect URL)

---

## 11. API Routes (Admin CRUD)

All routes require admin authorization (`getIsAdmin()` returns `true`).
Used by React Admin panel via `ra-data-simple-rest` provider.

| Resource | List (GET) | Create (POST) | Get (GET) | Update (PUT) | Delete (DELETE) |
|---|---|---|---|---|---|
| `/api/courses` | All courses | `{title, imageSrc}` | By ID | Partial update | Cascade |
| `/api/units` | All units | `{courseId, title, description, order}` | By ID | Partial update | Cascade |
| `/api/lessons` | All lessons | `{unitId, title, order}` | By ID | Partial update | Cascade |
| `/api/challenges` | All challenges | `{lessonId, type, question, order}` | By ID | Partial update | Cascade |
| `/api/challengeOptions` | All options | `{challengeId, text, correct, imageSrc?, audioSrc?}` | By ID | Partial update | Yes |

**Response format:** All routes return `NextResponse.json()` with appropriate HTTP status codes.
**Headers:** All list endpoints include `Access-Control-Expose-Headers: Content-Range` and `Content-Range` header for React Admin pagination.

---

## 12. Data Fetching & Queries

### Query Layer (`db/queries.ts`)

All queries use `React.cache()` for per-request memoization (deduplication within a single server render).

| Function | Auth | Returns | Used By |
|---|---|---|---|
| `getCourses()` | No | All courses | `/courses` page |
| `getUserProgress()` | Yes | User progress with active course join | All protected pages |
| `getUnits()` | Yes | Units -> lessons -> challenges (with completion) | `/learn` page |
| `getCourseById(id)` | No | Course with nested units/lessons (ordered) | Internal use |
| `getCourseProgress()` | Yes | `{ activeLesson, activeLessonId }` | `/learn` page |
| `getLesson(id?)` | Yes | Full lesson with challenges + options + completion | `/lesson` pages |
| `getLessonPercentage()` | Yes | `0-100` percentage of current lesson | `/learn` page |
| `getUserSubscription()` | Yes | Subscription with computed `isActive` boolean | All protected pages |
| `getTopTenUsers()` | Yes | Top 10 users by points DESC | `/leaderboard` page |

### Data Fetching Pattern

All protected pages use `Promise.all()` for parallel server-side data fetching:

```typescript
const [userProgress, courseProgress, units, subscription] = await Promise.all([
  getUserProgress(),
  getCourseProgress(),
  getUnits(),
  getUserSubscription(),
]);
```

**Redirect guards:** If `!userProgress` or `!userProgress.activeCourse`, redirect to `/courses`.

---

## 13. Stripe Payment Integration

### Configuration

- **File:** `lib/stripe.ts` - Stripe client instance
- **API Version:** `2023-10-16`
- **Currency:** SAR (Saudi Riyal)
- **Price:** 2000 units = 20.00 SAR/month
- **Product Name:** "Qudlab Pro"

### Checkout Flow

1. User clicks "Upgrade" in `/shop`
2. `createStripeUrl()` server action creates Stripe checkout session
3. User redirects to Stripe hosted checkout
4. On success, Stripe sends `checkout.session.completed` webhook
5. Webhook handler inserts `user_subscription` record
6. User redirected back to `/shop`

### Subscription Management

- Existing subscribers get Stripe billing portal URL instead of checkout
- `invoice.payment_succeeded` webhook updates subscription period end
- Active check: `stripeCurrentPeriodEnd + 1 day > Date.now()`

### Webhook (`app/api/webhooks/stripe/route.ts`)

- Public route (excluded from Clerk middleware)
- Validates Stripe webhook signature
- Handles: `checkout.session.completed`, `invoice.payment_succeeded`

---

## 14. Styling & Design System

### Tailwind CSS Configuration

**Theme extension** (`tailwind.config.ts`):
- Dark mode: `class`-based
- Custom animations: `accordion-down`, `accordion-up`
- Plugin: `tailwindcss-animate`

### CSS Variables (`app/globals.css`)

HSL-based color system for light/dark mode:

| Variable | Light | Dark | Usage |
|---|---|---|---|
| `--background` | `0 0% 100%` | `222.2 84% 4.9%` | Page background |
| `--foreground` | `222.2 84% 4.9%` | `210 40% 98%` | Text color |
| `--primary` | `222.2 47.4% 11.2%` | `210 40% 98%` | Primary actions |
| `--secondary` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Secondary elements |
| `--muted` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Muted text |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 30.6%` | Error/danger |
| `--border` | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Borders |
| `--radius` | `0.5rem` | `0.5rem` | Border radius |

### Color Palette Used Across Components

| Color | Tailwind Class | Usage |
|---|---|---|
| Green | `bg-green-500` | Success states, unit banners, mobile header, correct answers |
| Sky/Blue | `bg-sky-400`, `border-sky-500` | Primary buttons, selected states, active sidebar |
| Rose/Red | `bg-rose-500` | Hearts, danger buttons, wrong answers |
| Indigo/Purple | `bg-indigo-500` | Super/premium buttons |
| Orange | `text-orange-400` | Points display |
| Neutral/Gray | `bg-neutral-200` | Locked/disabled states |

### RTL Layout

- Root HTML: `dir="rtl"` and `lang="ar"`
- Sidebar: Fixed to **right** (`right-0`) instead of left
- Main content: `lg:pr-[256px]` (padding-right for sidebar)
- Font: IBM Plex Sans Arabic

### Responsive Design

| Breakpoint | Behavior |
|---|---|
| Mobile (default) | MobileHeader visible, Sidebar hidden, single column grids |
| Desktop (`lg:`) | MobileHeader hidden, Sidebar visible (256px), multi-column grids |

---

## 15. Animations & Interactions

### CSS/Tailwind Animations

| Animation | Element | Tailwind Class |
|---|---|---|
| Spinner | Loading states | `animate-spin` |
| Bounce | "Start Lesson" tooltip | `animate-bounce` |
| Button press | All buttons | `active:border-b-0` (removes 3D depth) |
| Hover | Cards, buttons | `hover:bg-black/5`, opacity changes |
| Progress bar | Lesson progress | `transition-all` on width |

### Radix UI Animations

| Animation | Component | Trigger |
|---|---|---|
| Fade + Zoom | Dialog/Modal | Open/close |
| Slide in/out | Sheet (mobile sidebar) | Open/close |
| Accordion | Tailwind animation config | Expand/collapse |

### React Confetti

Used in `quiz.tsx` when user completes all challenges in a lesson. Uses `useWindowSize()` from `react-use` to fill the viewport.

### Keyboard Shortcuts

| Key | Action | Component |
|---|---|---|
| `Shift + 1-9` | Select answer option | `card.tsx` (via `useKey` from react-use) |
| `Enter` | Submit/continue | `footer.tsx` (via `useKey` from react-use) |

---

## 16. Audio System

### Sound Effects

| Sound | File | Trigger |
|---|---|---|
| Correct answer | `/correct.wav` | Challenge answered correctly |
| Incorrect answer | `/incorrect.wav` | Challenge answered incorrectly |
| Lesson complete | `/finish.mp3` | All challenges completed |

### Character Audio

Spanish language audio files for challenge options:

| Character | File |
|---|---|
| Man | `/es_man.mp3` |
| Woman | `/es_woman.mp3` |
| Boy | `/es_boy.mp3` |
| Girl | `/es_girl.mp3` |
| Robot | `/es_robot.mp3` |
| Zombie | `/es_zombie.mp3` |

### Implementation

- `useAudio()` hook from `react-use` for sound effect playback
- Audio elements in `card.tsx` play character audio on answer selection
- Quiz component manages three audio instances (correct, incorrect, finish)

---

## 17. Business Logic

### Hearts System

| Rule | Value |
|---|---|
| Maximum hearts | 5 (`MAX_HEARTS`) |
| Starting hearts | 5 |
| Wrong answer (first attempt) | -1 heart |
| Wrong answer (practice/retry) | No change |
| Practice correct answer | +1 heart (capped at 5) |
| Refill cost | 10 points (`POINTS_TO_REFILL`) |
| Subscriber hearts | Unlimited (infinity icon) |

### Points System

| Action | Points |
|---|---|
| Complete challenge (first time) | +10 |
| Complete challenge (practice) | +10 |
| Refill hearts | -10 |

### Quest System (Constants)

| Quest | Target Points |
|---|---|
| احصل على 20 نقطة | 20 |
| احصل على 50 نقطة | 50 |
| احصل على 100 نقطة | 100 |
| احصل على 250 نقطة | 250 |
| احصل على 500 نقطة | 500 |
| احصل على 1000 نقطة | 1000 |

Progress = `(userPoints / questValue) * 100`, capped at 100%.

### Lesson Progress

- Lesson = collection of ordered challenges
- Lesson complete = ALL challenges have `challenge_progress` with `completed: true`
- Lesson percentage = `(completedChallenges / totalChallenges) * 100`
- Active lesson = first uncompleted lesson in course (units and lessons ordered)

### Quiz Flow

```
1. Load lesson with challenges (server)
2. Display first challenge (client)
3. User selects answer option
4. User clicks "Check" (or Enter)
5a. CORRECT: Play correct.wav, show green, +10 points, upsertChallengeProgress()
5b. WRONG: Play incorrect.wav, show red, -1 heart, reduceHearts()
6. User clicks "Next"
7. Advance to next challenge (increment activeIndex)
8. Repeat 3-7 until all challenges done
9. Show completion screen with confetti + results
10. Navigate back to /learn
```

---

## 18. Admin Panel

### Setup

- **Framework:** React Admin v4
- **Data Provider:** `ra-data-simple-rest` pointing to `/api`
- **Access:** Only users with IDs in `CLERK_ADMIN_IDS` env var
- **SSR:** Disabled (`dynamic(() => import("./app"), { ssr: false })`)

### Resources

| Resource | API Path | List Fields | Create Fields |
|---|---|---|---|
| courses | `/api/courses` | id, title, imageSrc | title, imageSrc |
| units | `/api/units` | id, title, description, courseId, order | title, description, courseId (ref), order |
| lessons | `/api/lessons` | id, title, unitId, order | title, unitId (ref), order |
| challenges | `/api/challenges` | id, question, type, lessonId, order | question, type (SELECT/ASSIST), lessonId (ref), order |
| challengeOptions | `/api/challengeOptions` | id, text, correct, challengeId, imageSrc, audioSrc | text, correct, challengeId (ref), imageSrc, audioSrc |

---

## 19. Scripts & Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Check Prettier formatting |
| `npm run format:fix` | Fix Prettier formatting |
| `npm run db:studio` | Open Drizzle Studio (visual DB explorer) |
| `npm run db:push` | Push schema changes to database |
| `npm run db:prod` | Run seed script (`scripts/prod.ts`) |

### Seed Script (`scripts/prod.ts`)

Populates database with sample data:
- 1 course (Spanish) with `/es.svg` image
- 2 units per course (basics + intermediate)
- 5 lessons per unit (Nouns, Verbs, Adjectives, Phrases, Sentences)
- 8 challenges per lesson (6 SELECT + 2 ASSIST)
- 3 options per challenge (1 correct, 2 incorrect) with images + audio

---

## 20. Public Assets

### SVG Images

| Category | Files |
|---|---|
| Language flags | `es.svg`, `fr.svg`, `hr.svg`, `it.svg`, `jp.svg` |
| Characters | `boy.svg`, `girl.svg`, `man.svg`, `woman.svg`, `robot.svg`, `zombie.svg` |
| Mascots | `mascot.svg`, `mascot_bad.svg`, `mascot_sad.svg` |
| UI Icons | `heart.svg`, `hero.svg`, `leaderboard.svg`, `learn.svg`, `points.svg`, `quests.svg`, `shop.svg`, `unlimited.svg`, `finish.svg` |

### Audio Files

| File | Usage |
|---|---|
| `correct.wav` | Correct answer sound effect |
| `incorrect.wav` | Wrong answer sound effect |
| `finish.mp3` | Lesson completion sound |
| `es_man.mp3` | Spanish male voice |
| `es_woman.mp3` | Spanish female voice |
| `es_boy.mp3` | Spanish boy voice |
| `es_girl.mp3` | Spanish girl voice |
| `es_robot.mp3` | Spanish robot voice |
| `es_zombie.mp3` | Spanish zombie voice |

### Favicon/Icons

`favicon.ico`, `apple-icon.png`, `icon1.png`, `icon2.png`

---

## 21. Design Patterns Summary

### Architecture Patterns

| Pattern | Implementation |
|---|---|
| **App Router (RSC)** | Server components by default, `"use client"` for interactive components |
| **Route Groups** | `(marketing)`, `(auth)`, `(main)` for layout segmentation |
| **Parallel Data Fetching** | `Promise.all()` for multiple queries in server components |
| **Request Memoization** | `React.cache()` on all query functions |
| **Server Actions** | `"use server"` mutations with `revalidatePath()` |
| **Middleware Auth** | Clerk middleware with public/protected route matching |
| **Admin Authorization** | Environment-based admin ID list |

### Component Patterns

| Pattern | Implementation |
|---|---|
| **Compound Components** | Radix UI primitives (Dialog, Sheet, Avatar) |
| **Polymorphic Components** | Button with `asChild` prop via Radix Slot |
| **Variant Management** | CVA (class-variance-authority) for button styles |
| **Layout Wrappers** | FeedWrapper, StickyWrapper, layouts |
| **Loading States** | Suspense with `loading.tsx` per route |
| **Global Modals** | Mounted in root layout, controlled via Zustand stores |

### State Management Patterns

| Layer | Tool | Usage |
|---|---|---|
| **Server State** | React cache + Server Components | Database queries |
| **Client State** | React useState/useTransition | Quiz state, form state |
| **Global UI State** | Zustand | Modal open/close |
| **Auth State** | Clerk | User identity, session |
| **URL State** | Next.js App Router | Route params, navigation |

### Utility Functions

| Function | File | Purpose |
|---|---|---|
| `cn(...inputs)` | `lib/utils.ts` | Merge Tailwind classes (clsx + tailwind-merge) |
| `absoluteUrl(path)` | `lib/utils.ts` | Generate absolute URL from path |
| `getIsAdmin()` | `lib/admin.ts` | Check if current user is admin |

---

## Quick Reference for New Developers

### To add a new language course:
1. Add flag SVG to `public/`
2. Add character audio files to `public/`
3. Use admin panel at `/admin` or seed via `scripts/prod.ts`
4. Create course -> units -> lessons -> challenges -> challenge options

### To add a new page:
1. Create `app/(main)/[page-name]/page.tsx` (server component)
2. Add `loading.tsx` with spinner
3. Add sidebar navigation in `components/sidebar.tsx`
4. Add icon SVG to `public/`

### To add a new UI component:
1. Use `npx shadcn-ui@latest add [component]` for Radix-based primitives
2. Place in `components/ui/`
3. Use `cn()` utility for Tailwind class merging

### To add a new server action:
1. Create file in `actions/` with `"use server"` directive
2. Get `userId` from `auth()` (Clerk)
3. Perform database mutation via Drizzle ORM
4. Call `revalidatePath()` for affected routes

### To modify the database:
1. Edit `db/schema.ts`
2. Run `npm run db:push` to apply changes
3. Update `db/queries.ts` if new queries needed
4. Update seed script if needed
