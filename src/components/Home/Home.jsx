import React, { useState, useEffect } from "react";
import { AddApiKey } from "../AddApiKey";
import { Spinner } from "@chakra-ui/react";
import List from "rc-virtual-list";
import { fetchBinanceUsAccount } from "../../libs";

const requests = {
  binance_us: {
    account: fetchBinanceUsAccount,
  },
};

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [apiKeySecretPairs, setApiKeySecretPairs] = useState();

  useEffect(() => {
    const init = async () => {
      const result = await chrome.storage.sync.get(["apiKeySecretPairs"]);
      if (result.apiKeySecretPairs) {
        setApiKeySecretPairs(result.apiKeySecretPairs);
      }

      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (!apiKeySecretPairs || apiKeySecretPairs.length === 0) return;

    const pair = apiKeySecretPairs[0];

    const sendRequest = async () => {
      setLoading(true);
      const request = requests[pair.ex.id]["account"];
      const data = await request({ pair });
      console.log("data :>> ", data);
      setLoading(false);
    };

    sendRequest();
  }, [apiKeySecretPairs, setLoading]);

  return loading ? (
    <Spinner />
  ) : apiKeySecretPairs?.length > 0 ? (
    <List data={[0, 1, 2]} height={200} itemHeight={30} itemKey="id">
      {(item, index) => {
        return <div>{index}</div>;
      }}
    </List>
  ) : (
    <AddApiKey setApiKeySecretPairs={setApiKeySecretPairs} />
  );
};
