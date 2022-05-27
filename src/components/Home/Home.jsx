import React, { useState, useEffect } from "react";
import { AddApiKey } from "../AddApiKey";
import { Spinner } from "@chakra-ui/react";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [apiKeySecretPairs, setApiKeySecretPairs] = useState();
  useEffect(() => {
    const init = async () => {
      const result = await chrome.storage.sync.get(["apiKeySecretPairs"]);
      if (result.apiKySecretPairs) {
        setApiKeySecretPairs(result.apiKySecretPairs);
      }

      setLoading(false);

      console.log("result.apiKeySecretPairs :>> ", result.apiKeySecretPairs);
    };

    init();
  }, []);
  return loading ? (
    <Spinner />
  ) : apiKeySecretPairs?.length > 0 ? (
    <div>Home</div>
  ) : (
    <AddApiKey />
  );
};
