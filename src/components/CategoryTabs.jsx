import React from "react";
import { useState } from "react";
import { categories } from "../api/categories";
import { useNavigate } from "react-router-dom";

export default function CategoryTabs() {
  const [selectedCategory, setSelectedCategory] = useState([]);

  const navigate = useNavigate();

  const handleSelect = (cat) => {
    if (cat === "all") {
      setSelectedCategory(["all"]);
    } else {
      setSelectedCategory((prev) =>
        prev.includes(cat)
          ? prev.filter((c) => c !== cat)
          : [...prev.filter((c) => c !== "all"), cat]
      );
    }
  };

  const handleStart = () => {
    const path = selectedCategory.includes("all")
      ? "/quiz/all"
      : `/quiz/${selectedCategory.join(",")}`;
    navigate(path);
  };

  return (
    <div className="text-center">
      <div className="bg-white py-7 px-5 md:p-10 rounded-2xl">
        <h3 className="mb-7 text-xl md:text-2xl font-bold text-yellow-700">
          Pick One or More&nbsp;Categories
        </h3>

        <div className="grid md:grid-cols-2 gap-2">
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className={`px-4 py-2 rounded-full font-semibold ${
                selectedCategory.includes(cat)
                  ? "bg-yellow-500 text-yellow-900"
                  : "bg-yellow-300 text-yellow-800 hover:bg-yellow-400"
              }`}
            >
              {cat.replaceAll("_", " ")}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 mt-2">
          <button
            onClick={() => handleSelect("all")}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedCategory.includes("all")
                ? "bg-yellow-500 text-yellow-900"
                : "bg-yellow-300 text-yellow-800 hover:bg-yellow-400"
            } `}
          >
            All Categories
          </button>
        </div>
      </div>

      {selectedCategory.length > 0 && (
        <button
          onClick={handleStart}
          className="mt-7 px-6 py-2 text-xl bg-yellow-700 text-white rounded-full font-bold hover:bg-yellow-800"
        >
          Start Quiz
        </button>
      )}
    </div>
  );
}
