const BASE_URL = "https://crypto-quicktake-lambda.netlify.app/.netlify/functions"; // "http://localhost:8888/.netlify/functions";

export const fetchGeminiAccount = async ({ pair }) => {
  const response = await fetch(`${BASE_URL}/gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain; charset=utf-8" // ! important
    },
    body: JSON.stringify({ pair })
  });

  const json = await response.json();
  return json.data; // { accountInfo: { balances }, totalBalance: number }
};
