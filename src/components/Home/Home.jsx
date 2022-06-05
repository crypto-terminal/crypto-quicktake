import React, { useState, useEffect } from "react";
import { AddApiKey } from "../.AddApiKey";
import { Spinner } from "@chakra-ui/react";
import List from "rc-virtual-list";
import { fetchBinanceUsAccount } from "../../libs";
import { TotalBalance, CoinList } from "../.AccountInfo";

const requests = {
  binance_us: {
    account: fetchBinanceUsAccount,
  },
};

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [apiKeySecretPairs, setApiKeySecretPairs] = useState();
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        // First, get account api key secret pairs
        const result = await chrome.storage.sync.get(["apiKeySecretPairs"]);
        if (
          !result.apiKeySecretPairs ||
          result.apiKeySecretPairs.length === 0
        ) {
          return;
        }
        setApiKeySecretPairs(result.apiKeySecretPairs);

        // always fetch the first account
        const pair = result.apiKeySecretPairs[0];
        const request = requests[pair.ex.id]["account"];
        const accountInfo = await request({ pair });
        setCurrentAccount(accountInfo);
      } catch (error) {
        // !TODO: handle error
        console.log("error :>> ", error);
      }

      setLoading(false);
    };

    init();
  }, []);

  return loading ? (
    <Spinner />
  ) : currentAccount ? (
    <List data={[0, 1, 2]} height={200} itemHeight={30} itemKey="id">
      {(item, index) => {
        return <div>{index}</div>;
      }}
    </List>
  ) : (
    <AddApiKey setApiKeySecretPairs={setApiKeySecretPairs} />
  );
};
