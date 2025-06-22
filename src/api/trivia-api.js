const BASE_URL = "https://the-trivia-api.com/v2";

export const getAllQuestions = async () => {
  const api = await fetch(`${BASE_URL}/questions?limit=10`);
  const response = await api.json();
  return response;
};

export const getQuestionsByCategory = async (categories, limit = 10) => {
  const categoriesParam = categories.join(",");

  const api = await fetch(
    `${BASE_URL}/questions?categories=${categoriesParam}&limit=${limit}`
  );
  const response = await api.json();
  return response;
};
