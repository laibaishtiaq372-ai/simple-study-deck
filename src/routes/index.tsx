import { createFileRoute } from "@tanstack/react-router";
import { CardManager } from "@/components/CardManager";
import { StudyCard } from "@/components/StudyCard";
import { useFlashcards } from "@/hooks/useFlashcards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vellum — Flashcard Quiz App" },
      {
        name: "description",
        content:
          "A calm flashcard quiz app: flip cards to reveal answers, navigate your deck, and add, edit or delete cards that stay saved on your device.",
      },
      { property: "og:title", content: "Vellum — Flashcard Quiz App" },
      {
        property: "og:description",
        content:
          "Study with flashcards: reveal answers, move between cards, and manage your own deck. Saved locally in your browser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const {
    cards,
    index,
    currentCard,
    showAnswer,
    toggleAnswer,
    goTo,
    next,
    previous,
    addCard,
    updateCard,
    deleteCard,
  } = useFlashcards();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-body text-foreground antialiased">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-ember/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] left-[-8%] h-[440px] w-[440px] rounded-full bg-ember-soft/70 blur-3xl"
      />

      <header className="relative z-10 flex items-center justify-between px-5 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-md bg-primary font-display text-lg italic text-primary-foreground">
            V
          </span>
          <div className="leading-none">
            <p className="font-display text-lg font-semibold">Vellum</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft">Study box</p>
          </div>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft">
          Session saved locally
        </p>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl gap-8 px-5 pb-16 md:grid-cols-[1.15fr_0.85fr] md:px-10">
        <StudyCard
          card={currentCard}
          index={index}
          total={cards.length}
          showAnswer={showAnswer}
          onToggleAnswer={toggleAnswer}
          onNext={next}
          onPrevious={previous}
          onSelect={goTo}
        />

        <CardManager
          cards={cards}
          activeIndex={index}
          onAdd={addCard}
          onUpdate={updateCard}
          onDelete={deleteCard}
          onSelect={goTo}
        />
      </main>

      <footer className="relative z-10 border-t border-line/60 px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft">
            Vellum — a calm corner for small study sessions
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft">
            {cards.length} cards · saved to this device
          </p>
        </div>
      </footer>
    </div>
  );
}
