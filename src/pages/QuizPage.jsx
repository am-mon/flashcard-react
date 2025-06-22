import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllQuestions, getQuestionsByCategory } from "../api/trivia-api";
import FlashcardList from "../components/FlashcardList";
import Loader from "../components/Loader";

export default function QuizPage() {
  const { categories } = useParams(); // e.g., "history,music"
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);

    let data;

    if (categories === "all") {
      data = await getAllQuestions();
    } else {
      const categoryArray = categories.split(",");
      data = await getQuestionsByCategory(categoryArray);
    }

    console.log("categories:", categories, data);
    setQuestions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, [categories]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-10 md:py-20">
      <h1 className="mb-8 md:mb-10 font-bold text-3xl md:text-4xl text-center text-yellow-700">
        <span
          className="text-yellow-500"
          style={{ textShadow: "1px 1px 0px #b45309" }}
        >
          Quiz:
        </span>{" "}
        {categories.replaceAll(",", ", ").replaceAll("_", " ")}
      </h1>

      {questions.length === 0 ? (
        <p className="text-center my-20 text-xl">No questions found.</p>
      ) : (
        <FlashcardList data={questions} reloadQuestions={fetchQuestions} />
      )}
    </div>
  );
}
