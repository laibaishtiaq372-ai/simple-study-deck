import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_FLASHCARDS,
  loadFlashcards,
  newCardId,
  saveFlashcards,
  type Flashcard,
} from "@/lib/flashcards";

/**
 * Holds all flashcard state: the card list, which card is showing,
 * whether the answer is revealed, and add/edit/delete actions.
 * Data is loaded from and saved to localStorage automatically.
 */
export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>(DEFAULT_FLASHCARDS);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  // Loading happens in an effect so server rendering and the first client
  // render match (localStorage is only available in the browser).
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCards(loadFlashcards());
    setLoaded(true);
  }, []);

  // Save on every change once the initial load is done.
  useEffect(() => {
    if (loaded) saveFlashcards(cards);
  }, [cards, loaded]);

  // Keep the index inside the valid range if cards are removed.
  useEffect(() => {
    if (index > cards.length - 1) setIndex(Math.max(0, cards.length - 1));
  }, [cards.length, index]);

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setShowAnswer(false);
  }, []);

  const next = useCallback(() => {
    setShowAnswer(false);
    setIndex((i) => (cards.length ? (i + 1) % cards.length : 0));
  }, [cards.length]);

  const previous = useCallback(() => {
    setShowAnswer(false);
    setIndex((i) => (cards.length ? (i - 1 + cards.length) % cards.length : 0));
  }, [cards.length]);

  const addCard = useCallback((question: string, answer: string) => {
    const card: Flashcard = { id: newCardId(), question: question.trim(), answer: answer.trim() };
    setCards((prev) => {
      const updated = [...prev, card];
      setIndex(updated.length - 1);
      setShowAnswer(false);
      return updated;
    });
  }, []);

  const updateCard = useCallback((id: string, question: string, answer: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, question: question.trim(), answer: answer.trim() } : c)),
    );
  }, []);

  const deleteCard = useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    setShowAnswer(false);
  }, []);

  return {
    cards,
    index,
    currentCard: cards[index],
    showAnswer,
    toggleAnswer: () => setShowAnswer((s) => !s),
    goTo,
    next,
    previous,
    addCard,
    updateCard,
    deleteCard,
  };
}
