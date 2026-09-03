import type { Flashcard } from "@/lib/flashcards";

interface StudyCardProps {
  card: Flashcard | undefined;
  index: number;
  total: number;
  showAnswer: boolean;
  onToggleAnswer: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
}

/** The study surface: one flashcard, reveal toggle, and navigation. */
export function StudyCard({
  card,
  index,
  total,
  showAnswer,
  onToggleAnswer,
  onNext,
  onPrevious,
  onSelect,
}: StudyCardProps) {
  if (!card) {
    return (
      <section className="flex flex-col">
        <div className="mt-4 rounded-[26px] border border-line bg-card/70 p-10 text-center">
          <h2 className="font-display text-2xl font-semibold">No cards yet</h2>
          <p className="mt-2 text-sm text-soft">
            Add your first flashcard using the panel to start studying.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col">
      <div className="flex items-end justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-soft">
          Card {index + 1} of {total}
        </p>
        <p className="font-mono text-xs tracking-[0.18em] text-ember">
          {showAnswer ? "Revealed" : "Hidden"}
        </p>
      </div>

      <div className="mt-4 rounded-[26px] bg-gradient-to-br from-ember/10 to-ember/0 p-[13px]">
        <div className="rounded-[19px] bg-gradient-to-b from-ember/15 to-ember/5 p-px">
          <div className="card-tilt relative overflow-hidden rounded-[18px] bg-card px-6 pt-8 pb-6">
            <div className="flex items-center justify-between text-soft">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Question</span>
              <span className="size-2 rounded-full bg-ember" />
            </div>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-[2.5rem]">
              {card.question}
            </h2>

            {showAnswer ? (
              <div className="mt-8 border-t border-line pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft">Answer</p>
                <p className="mt-2 max-w-[42ch] text-pretty font-body text-lg leading-snug">
                  {card.answer}
                </p>
              </div>
            ) : (
              <div className="mt-8 border-t border-line pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft">Answer</p>
                <p className="mt-2 text-sm text-soft">Hidden — press “Show answer” to reveal.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={onToggleAnswer}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-ember"
        >
          {showAnswer ? "Hide answer" : "Show answer"}
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={total < 2}
            className="rounded-full border border-line bg-card/60 px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-foreground disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={total < 2}
            className="rounded-full border border-line bg-card/60 px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-foreground disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Progress ticks — one per card, current card highlighted */}
      <div className="mt-6 flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to card ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i === index ? "bg-ember" : "bg-line"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
