import React from "react";
import FlashcardList from "../components/FlashcardList";

export default function Home() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-10 md:py-20">
      <h1
        className="mb-8 md:mb-10 font-bold text-4xl md:text-5xl text-yellow-500 text-center"
        style={{ textShadow: "2px 2px 0px #b45309" }}
      >
        Flashcard Quiz Fun
      </h1>
      <div>
        <FlashcardList />
      </div>
      <footer className="text-center my-6 md:my-10 text-zinc-700">
        © 2025 Mon. Learned React.
      </footer>
    </div>
  );
}
