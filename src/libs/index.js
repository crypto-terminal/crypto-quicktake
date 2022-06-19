import { fetchBinanceUsAccount } from "./fetch-binance-us";
import { fetchGeminiAccount } from "./fetch-gemini";

export const fetchAll = {
  binance_us: {
    account: fetchBinanceUsAccount,
  },
  gemini: {
    account: fetchGeminiAccount,
  },
};


export * from "./storage-crud";