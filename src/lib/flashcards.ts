/**
 * Flashcard data model + localStorage persistence helpers.
 *
 * Flashcards are stored in the browser's localStorage so they survive
 * page reloads and remain available when the app is reopened.
 */

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export const STORAGE_KEY = "vellum-flashcards";

/** Starter cards shown on first launch, so the app never opens empty. */
export const DEFAULT_FLASHCARDS: Flashcard[] = [
  {
    id: "card-1",
    question: "What does CPU stand for?",
    answer: "Central Processing Unit — the part of a computer that executes instructions.",
  },
  {
    id: "card-2",
    question: "Name the three main CSS selectors.",
    answer: "Element (tag), class (.name), and id (#name) selectors.",
  },
  {
    id: "card-3",
    question: "What does a closing curly brace do in most programming languages?",
    answer:
      "It terminates a block of code, marking where a function, loop, or conditional ends.",
  },
  {
    id: "card-4",
    question: "What is HTML?",
    answer: "HyperText Markup Language — the standard language for structuring web pages.",
  },
];

/** Load saved cards from localStorage, falling back to the defaults. */
export function loadFlashcards(): Flashcard[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FLASHCARDS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_FLASHCARDS;
    // Keep only well-formed cards in case the stored data is corrupted.
    return parsed.filter(
      (c): c is Flashcard =>
        !!c && typeof c.id === "string" && typeof c.question === "string" && typeof c.answer === "string",
    );
  } catch {
    return DEFAULT_FLASHCARDS;
  }
}

/** Persist the full card list to localStorage. */
export function saveFlashcards(cards: Flashcard[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {
    // Storage may be unavailable (private mode) — fail silently.
  }
}

/** Generate a unique id for a new flashcard. */
export function newCardId(): string {
  return `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
