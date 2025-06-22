const BASE_URL = "https://the-trivia-api.com/v2";

export const getAllQuestions = async () => {
  const api = await fetch(`${BASE_URL}/questions?limit=10`);
  const response = api.json();
  return response;
};
