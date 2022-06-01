import cryptoJs from "crypto-js";

const BASE_URL = "https://api.binance.us";

const ENDPOINTS = {
  USER_ACCOUNT: "/api/v3/account",
  USER_STATUS: "/wapi/v3/accountStatus.html",
};

const getSignature = (API_SECRET, timestamp) =>
  cryptoJs.HmacSHA256(
    new URLSearchParams({ timestamp }).toString(),
    API_SECRET
  );

const getQuery = (signature, timestamp) =>
  new URLSearchParams({ timestamp, signature }).toString();

export const fetchBinanceUsAccount = async ({ pair }) => {
  const timestamp = Date.now();
  const API_KEY = pair.apiKey;
  const API_SECRET = pair.apiSecret;
  const signature = getSignature(API_SECRET, timestamp);
  const query = getQuery(signature, timestamp);

  const response = await fetch(
    `${BASE_URL}${ENDPOINTS.USER_ACCOUNT}?${query}`,
    {
      method: "GET",
      headers: {
        "X-MBX-APIKEY": API_KEY,
      },
    }
  );
  const json = await response.json();
  // {
  //     makerCommission: 10,
  //     takerCommission: 10,
  //     buyerCommission: 0,
  //     sellerCommission: 0,
  //     canTrade: true,
  //     canWithdraw: true,
  //     canDeposit: true,
  //     updateTime: 1653966350572,
  //     accountType: 'SPOT',
  //     balances: [
  //        { asset: 'BTC', free: '0.00000000', locked: '0.00000000' },
  //        { asset: 'ETH', free: '0.00000000', locked: '0.00000000' },
  //        { asset: 'USD', free: '0.0000', locked: '0.0000' },
  //        { asset: 'XRP', free: '0.00000000', locked: '0.00000000' },
  //     ],
  //     permissions: [ 'SPOT' ]
  // }
  return json;
};
