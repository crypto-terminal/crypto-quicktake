import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { AddApiKey } from "../.AddApiKey";
import { fetchBinanceUsAccount } from "../../libs";
import { AccountInfo } from "../.AccountInfo";

const requests = {
  binance_us: {
    account: fetchBinanceUsAccount,
  },
};

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [apiKeySecretPairs, setApiKeySecretPairs] = useState();
  const [currentAccount, setCurrentAccount] = useState();
  const [currentAccountIndex, setCurrentAccountIndex] = useState();

  useEffect(() => {
    const init = async () => {
      try {
        // First, get account api key secret pairs
        const result = await chrome.storage.sync.get(["apiKeySecretPairs"]);
        if (
          !result.apiKeySecretPairs ||
          result.apiKeySecretPairs.length === 0
        ) {
          setLoading(false);
          return;
        }
        setApiKeySecretPairs(result.apiKeySecretPairs);

        // always fetch the first account
        const pair = result.apiKeySecretPairs[0];
        const request = requests[pair.ex.id].account;
        const accountInfo = await request({ pair });
        setCurrentAccount(accountInfo);
      } catch (error) {
        // !TODO: handle error
        console.error("error :>> ", error);
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <Spinner />;

  if (currentAccount) return <AccountInfo currentAccount={currentAccount} />;

  if (!apiKeySecretPairs)
    return <AddApiKey setApiKeySecretPairs={setApiKeySecretPairs} />;

  return null;
};
