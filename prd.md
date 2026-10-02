Product Requirements Document (PRD): Booking Appointment App
1. Project Overview & Tech Stack

Core Objective: A seamless, 4-step wizard for booking an appointment, culminating in a submission to a backend database. No authentication required.

Frontend: React 18+, TypeScript, Vite.

Styling: Tailwind CSS.

Animations: Framer Motion (smooth step transitions).

Backend/Database: Supabase (PostgreSQL + Supabase JS Client).

State Management & Caching: Zustand with persist middleware (using localStorage to ensure form data survives accidental page reloads, cleared only upon successful submission).

2. Database Architecture (Supabase)

Table Name: appointments

Columns:

id (uuid, primary key, default: uuid_generate_v4())

guest_name (text, not null)

proposed_dates (jsonb, not null) — Stores an array of date-time pairs (e.g., [{ "date": "2026-10-15", "time": "19:00" }])

activities (text[], not null) — Array of selected activities

created_at (timestamp, default: now())

Cursor Directive: Ensure Row Level Security (RLS) is configured to allow anonymous INSERT operations.

3. UI/UX & Theming Guidelines

Target Device: Strictly mobile-first, heavily optimized for the iPhone 15 Pro screen dimensions (393px × 852px). Wrap the app in a centralized container (max-w-[393px] mx-auto min-h-screen shadow-2xl relative overflow-x-hidden) on desktop browsers to simulate the mobile experience.

Color Palette: Modern & Professional.

Background: Off-white/light gray (bg-slate-50).

Primary Accent: Deep Indigo or Slate Blue (bg-indigo-600 or bg-slate-800) for primary buttons and active states.

Text: High contrast (text-slate-900 for headings, text-slate-500 for secondary text).

Placeholders: Use gray skeleton boxes or simple abstract SVG placeholders (<div className="w-full h-48 bg-slate-200 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Image Placeholder</div>) wherever images are intended.

4. State Management (Zustand Cache Store)

Create a useBookingStore using Zustand.

State shape:

step (number, default 1)

name (string, default "")

dates (array of objects: { date: string, time: string }, default [])

activities (array of strings, default [])

Actions: setStep, setName, addDate, removeDate, toggleActivity, addCustomActivity, resetStore.

Wrap the store in Zustand's persist middleware.

5. User Flow & Screen Requirements

Step 1: Identity

UI: Large, welcoming heading ("Let's get started. What's your name?").

Input: A clean, large, underline-only or softly rounded text input for the user's name.

Action: "Next" button (disabled if name is empty).

Step 2: Date & Time Selection

UI: Heading ("When are you free?").

Constraint: The calendar must disable past dates (only allow selecting dates >= today).

Input:

A calendar UI to pick a date.

A time picker or time slot grid to attach a time to the selected date.

An "Add Date" button to push the selection to the dates array.

Display: A list/chip row showing currently selected date-time pairs with a small "x" to remove them.

Action: "Next" button (disabled if the dates array is empty) and "Back" button.

Step 3: Activity Selection

UI: Heading ("What should we do?"). Image placeholder at the top of this screen.

Input: A grid of selectable cards/buttons containing emojis/icons and text (e.g., 🎬 Movies, ☕️ Cafe, 🍱 Lunch). These function as checkboxes (multi-select allowed).

Custom Option: A text input with an "Add" button allowing the user to type and add a custom activity to their selection array.

Action: "Next" button (disabled if activities array is empty) and "Back" button.

Step 4: Review

UI: "Does this look right?" heading.

Content: A summary card displaying the Name, the list of Proposed Dates/Times, and the Selected Activities in a highly legible, visually appealing format (using subtle dividers and Lucide icons).

Action: "Confirm Appointment" button (triggers Supabase API call). Show a loading spinner inside the button during the await state. "Back" button to make edits.

Step 5: Thank You Screen

Lifecycle Hook: Upon successfully rendering this screen, immediately call resetStore to clear the localStorage cache so the next visit starts entirely fresh.

UI: Success animation (e.g., a checkmark drawing itself via Framer Motion).

Content: "Thank you! Your appointment is confirmed." Image placeholder for a celebratory graphic.

Action: "Book Another" button (returns to Step 1).

6. Animation Requirements (Framer Motion)

Step Transitions: Wrap the main form area in <AnimatePresence mode="wait">.

Use a custom direction state (direction: 1 for next, -1 for back).

New steps should slide in from the correct side (x: 100 * direction, opacity: 0 to x: 0, opacity: 1) while the previous step slides out (x: -100 * direction, opacity: 0).

Micro-interactions: Buttons scale down on tap (whileTap={{ scale: 0.95 }}). Selected activity cards and date chips feature a smooth border/background color transition and a slight scale-up (whileHover={{ scale: 1.02 }}).

7. Implementation Directives for Cursor

Initialize a Vite React TS project and install dependencies: tailwindcss, framer-motion, @supabase/supabase-js, zustand, lucide-react, date-fns (for date formatting).

Set up standard Tailwind configuration.

Implement the Zustand store with persist first.

Build the layout shell (iPhone 15 Pro container constraints).

Implement steps 1 through 5 as separate components rendered conditionally based on useBookingStore().step.

Wire up the supabase.from('appointments').insert(...) call on Step 4. Ensure environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are utilized properly.