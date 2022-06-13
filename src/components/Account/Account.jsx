import React, { useEffect, useState } from "react";
import { ApiKeySecretPairList } from "./ApiKeySecretPairList";

export const Account = () => {
  const [pairs, setPairs] = useState();
  useEffect(() => {
    const init = async () => {
      const result = await chrome.storage.sync.get(["apiKeySecretPairs"]);
      if (!result.apiKeySecretPairs || result.apiKeySecretPairs.length === 0) {
        return;
      }

      setPairs(result.apiKeySecretPairs);
    };

    init();
  }, []);

  if (pairs) {
    return <ApiKeySecretPairList pairs={pairs} />;
  }
  return null;
};
