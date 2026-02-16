# Design System Document - Qudlab (معمل القدرات)

> Complete UI/UX design reference with exact styling guidelines, component examples, and interaction patterns.
> Every developer MUST follow these patterns to maintain visual and behavioral consistency.

---

## Table of Contents

1. [Foundation](#1-foundation)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Buttons](#5-buttons)
6. [Cards](#6-cards)
7. [Modals & Dialogs](#7-modals--dialogs)
8. [Progress Indicators](#8-progress-indicators)
9. [Navigation](#9-navigation)
10. [Form & Input Patterns](#10-form--input-patterns)
11. [Feedback & Status States](#11-feedback--status-states)
12. [Animations & Transitions](#12-animations--transitions)
13. [Responsive Design](#13-responsive-design)
14. [Iconography](#14-iconography)
15. [Page Layout Templates](#15-page-layout-templates)
16. [Quiz/Lesson UI Patterns](#16-quizlesson-ui-patterns)
17. [Gamification UI](#17-gamification-ui)
18. [Accessibility](#18-accessibility)
19. [Do's and Don'ts](#19-dos-and-donts)

---

## 1. Foundation

### CSS Utility Function

All class merging uses `cn()` from `lib/utils.ts`:

```tsx
import { cn } from "@/lib/utils";

// Usage: merge Tailwind classes with conditional logic
<div className={cn(
  "base-classes here",
  condition && "conditional-classes",
  variant === "active" && "active-classes"
)} />
```

`cn()` combines `clsx` (conditional classes) + `tailwind-merge` (deduplication).

### Direction & Language

```html
<!-- Root HTML element -->
<html lang="ar" dir="rtl">
```

- **Direction:** RTL (Right-to-Left) throughout
- **Language:** Arabic (ar)
- **Font:** IBM Plex Sans Arabic (Google Fonts)
- **Margin note:** Use `ml-*` for spacing AFTER elements (appears on left in RTL), `mr-*` for spacing BEFORE

### Border Radius Standard

```
Default radius:     rounded-xl    (0.75rem / 12px)
Full circle:        rounded-full  (9999px)
Cards:              rounded-xl    (0.75rem / 12px)
Result cards:       rounded-2xl   (1rem / 16px)
Buttons:            rounded-xl    (0.75rem / 12px)
Progress bars:      rounded-full  (9999px)
Badges/shortcuts:   rounded-lg    (0.5rem / 8px)
Modals:             sm:rounded-lg (0.5rem / 8px)
```

---

## 2. Color System

### CSS Variables (HSL-based, light/dark)

Defined in `app/globals.css`:

```css
:root {
  --background:           0 0% 100%;           /* White */
  --foreground:           222.2 84% 4.9%;      /* Near-black */
  --primary:              222.2 47.4% 11.2%;   /* Dark blue */
  --primary-foreground:   210 40% 98%;         /* Near-white */
  --secondary:            210 40% 96.1%;       /* Light gray-blue */
  --secondary-foreground: 222.2 47.4% 11.2%;   /* Dark blue */
  --muted:                210 40% 96.1%;       /* Muted gray */
  --muted-foreground:     215.4 16.3% 46.9%;  /* Medium gray */
  --destructive:          0 84.2% 60.2%;       /* Red */
  --border:               214.3 31.8% 91.4%;   /* Light border */
  --ring:                 222.2 84% 4.9%;      /* Focus ring */
  --radius:               0.5rem;              /* Base radius */
}
```

### Semantic Color Map

| Purpose | Tailwind Class | Hex Approx | When to Use |
|---|---|---|---|
| **Success / Correct** | `bg-green-500` | `#22c55e` | Correct answers, completed states, unit banners, secondary buttons |
| **Success Light** | `bg-green-100` | `#dcfce7` | Correct answer card backgrounds |
| **Success Border** | `border-green-300` | `#86efac` | Correct answer card borders |
| **Success Text** | `text-green-500` | `#22c55e` | Correct answer text, active labels, brand name |
| **Brand Green Dark** | `text-green-600` | `#16a34a` | Logo text, branded links |
| **Primary / Selected** | `bg-sky-400` | `#38bdf8` | Primary action buttons, selected states |
| **Primary Light** | `bg-sky-100` | `#e0f2fe` | Selected card background |
| **Primary Border** | `border-sky-300` | `#7dd3fc` | Selected card border |
| **Primary Text** | `text-sky-500` | `#0ea5e9` | Selected text, active sidebar |
| **Active Sidebar BG** | `bg-sky-500/15` | Translucent | Active sidebar item background |
| **Danger / Wrong** | `bg-rose-500` | `#f43f5e` | Wrong answers, hearts, danger buttons |
| **Danger Light** | `bg-rose-100` | `#ffe4e6` | Wrong answer card background, wrong footer |
| **Danger Border** | `border-rose-300` | `#fda4af` | Wrong answer card border |
| **Danger Text** | `text-rose-500` | `#f43f5e` | Hearts count, wrong text, danger labels |
| **Premium / Super** | `bg-indigo-500` | `#6366f1` | Upgrade/premium buttons |
| **Points** | `text-orange-400` | `#fb923c` | Points display, points result card |
| **Points BG** | `bg-orange-400` | `#fb923c` | Points result card header |
| **Locked / Disabled** | `bg-neutral-200` | `#e5e5e5` | Locked lesson buttons |
| **Locked Border** | `border-neutral-400` | `#a3a3a3` | Locked state borders |
| **Body Text** | `text-neutral-700` | `#404040` | Headings, body text in cards |
| **Muted Text** | `text-neutral-600` | `#525252` | Answer option text |
| **Subtle Text** | `text-slate-500` | `#64748b` | Secondary labels, ghost button text |
| **Mobile Header** | `bg-green-500` | `#22c55e` | Mobile top navigation bar |
| **White** | `bg-white` | `#ffffff` | Card backgrounds, outline buttons |
| **Hover Overlay** | `hover:bg-black/5` | 5% black | Card hover state |
| **Modal Overlay** | `bg-black/80` | 80% black | Dialog/sheet backdrop |

### Color Usage Rules

1. **NEVER** use raw hex values - always use Tailwind classes
2. **Green** = success, completion, brand, primary navigation
3. **Sky/Blue** = selection, focus, primary actions
4. **Rose/Red** = errors, hearts, danger
5. **Indigo** = premium/pro features only
6. **Orange** = points display only
7. **Neutral/Slate** = text, borders, disabled states

---

## 3. Typography

### Font

```tsx
import { IBM_Plex_Sans_Arabic } from "next/font/google";

const font = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});
```

### Text Scale

| Element | Mobile | Desktop | Weight | Class |
|---|---|---|---|---|
| Page Heading (h1) | `text-lg` (18px) | `text-3xl` (30px) | `font-bold` | `text-lg font-bold text-neutral-700 lg:text-3xl` |
| Section Heading (h2) | `text-2xl` (24px) | `text-2xl` | `font-bold` | `text-2xl font-bold` |
| Card Title (h3) | `text-lg` (18px) | `text-lg` | `font-bold` | `text-lg font-bold` |
| Unit Description | `text-lg` (18px) | `text-lg` | `normal` | `text-lg` |
| Body Text | `text-base` (16px) | `text-base` | `normal` | `text-base` |
| Answer Option Text | `text-sm` (14px) | `text-base` (16px) | `normal` | `text-sm text-neutral-600 lg:text-base` |
| Small/Label | `text-sm` (14px) | `text-sm` | `normal` | `text-sm` |
| Tiny/Badge | `text-xs` (12px) | `text-[15px]` | `font-semibold` | `text-xs font-semibold lg:text-[15px]` |
| Button Text | `text-sm` (14px) | `text-sm` | `font-bold` | `text-sm font-bold uppercase tracking-wide` |
| Brand Name | `text-2xl` (24px) | `text-2xl` | `font-extrabold` | `text-2xl font-extrabold tracking-wide text-green-600` |
| Modal Title | `text-2xl` (24px) | `text-2xl` | `font-bold` | `text-center text-2xl font-bold` |
| Modal Description | `text-base` (16px) | `text-base` | `normal` | `text-center text-base` |
| Muted Description | `text-sm` (14px) | `text-sm` | `normal` | `text-sm text-muted-foreground` |
| Footer Status | `text-base` (16px) | `text-2xl` (24px) | `font-bold` | `text-base font-bold lg:text-2xl` |

### Text Alignment

- **RTL default:** Text flows right-to-left naturally
- **Headings:** `text-center` (mobile) → `lg:text-right` (desktop) in quiz
- **Modal text:** Always `text-center`
- **Button text:** Always `uppercase tracking-wide`

---

## 4. Spacing & Layout

### Spacing Scale (used consistently)

```
gap-x-2    (8px)   - Tight horizontal gap (user progress items)
gap-x-3    (12px)  - Standard horizontal gap (quest items, sidebar logo)
gap-x-4    (16px)  - Medium horizontal gap (shop items, result cards)
gap-x-7    (28px)  - Lesson header items
gap-y-2    (8px)   - Sidebar items, small vertical spacing
gap-y-4    (16px)  - Modal buttons, quest list, standard vertical gap
gap-y-8    (32px)  - Completion screen items (desktop)
gap-y-12   (48px)  - Quiz content sections
p-4        (16px)  - Standard card/section padding
p-5        (20px)  - Unit banner padding
p-6        (24px)  - Dialog content, answer card padding (desktop)
px-6       (24px)  - Page horizontal padding (mobile)
px-10      (40px)  - Page horizontal padding (desktop)
pb-10      (40px)  - Feed wrapper bottom padding
space-y-4  (16px)  - Standard vertical stack spacing
```

### Max Widths

```
max-w-md      (28rem)   - Modal dialogs
max-w-lg      (32rem)   - Dialog content default
max-w-[1140px]          - Lesson header/footer content
lg:w-[600px]            - Quiz challenge area
lg:w-[256px]            - Desktop sidebar
```

### Layout Containers

**FeedWrapper** - Main content area:
```tsx
<div className="relative flex-1 pb-10">
  {children}
</div>
```

**StickyWrapper** - Sidebar widget container:
```tsx
<div className="sticky bottom-6 hidden w-[368px] self-end lg:block">
  {children}
</div>
```

**Page Layout** (learn, leaderboard, quests, shop):
```tsx
<div className="flex flex-row-reverse gap-[48px] px-6">
  <StickyWrapper>
    {/* Sidebar widgets */}
  </StickyWrapper>
  <FeedWrapper>
    {/* Main content */}
  </FeedWrapper>
</div>
```

---

## 5. Buttons

### Button Component (`components/ui/button.tsx`)

Built with **class-variance-authority (CVA)**. All buttons share these base styles:

```
inline-flex items-center justify-center
whitespace-nowrap rounded-xl text-sm font-bold
ring-offset-background transition-colors
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
uppercase tracking-wide
```

### 3D Depth Effect

All filled button variants use `border-b-4` for a raised 3D look and `active:border-b-0` or `active:border-b-2` for the press-down effect:

```
┌─────────────────┐
│    BUTTON TEXT   │  ← border-b-4 creates shadow depth
└─────────────────┘
        ↓ on press
┌─────────────────┐
│    BUTTON TEXT   │  ← border-b-0 removes depth (pressed)
└─────────────────┘
```

### Variant Reference

#### Filled Variants (with 3D border)

**default** - Standard neutral button:
```tsx
<Button variant="default">تحقق</Button>
// bg-white text-slate-500 border-slate-200 border-2 border-b-4
// hover:bg-slate-100 active:border-b-2
```

**primary** - Main action (sky blue):
```tsx
<Button variant="primary" size="lg">متابعة التعلم</Button>
// bg-sky-400 text-primary-foreground border-sky-500 border-b-4
// hover:bg-sky-400/90 active:border-b-0
```

**secondary** - Success/green action:
```tsx
<Button variant="secondary" size="lg">التالي</Button>
// bg-green-500 text-primary-foreground border-green-600 border-b-4
// hover:bg-green-500/90 active:border-b-0
```

**danger** - Destructive/retry action:
```tsx
<Button variant="danger" size="lg">إعادة المحاولة</Button>
// bg-rose-500 text-primary-foreground border-rose-600 border-b-4
// hover:bg-rose-500/90 active:border-b-0
```

**super** - Premium upgrade action:
```tsx
<Button variant="super" size="lg">ترقية الآن</Button>
// bg-indigo-500 text-primary-foreground border-indigo-600 border-b-4
// hover:bg-indigo-500/90 active:border-b-0
```

**locked** - Disabled/inaccessible:
```tsx
<Button variant="locked">مقفل</Button>
// bg-neutral-200 text-primary-foreground border-neutral-400 border-b-4
// hover:bg-neutral-200/90 active:border-b-0
```

#### Outline Variants (flat, no 3D border)

```tsx
<Button variant="primaryOutline">عرض الكل</Button>
// bg-white text-sky-500 hover:bg-slate-100

<Button variant="secondaryOutline">اختيار</Button>
// bg-white text-green-500 hover:bg-slate-100

<Button variant="dangerOutline" size="lg">إنهاء الجلسة</Button>
// bg-white text-rose-500 hover:bg-slate-100

<Button variant="superOutline">ترقية</Button>
// bg-white text-indigo-500 hover:bg-slate-100
```

#### Special Variants

**ghost** - Transparent, minimal:
```tsx
<Button variant="ghost" className="text-orange-500">
  <Image src="/points.svg" ... /> 120
</Button>
// bg-transparent text-slate-500 border-transparent border-0
// hover:bg-slate-100
```

**sidebar** - Navigation inactive:
```tsx
<Button variant="sidebar" className="h-[52px] justify-start">
  <Image src="/learn.svg" ... /> تعلم
</Button>
// bg-transparent text-slate-500 border-2 border-transparent
// hover:bg-slate-100 transition-none
```

**sidebarOutline** - Navigation active:
```tsx
<Button variant="sidebarOutline" className="h-[52px] justify-start">
  <Image src="/learn.svg" ... /> تعلم
</Button>
// bg-sky-500/15 text-sky-500 border-sky-300 border-2
// hover:bg-sky-500/20 transition-none
```

### Size Reference

| Size | Class | Dimensions | Use Case |
|---|---|---|---|
| `default` | `h-11 px-4 py-2` | 44px tall | Standard buttons |
| `sm` | `h-9 px-3` | 36px tall | Mobile footer, compact |
| `lg` | `h-12 px-8` | 48px tall | CTA, modal actions, footer (desktop) |
| `icon` | `h-10 w-10` | 40x40px | Icon-only buttons |
| `rounded` | `rounded-full` | Circular | Lesson path buttons |

### Lesson Path Button (special case)

```tsx
<Button
  size="rounded"
  variant="secondary"
  className="h-[70px] w-[70px] border-b-8"
>
  <Star className="h-10 w-10 fill-primary-foreground text-primary-foreground" />
</Button>
```

Circular 70x70px button with extra-thick `border-b-8` for pronounced 3D depth.

### Polymorphic Button (asChild)

Use `asChild` to render as a Link while keeping Button styles:

```tsx
<Button variant="super" className="w-full" size="lg" asChild>
  <Link href="/shop">ترقية الآن</Link>
</Button>
```

---

## 6. Cards

### Course Selection Card

```tsx
<div className={cn(
  // Base: tall card with 3D border
  "flex h-full min-h-[217px] min-w-[200px] cursor-pointer",
  "flex-col items-center justify-between",
  "rounded-xl border-2 border-b-[4px] p-3 pb-6",
  "hover:bg-black/5 active:border-b-2",
  // Disabled state
  disabled && "pointer-events-none opacity-50"
)}>
  {/* Active checkmark (top-right) */}
  {isActive && (
    <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5">
      <Check className="h-4 w-4 stroke-[4] text-white" />
    </div>
  )}

  {/* Course image */}
  <Image className="rounded-lg border object-cover drop-shadow-md"
    width={93.33} height={70} ... />

  {/* Title */}
  <p className="mt-3 text-center font-bold text-neutral-700">{title}</p>
</div>
```

**Grid layout:**
```tsx
<div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
```

### Answer Option Card (Quiz)

Three visual states based on selection + correctness:

```tsx
<div className={cn(
  // Base
  "h-full cursor-pointer rounded-xl border-2 border-b-4 p-4",
  "hover:bg-black/5 active:border-b-2 lg:p-6",

  // Selected (before checking)
  selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",

  // Correct answer (after checking)
  selected && status === "correct" &&
    "border-green-300 bg-green-100 hover:bg-green-100",

  // Wrong answer (after checking)
  selected && status === "wrong" &&
    "border-rose-300 bg-rose-100 hover:bg-rose-100",

  // Disabled during transition
  disabled && "pointer-events-none hover:bg-white",

  // ASSIST type (full width, compact padding)
  type === "ASSIST" && "w-full lg:p-3"
)}>
```

**Answer text color follows the same pattern:**
```tsx
<p className={cn(
  "text-sm text-neutral-600 lg:text-base",          // Default
  selected && "text-sky-500",                         // Selected
  selected && status === "correct" && "text-green-500", // Correct
  selected && status === "wrong" && "text-rose-500"     // Wrong
)} />
```

**Shortcut badge:**
```tsx
<div className={cn(
  "flex h-[20px] w-[20px] items-center justify-center",
  "rounded-lg border-2 text-xs font-semibold text-neutral-400",
  "lg:h-[30px] lg:w-[30px] lg:text-[15px]",
  selected && "border-sky-300 text-sky-500",
  selected && status === "correct" && "border-green-500 text-green-500",
  selected && status === "wrong" && "border-rose-500 text-rose-500"
)}>
  {shortcut}
</div>
```

**Grid layout for challenge options:**
```tsx
// SELECT type: 2 columns on mobile, auto-fit on desktop
<div className={cn(
  "grid gap-2",
  type === "ASSIST" && "grid-cols-1",
  type === "SELECT" &&
    "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
)} />
```

### Result Card (Lesson Complete)

```tsx
<div className={cn(
  "w-full rounded-2xl border-2",
  variant === "points" && "border-orange-400 bg-orange-400",
  variant === "hearts" && "border-rose-500 bg-rose-500"
)}>
  {/* Colored header strip */}
  <div className={cn(
    "rounded-t-xl p-1.5 text-center text-xs font-bold uppercase text-white",
    variant === "points" && "bg-orange-400",
    variant === "hearts" && "bg-rose-500"
  )}>
    {variant === "hearts" ? "القلوب المتبقية" : "إجمالي النقاط"}
  </div>

  {/* White body with colored value */}
  <div className={cn(
    "flex items-center justify-center rounded-2xl bg-white p-6",
    "text-lg font-bold",
    variant === "points" && "text-orange-400",
    variant === "hearts" && "text-rose-500"
  )}>
    <Image src={imageSrc} className="ml-1.5" height={30} width={30} />
    {value === Infinity ? <InfinityIcon className="h-6 w-6 stroke-[3]" /> : value}
  </div>
</div>
```

### Widget Card (Sidebar)

Used by Promo and Quests components:
```tsx
<div className="space-y-4 rounded-xl border-2 p-4">
  {/* Header row */}
  <div className="flex w-full items-center justify-between">
    <h3 className="text-lg font-bold">المهام</h3>
    <Button size="sm" variant="primaryOutline">عرض الكل</Button>
  </div>

  {/* Content */}
  <ul className="w-full space-y-4">
    {/* Items */}
  </ul>
</div>
```

### Shop Item Row

```tsx
<div className="flex w-full items-center gap-x-4 border-t-2 p-4">
  <Image src="/heart.svg" height={60} width={60} />
  <div className="flex-1">
    <p className="text-base font-bold text-neutral-700 lg:text-xl">
      إعادة ملء القلوب
    </p>
  </div>
  <Button disabled={disabled}>
    <Image src="/points.svg" height={20} width={20} />
    <p>{POINTS_TO_REFILL}</p>
  </Button>
</div>
```

---

## 7. Modals & Dialogs

### Modal Structure Pattern

All modals follow this exact structure:

```tsx
<Dialog open={isOpen} onOpenChange={close}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      {/* Centered image */}
      <div className="mb-5 flex w-full items-center justify-center">
        <Image src="/mascot_sad.svg" height={80} width={80} />
      </div>

      {/* Centered title */}
      <DialogTitle className="text-center text-2xl font-bold">
        انتظر، لا تذهب!
      </DialogTitle>

      {/* Centered description */}
      <DialogDescription className="text-center text-base">
        أنت على وشك مغادرة الدرس. هل أنت متأكد؟
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="mb-4">
      <div className="flex w-full flex-col gap-y-4">
        {/* Primary action (full width) */}
        <Button variant="primary" className="w-full" size="lg" onClick={close}>
          متابعة التعلم
        </Button>
        {/* Secondary action (full width) */}
        <Button variant="dangerOutline" className="w-full" size="lg" onClick={...}>
          إنهاء الجلسة
        </Button>
      </div>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Modal Variants

| Modal | Image | Title | Primary Button | Secondary Button |
|---|---|---|---|---|
| **Exit** | `mascot_sad.svg` (80x80) | "انتظر، لا تذهب!" | `primary` → Continue | `dangerOutline` → End session |
| **Hearts** | `mascot_bad.svg` (80x80) | "لقد نفذت القلوب!" | `primary` → Get Pro | `dangerOutline` → Close |
| **Practice** | `/heart.svg` (80x80) | "درس تدريبي" | `primary` → Close | - |

### Dialog Overlay Animation

```css
/* Overlay */
bg-black/80
data-[state=open]:animate-in data-[state=open]:fade-in-0
data-[state=closed]:animate-out data-[state=closed]:fade-out-0

/* Content */
data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
```

### Hydration Guard

All modals must guard against SSR hydration mismatch:

```tsx
const [isClient, setIsClient] = useState(false);
useEffect(() => setIsClient(true), []);
if (!isClient) return null;
```

---

## 8. Progress Indicators

### Linear Progress Bar

```tsx
<Progress value={percentage} />

// Root: relative h-4 w-full overflow-hidden rounded-full bg-secondary
// Indicator: absolute right-0 top-0 h-full bg-green-500 transition-all
// Width set via inline style: width: ${value}%
```

**Compact variant (quests):**
```tsx
<Progress value={progress} className="h-2" />
```

### Circular Progress (Lesson Path)

```tsx
<CircularProgressbarWithChildren
  value={percentage}
  styles={{
    path: { stroke: "#4ade80" },   // green-400
    trail: { stroke: "#e5e7eb" },  // gray-200
  }}
>
  <Button size="rounded" variant="secondary"
    className="h-[70px] w-[70px] border-b-8">
    <Star className="h-10 w-10 fill-primary-foreground" />
  </Button>
</CircularProgressbarWithChildren>
```

Container: `relative h-[102px] w-[102px]`

### Loading Spinner

```tsx
import { Loader } from "lucide-react";

<Loader className="h-5 w-5 animate-spin text-muted-foreground" />

// Full-page loading:
<div className="flex h-full w-full items-center justify-center">
  <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
</div>
```

---

## 9. Navigation

### Desktop Sidebar

```
┌──────────────────────┐
│ 🦉 معمل القدرات       │  Logo + brand (text-2xl font-extrabold text-green-600)
├──────────────────────┤
│ 📖 تعلم               │  SidebarItem (active: sidebarOutline)
│ 🏆 لوحة المتصدرين     │  SidebarItem (inactive: sidebar)
│ ⭐ المهام             │  SidebarItem
│ 🛍️ المتجر             │  SidebarItem
├──────────────────────┤
│ 👤 UserButton         │  Clerk UserButton (bottom)
└──────────────────────┘
```

**Container:**
```tsx
<div className="right-0 top-0 flex h-full flex-col border-l-2 px-4 lg:fixed lg:w-[256px]">
```

**SidebarItem:**
```tsx
<Button
  variant={isActive ? "sidebarOutline" : "sidebar"}
  className="h-[52px] justify-start"
  asChild
>
  <Link href={href}>
    <Image src={iconSrc} className="ml-5" height={32} width={32} />
    {label}
  </Link>
</Button>
```

Active detection: `const isActive = pathname === href;` via `usePathname()`

### Mobile Header

```tsx
<nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b bg-green-500 px-4 lg:hidden">
  <MobileSidebar />  {/* Sheet trigger with Menu icon */}
</nav>
```

- Fixed to top, green background, `z-50`
- Hidden on desktop (`lg:hidden`)
- Contains Sheet-based sidebar (slides from right in RTL)

### Mobile Sidebar (Sheet)

```tsx
<Sheet>
  <SheetTrigger>
    <Menu className="text-white" />
  </SheetTrigger>
  <SheetContent className="z-[100] p-0" side="right">
    <Sidebar />
  </SheetContent>
</Sheet>
```

Sheet slides from right with 300ms close / 500ms open duration.

---

## 10. Form & Input Patterns

### Server Action with useTransition

Every client component that calls a server action follows this pattern:

```tsx
"use client";

const [pending, startTransition] = useTransition();

const handleAction = () => {
  if (pending) return;  // Guard against double-click

  startTransition(() => {
    serverAction(params)
      .then((response) => {
        if (response?.error) {
          // Handle specific errors
          return;
        }
        // Success logic
      })
      .catch(() => toast.error("حدث خطأ ما. يرجى المحاولة مرة أخرى."));
  });
};

// Button disabled during transition
<Button disabled={pending} onClick={handleAction}>
  {label}
</Button>
```

### Toast Notifications

```tsx
import { toast } from "sonner";

toast.error("حدث خطأ ما.");                    // Error
toast.error("حدث خطأ ما. يرجى المحاولة مرة أخرى.");  // Error with retry message
toast.loading("إعادة التوجيه إلى الدفع...");     // Loading (Stripe redirect)
```

**Toaster configuration:**
```tsx
<Toaster />  // In root layout, theme-aware via next-themes
```

---

## 11. Feedback & Status States

### Answer Status Visual System

| Status | Background | Border | Text | Footer BG | Icon |
|---|---|---|---|---|---|
| **None (selected)** | `bg-sky-100` | `border-sky-300` | `text-sky-500` | default | - |
| **Correct** | `bg-green-100` | `border-green-300` | `text-green-500` | `bg-green-100` | `CheckCircle` (green) |
| **Wrong** | `bg-rose-100` | `border-rose-300` | `text-rose-500` | `bg-rose-100` | `XCircle` (rose) |

### Lesson Footer States

```tsx
<footer className={cn(
  "h-[100px] border-t-2 lg:h-[140px]",
  status === "correct" && "border-transparent bg-green-100",
  status === "wrong" && "border-transparent bg-rose-100"
)}>
  <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6 lg:px-10">

    {/* Status message */}
    {status === "correct" && (
      <div className="flex items-center text-base font-bold text-green-500 lg:text-2xl">
        <CheckCircle className="ml-4 h-6 w-6 lg:h-10 lg:w-10" />
        أحسنت!
      </div>
    )}
    {status === "wrong" && (
      <div className="flex items-center text-base font-bold text-rose-500 lg:text-2xl">
        <XCircle className="ml-4 h-6 w-6 lg:h-10 lg:w-10" />
        حاول مرة أخرى.
      </div>
    )}

    {/* Action button changes variant based on status */}
    <Button
      variant={status === "wrong" ? "danger" : "secondary"}
      size={isMobile ? "sm" : "lg"}
    >
      {status === "none" && "تحقق"}
      {status === "correct" && "التالي"}
      {status === "wrong" && "إعادة المحاولة"}
      {status === "completed" && "متابعة"}
    </Button>
  </div>
</footer>
```

### Disabled States

```css
/* Buttons */
disabled:pointer-events-none disabled:opacity-50

/* Cards */
pointer-events-none opacity-50        /* Course cards */
pointer-events-none hover:bg-white    /* Answer cards during transition */
```

### Hearts Display

```tsx
<div className="flex items-center font-bold text-rose-500">
  <Image src="/heart.svg" height={28} width={28} className="ml-2" />
  {hasActiveSubscription ? (
    <InfinityIcon className="h-6 w-6 shrink-0 stroke-[3]" />
  ) : (
    hearts
  )}
</div>
```

### Points Display

```tsx
<Button variant="ghost" className="text-orange-500">
  <Image src="/points.svg" height={28} width={28} className="mr-2" />
  {points}
</Button>
```

---

## 12. Animations & Transitions

### Button Press (3D)

All filled buttons use border-bottom for depth:
```css
border-b-4           /* Normal state: raised */
active:border-b-0    /* Pressed state: flat */
active:border-b-2    /* Default variant pressed: slightly raised */
```

Lesson path buttons use `border-b-8` for extra depth.

### Loading Spinner

```css
animate-spin         /* Continuous 360° rotation */
```
Used on `Loader` icon from lucide-react.

### Bounce Animation

```tsx
// "Start Lesson" tooltip above current lesson button
<div className="absolute -top-6 right-2.5 z-10 animate-bounce ...">
  ابدأ الدرس
</div>
```

### Confetti (Lesson Complete)

```tsx
<Confetti
  recycle={false}       // One-time burst
  numberOfPieces={500}  // Dense confetti
  tweenDuration={10_000} // 10 second fade
  width={width}         // Full viewport width
  height={height}       // Full viewport height
/>
```

### Dialog/Modal Animations

```css
/* Overlay */
data-[state=open]:fade-in-0
data-[state=closed]:fade-out-0

/* Content */
data-[state=open]:fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]
data-[state=closed]:fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]
duration-200
```

### Sheet (Mobile Sidebar) Animations

```css
data-[state=open]:slide-in-from-right     /* Slide in from right (RTL) */
data-[state=closed]:slide-out-to-right    /* Slide out to right */
data-[state=closed]:duration-300          /* 300ms close */
data-[state=open]:duration-500            /* 500ms open */
```

### Progress Bar Transition

```css
transition-all       /* Smooth width changes on progress indicator */
```

### Hover Transitions

```css
transition-colors    /* Button hover color changes */
transition-opacity   /* Links, close buttons hover */
hover:opacity-75     /* Subtle link hover */
hover:bg-black/5     /* Card hover overlay */
hover:bg-slate-100   /* Button hover fill */
```

### NO Animation (Sidebar Items)

```css
transition-none      /* Sidebar buttons: instant state change, no transition */
```

---

## 13. Responsive Design

### Breakpoints

| Breakpoint | Prefix | Width | Usage |
|---|---|---|---|
| Mobile | (default) | < 1024px | Single column, compact spacing |
| Desktop | `lg:` | >= 1024px | Sidebar visible, multi-column, larger text |
| Wide | `xl:` | >= 1280px | Unit banner continue button visible |
| Small | `sm:` | >= 640px | Modal rounded corners, sheet max-width |

### Mobile vs Desktop Differences

| Element | Mobile | Desktop |
|---|---|---|
| **Navigation** | MobileHeader (green, fixed top, h-[50px]) | Sidebar (fixed right, w-[256px]) |
| **Sidebar** | Hidden | `lg:fixed lg:w-[256px]` |
| **Sticky widgets** | Hidden | `hidden lg:block` |
| **Content padding** | `pt-[50px]` (below mobile header) | `lg:pr-[256px]` (beside sidebar) |
| **Heading size** | `text-lg` | `lg:text-3xl` |
| **Answer cards** | `p-4` | `lg:p-6` |
| **Footer height** | `h-[100px]` | `lg:h-[140px]` |
| **Footer buttons** | `size="sm"` (h-9) | `size="lg"` (h-12) |
| **Status text** | `text-base` | `lg:text-2xl` |
| **Status icons** | `h-6 w-6` | `lg:h-10 lg:w-10` |
| **Mascot (quiz)** | 40x40px | 60x60px (hidden/block toggle) |
| **Answer image** | `max-h-[80px]` | `lg:max-h-[150px]` |
| **Shortcut badge** | 20x20px, text-xs | `lg:h-[30px] lg:w-[30px] lg:text-[15px]` |
| **Course grid** | `grid-cols-2` | `lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]` |
| **Footer banner** | Hidden | `hidden lg:block` |
| **Unit continue btn** | Hidden | `hidden xl:flex` |

### Responsive Image Pattern

```tsx
{/* Desktop version */}
<Image src="/mascot.svg" height={60} width={60}
  className="hidden lg:block" />

{/* Mobile version */}
<Image src="/mascot.svg" height={40} width={40}
  className="block lg:hidden" />
```

### Mobile Detection (programmatic)

```tsx
const isMobile = useMedia("(max-width: 1024px)");
// Used in footer to choose button size
<Button size={isMobile ? "sm" : "lg"} />
```

---

## 14. Iconography

### Icon Library: Lucide React

All icons come from `lucide-react`. Common sizes:

| Context | Size | Example |
|---|---|---|
| Small inline | `h-4 w-4` | Close (X), Check mark |
| Standard | `h-5 w-5` | Loading spinner |
| Medium | `h-6 w-6` | Hearts, infinity icon, status icons |
| Large (desktop) | `h-10 w-10` | Lesson button icons, status icons |

### Icon Styling Patterns

**Filled icon (lesson button):**
```tsx
<Star className="h-10 w-10 fill-primary-foreground text-primary-foreground" />
```

**Stroke-only icon (completed):**
```tsx
<Check className="h-10 w-10 fill-none stroke-[4]" />
```

**Locked state:**
```tsx
<Icon className="fill-neutral-400 stroke-neutral-400 text-neutral-400" />
```

**Thick stroke (infinity):**
```tsx
<InfinityIcon className="h-6 w-6 shrink-0 stroke-[3]" />
```

**Active check (course card):**
```tsx
<Check className="h-4 w-4 stroke-[4] text-white" />
// Inside: rounded-md bg-green-600 p-1.5
```

### Icons Used in the Project

| Icon | Import | Usage |
|---|---|---|
| `X` | lucide-react | Close buttons (dialog, sheet, exit) |
| `Check` | lucide-react | Completed lesson, active course |
| `Crown` | lucide-react | Last lesson in unit |
| `Star` | lucide-react | Current/default lesson |
| `Lock` | lucide-react | Locked lesson (referenced in logic) |
| `Loader` | lucide-react | Loading spinners |
| `Menu` | lucide-react | Mobile hamburger menu |
| `CheckCircle` | lucide-react | Correct answer footer |
| `XCircle` | lucide-react | Wrong answer footer |
| `InfinityIcon` | lucide-react | Unlimited hearts (subscribers) |
| `ArrowLeft` | lucide-react | Back button in learn header |
| `NotebookText` | lucide-react | Continue learning button icon |
| `XIcon` | lucide-react | Banner close button |

### SVG Image Assets (not Lucide)

Used via `next/image` for larger illustrations:

| Asset | Size | Usage |
|---|---|---|
| `mascot.svg` | 40-60px | Sidebar logo, question bubble |
| `mascot_sad.svg` | 80px | Exit modal |
| `mascot_bad.svg` | 80px | Hearts modal |
| `heart.svg` | 22-60px | Hearts display, shop items, practice modal |
| `points.svg` | 20-40px | Points display, quest items, shop |
| `finish.svg` | 100px | Lesson completion screen |
| `hero.svg` | responsive | Marketing page hero |
| `unlimited.svg` | 26-60px | Pro promo card, shop item |
| Flag SVGs | 32-93px | Course cards |
| Character SVGs | responsive | Challenge option images |

---

## 15. Page Layout Templates

### Main App Page Template

All pages under `(main)` follow this exact structure:

```tsx
// Server component (async)
const Page = async () => {
  // Parallel data fetching
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);

  // Auth guard
  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* Right sidebar (appears first in RTL) */}
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>

      {/* Main content */}
      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/icon.svg" height={90} width={90} />
          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            عنوان الصفحة
          </h1>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {/* Page-specific content */}
        </div>
      </FeedWrapper>
    </div>
  );
};
```

### Lesson Page Template

```tsx
// Full-height flex column
<div className="flex h-full flex-col" dir="rtl" lang="ar">
  {/* Lesson header: hearts + progress + exit */}
  <Header hearts={hearts} percentage={percentage}
    hasActiveSubscription={!!subscription?.isActive} />

  {/* Centered challenge area */}
  <div className="flex-1">
    <div className="flex h-full items-center justify-center">
      <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
        <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-right lg:text-3xl">
          {title}
        </h1>
        {type === "ASSIST" && <QuestionBubble question={question} />}
        <Challenge options={options} ... />
      </div>
    </div>
  </div>

  {/* Footer: status + action button */}
  <Footer status={status} onCheck={onContinue} disabled={pending} />
</div>
```

### Loading Page Template

```tsx
const Loading = () => (
  <div className="flex h-full w-full items-center justify-center">
    <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
);
```

---

## 16. Quiz/Lesson UI Patterns

### Lesson Path (Wavy Layout)

Lesson buttons follow an S-curve path using index-based indentation:

```
Cycle of 8 positions:
Index:  0  1  2  3  4  5  6  7
Indent: 0  1  2  1  0 -1 -2 -1

rightPosition = indentationLevel * 40px
```

Visual representation:
```
        ●           (index 2, right: 80px)
      ●             (index 1, right: 40px)
    ●               (index 0, right: 0px)
      ●             (index 7, right: -40px)
        ●           (index 6, right: -80px)
      ●             (index 5, right: -40px)
    ●               (index 4, right: 0px)
      ●             (index 3, right: 40px)
```

Margin: `marginTop: isFirst && !isCompleted ? 60 : 24`

### Question Bubble

```
┌──────────────────────────────┐
│  [Mascot 60x60]  ◄──  Question text in bordered bubble  │
│                     (with CSS triangle pointer)           │
└──────────────────────────────┘
```

```tsx
<div className="mb-6 flex items-center gap-x-4">
  <Image src="/mascot.svg" height={60} width={60} className="hidden lg:block" />
  <Image src="/mascot.svg" height={40} width={40} className="block lg:hidden" />
  <div className="relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base">
    {question}
    {/* CSS triangle pointer */}
    <div className="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent" />
  </div>
</div>
```

### Completion Screen

```tsx
<>
  <Confetti recycle={false} numberOfPieces={500} tweenDuration={10000}
    width={width} height={height} />

  <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
    <Image src="/finish.svg" height={100} width={100} />
    <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
      عمل رائع! <br /> لقد أكملت الدرس.
    </h1>
    <div className="flex w-full items-center gap-x-4">
      <ResultCard variant="points" value={totalPoints} />
      <ResultCard variant="hearts" value={hearts} />
    </div>
  </div>

  <Footer status="completed" onCheck={() => router.push("/learn")} />
</>
```

---

## 17. Gamification UI

### Hearts Display Pattern

| Context | Size | Style |
|---|---|---|
| Lesson header | `28x28` image + text | `font-bold text-rose-500` |
| User progress widget | `22x22` image + text | Inside ghost button, `text-rose-500` |
| Shop item | `60x60` image | Large display |
| Result card | `30x30` image + value | White on rose-500 card |
| Subscriber | `InfinityIcon h-6 w-6 stroke-[3]` | Replaces number |

### Points Display Pattern

| Context | Size | Style |
|---|---|---|
| User progress widget | `28x28` image + number | Inside ghost button, `text-orange-500` |
| Shop refill cost | `20x20` image + number | Inside default button |
| Quest items | `40x40` image | Large, beside progress bar |
| Result card | `30x30` image + value | White on orange-400 card |

### Quest Progress

```tsx
{QUESTS.map((quest) => {
  const progress = (points / quest.value) * 100;
  return (
    <div className="flex w-full items-center gap-x-3 pb-4">
      <Image src="/points.svg" width={40} height={40} />
      <div className="flex w-full flex-col gap-y-2">
        <p className="text-sm font-bold text-neutral-700">{quest.title}</p>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
})}
```

### Leaderboard Row

```tsx
<div className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50">
  <p className="ml-6 font-bold text-lime-700">{index + 1}</p>
  <Avatar className="ml-6 h-12 w-12 border bg-green-500">
    <AvatarImage src={userProgress.userImageSrc} className="object-cover" />
  </Avatar>
  <p className="flex-1 font-bold text-neutral-800">{userProgress.userName}</p>
  <p className="text-muted-foreground">{userProgress.points} نقطة</p>
</div>
```

---

## 18. Accessibility

### Focus Management

All interactive elements use Radix UI focus ring:
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Keyboard Shortcuts

| Key | Action | Component |
|---|---|---|
| `Enter` | Submit/continue answer | Quiz footer |
| `Shift + 1-9` | Select answer option | Quiz answer cards |

Implementation via `useKey()` from `react-use`:
```tsx
useKey("Enter", onCheck, {}, [onCheck]);
useKey(shortcut, handleClick, {}, [handleClick]);
```

### Screen Reader

```tsx
<span className="sr-only">Close</span>           // Dialog/sheet close buttons
<div aria-hidden />                                // Decorative elements (triangles, spacers)
<button aria-disabled={disabled} disabled={disabled}> // Disabled buttons
<Link aria-disabled={locked} />                    // Locked lessons
```

### Semantic HTML

- `<header>` for lesson/page headers
- `<footer>` for lesson footer
- `<nav>` for mobile navigation
- `<main>` for primary content areas
- `<ul>` / `<li>` for lists (quests, shop items)

---

## 19. Do's and Don'ts

### DO

- Use `cn()` for ALL conditional class merging
- Use `border-b-4` + `active:border-b-0` for 3D button depth
- Use `rounded-xl` as default border radius for cards/buttons
- Use `border-2` for card and container borders
- Use `text-neutral-700` for primary body text
- Use `text-muted-foreground` for secondary/helper text
- Use `font-bold` for all headings and labels
- Use `uppercase tracking-wide` for button text
- Use `Promise.all()` for parallel server queries
- Use `useTransition()` for server action calls in client components
- Use `toast.error("حدث خطأ ما.")` for error feedback
- Use SVG icons from `lucide-react`
- Use `next/image` for all images
- Keep modals in `components/modals/` controlled by Zustand stores in `store/`
- Use `hidden lg:block` / `block lg:hidden` for responsive show/hide
- Follow the green → sky → rose → orange → indigo color assignment

### DON'T

- Don't use raw hex colors - use Tailwind classes
- Don't use `transition` on sidebar buttons (use `transition-none`)
- Don't forget the hydration guard (`isClient`) in modal components
- Don't use `<button>` directly - use `<Button>` from `components/ui/button.tsx`
- Don't mix icon libraries - stick to `lucide-react`
- Don't add animations where none exist - match existing patterns
- Don't change the RTL direction - the entire app is Arabic-first
- Don't use `ml-*` where `mr-*` is needed (RTL reverses these)
- Don't create new color tokens - reuse the existing semantic colors
- Don't skip disabled state handling (`disabled:pointer-events-none disabled:opacity-50`)
- Don't forget `aria-disabled` alongside `disabled` on buttons
- Don't use inline styles except for dynamic values (progress width, indentation position)

---

## Component Checklist for New Features

When creating a new component, verify:

- [ ] Uses `cn()` for class merging
- [ ] Uses `Button` from `components/ui/button.tsx` (not raw `<button>`)
- [ ] Uses `next/image` for images (not `<img>`)
- [ ] Uses `lucide-react` for icons
- [ ] Has RTL-compatible spacing (`ml-*` / `mr-*` used correctly)
- [ ] Has responsive variants (`lg:` breakpoint for desktop)
- [ ] Has disabled state with `disabled:pointer-events-none disabled:opacity-50`
- [ ] Has loading state (if async) with `Loader` spinner
- [ ] Uses `useTransition()` for server actions
- [ ] Uses `toast` for error feedback
- [ ] Follows the correct color semantics (green=success, sky=primary, rose=danger)
- [ ] Matches existing border radius (`rounded-xl` for cards, `rounded-full` for circles)
- [ ] Matches existing border style (`border-2 border-b-4` for 3D depth)
- [ ] Has proper `"use client"` directive if using hooks/interactivity
- [ ] Follows the page layout template (FeedWrapper + StickyWrapper) if a page
