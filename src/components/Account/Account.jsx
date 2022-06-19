import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { ApiKeySecretPairList } from "./ApiKeySecretPairList";
import { AccountFooter } from "./AccountFooter";

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

  return (
    <Flex
      height="560px"
      width="360px"
      paddingLeft="10px"
      paddingRight="10px"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
    >
      {pairs && <ApiKeySecretPairList pairs={pairs} />}
      <AccountFooter />
    </Flex>
  );
};
