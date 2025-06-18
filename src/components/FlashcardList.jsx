import { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";

export default function FlashcardList() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const api = await fetch(
          `https://the-trivia-api.com/v2/questions?limit=10`
        );
        const data = await api.json();
        console.log(data);

        const formattedCards = data.map((fc, i) => {
          const allAnswers = [...fc.incorrectAnswers, fc.correctAnswer];
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

          return {
            id: fc.id || i,
            question: fc.question,
            correctAnswer: fc.correctAnswer,
            answers: shuffledAnswers,
          };
        });

        setCards(formattedCards);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    setSelectedAnswer(answer);

    const isCorrect = answer === cards[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Wait 1.5s before moving to next question
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < cards.length) {
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
      } else {
        setFinished(true);
      }
    }, 2000);
  };

  if (finished) {
    return (
      <div>
        <h3 className="font-bold text-xl mb-8 bg-yellow-700 text-white p-3 rounded-3xl text-center border-4">
          Your Score: {score}/ {cards.length}
        </h3>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setFinished(false);
            setSelectedAnswer(null);
          }}
          className="bg-black text-white hover:bg-yellow-800 p-3 px-7 text-lg font-medium rounded-full mx-auto block cursor-pointer"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="">
      {/* {cards?.map((card) => (
        <Flashcard key={card.id} card={card} onAnswer={handleAnswer} />
      ))} */}

      <h3 className="font-bold text-xl mb-8 bg-yellow-700 text-white p-3 rounded-3xl text-center border-4">
        Current Score: {score} / {cards.length}
      </h3>

      {cards.length > 0 && (
        <Flashcard
          key={cards[currentIndex].id}
          card={cards[currentIndex]}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          index={currentIndex}
        />
      )}
    </div>
  );
}
