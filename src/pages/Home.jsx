import React from "react";
import FlashcardList from "../components/FlashcardList";

export default function Home() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-10 md:py-20">
      <h1 className="font-bold text-4xl md:text-5xl text-yellow-700 text-shadow-sm text-shadow-zinc-500 text-center mb-8 md:mb-10">
        Trivia Flashcard App
      </h1>
      <div className="bg-yellow-500 p-10 md:p-15 px-6 md:p-10 rounded-2xl">
        <FlashcardList />
      </div>
      <footer className="text-center my-6 md:my-10 text-zinc-700">
        © 2025 Mon. Learned React.
      </footer>
    </div>
  );
}
