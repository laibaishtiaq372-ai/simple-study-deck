import { useEffect, useState } from "react";
import type { Flashcard } from "@/lib/flashcards";

interface CardManagerProps {
  cards: Flashcard[];
  activeIndex: number;
  onAdd: (question: string, answer: string) => void;
  onUpdate: (id: string, question: string, answer: string) => void;
  onDelete: (id: string) => void;
  onSelect: (index: number) => void;
}

/** Side panel: list of all cards plus the add/edit form with validation. */
export function CardManager({
  cards,
  activeIndex,
  onAdd,
  onUpdate,
  onDelete,
  onSelect,
}: CardManagerProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  // When an edit starts, fill the form with that card's values.
  useEffect(() => {
    if (!editingId) return;
    const card = cards.find((c) => c.id === editingId);
    if (card) {
      setQuestion(card.question);
      setAnswer(card.answer);
    }
  }, [editingId, cards]);

  function resetForm() {
    setFormOpen(false);
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setError("");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Basic input validation: neither field may be empty.
    if (!question.trim() && !answer.trim()) {
      setError("Question and answer are both required.");
      return;
    }
    if (!question.trim()) {
      setError("Question field is required to save this card.");
      return;
    }
    if (!answer.trim()) {
      setError("Answer field is required to save this card.");
      return;
    }

    if (editingId) {
      onUpdate(editingId, question, answer);
    } else {
      onAdd(question, answer);
    }
    resetForm();
  }

  return (
    <aside className="rounded-[26px] border border-line bg-card/70 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">Your cards</h3>
        <button
          onClick={() => {
            setEditingId(null);
            setQuestion("");
            setAnswer("");
            setError("");
            setFormOpen(true);
          }}
          className="rounded-full bg-ember px-4 py-2 text-sm font-medium text-card transition-colors duration-200 hover:bg-primary"
        >
          Add card
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-2xl bg-background/70 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft">
            {editingId ? "Edit card" : "New card"}
          </p>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            className="w-full rounded-lg border border-line bg-card px-3 py-2.5 text-sm outline-none focus:border-ember"
          />
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            className="w-full rounded-lg border border-line bg-card px-3 py-2.5 text-sm outline-none focus:border-ember"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-ember"
            >
              Save card
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-line px-4 py-2.5 text-sm transition-colors duration-200 hover:border-foreground"
            >
              Cancel
            </button>
          </div>

          {error && (
            <p className="flex items-center gap-2 rounded-lg border border-error/40 bg-error/5 px-3 py-2 text-xs text-error">
              <span className="size-1.5 shrink-0 rounded-full bg-error" /> {error}
            </p>
          )}
        </form>
      )}

      <ul className="mt-4 space-y-1.5">
        {cards.map((card, i) => (
          <li
            key={card.id}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
              i === activeIndex
                ? "border-2 border-ember bg-ember-soft/40"
                : "border border-line/70 bg-card"
            }`}
          >
            <span
              className={`font-mono text-[10px] ${i === activeIndex ? "font-medium text-ember" : "text-soft"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <button
              onClick={() => onSelect(i)}
              className="min-w-0 flex-1 truncate text-left text-sm"
            >
              {card.question}
            </button>
            <button
              onClick={() => {
                setEditingId(card.id);
                setFormOpen(true);
                setError("");
              }}
              className="rounded-md px-2 py-1 text-xs text-soft transition-colors hover:bg-ember-soft hover:text-foreground"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="rounded-md px-2 py-1 text-xs text-error transition-colors hover:bg-error hover:text-card"
            >
              Delete
            </button>
          </li>
        ))}
        {cards.length === 0 && (
          <li className="rounded-xl border border-line/70 bg-card px-3 py-4 text-center text-sm text-soft">
            No cards yet — add one above.
          </li>
        )}
      </ul>
    </aside>
  );
}
