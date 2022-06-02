const BASE_URL =
  "https://crypto-quicktake-lambda.netlify.app/.netlify/functions";

export const fetchBinanceUsAccount = async ({ pair }) => {
  try {
    const response = await fetch(`${BASE_URL}/binance_us`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; charset=utf-8", // ! important
      },
      body: JSON.stringify({ pair }),
    });

    const json = await response.json();
    return json.data;
  } catch (err) {
    return { error: err };
  }

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
};
