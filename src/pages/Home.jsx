import React from "react";
import { categories } from "../api/categories";
import CategoryTabs from "../components/CategoryTabs";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`/questions/${category}`);
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <h1
        className="mb-8 md:mb-10 font-bold text-4xl md:text-5xl text-yellow-500 text-center"
        style={{ textShadow: "2px 2px 0px #b45309" }}
      >
        Flashcard Quiz Fun
      </h1>
      <CategoryTabs
        categories={categories}
        selectedCategory="all"
        onSelectCategory={handleCategorySelect}
      />
    </div>
  );
}
