# CodeAlpha_FlashcardQuizApp — Vellum

A flashcard quiz app built with React, TypeScript, Tailwind CSS, and TanStack Start.
Each flashcard has a question on the front and an answer on the back.

## Features

- **Show / Hide answer** on the current flashcard
- **Next / Previous** navigation with wrap-around, plus clickable progress ticks
- **Card counter** — e.g. "Card 3 of 10"
- **Add, Edit, Delete** flashcards from the side panel
- **Input validation** — empty questions or answers cannot be saved
- **Persistent storage** — cards are saved to `localStorage` and reloaded when the app reopens
- **Responsive layout** — two columns on desktop, stacked on mobile

## Project structure

```
src/
├── routes/
│   ├── __root.tsx        # App shell, fonts, global metadata
│   └── index.tsx         # Main page: study card + card manager
├── components/
│   ├── StudyCard.tsx     # Flashcard display, reveal toggle, navigation, progress
│   └── CardManager.tsx   # Card list + add/edit form with validation
├── hooks/
│   └── useFlashcards.ts  # All flashcard state and actions
├── lib/
│   └── flashcards.ts     # Data model + localStorage load/save helpers
└── styles.css            # Design tokens (colors, fonts, card tilt effect)
```

## Running the project

```sh
# Install dependencies
bun install

# Start the dev server
bun run dev

# Production build
bun run build
```

Then open http://localhost:8080 in your browser.

## How data is stored

Cards are serialized to JSON and written to `localStorage` under the key
`vellum-flashcards` on every change. On startup the app reads that key; if it's
missing or invalid, a small set of default starter cards is shown instead.
