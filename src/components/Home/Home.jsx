import React, { useState, useEffect, useCallback } from "react";
import { Stack, Spinner, Button, Flex } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AddApiKey } from "../.AddApiKey";
import { fetchAll } from "../../libs";
import { AccountInfo } from "../.AccountInfo";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [apiKeySecretPairs, setApiKeySecretPairs] = useState();
  const [currentAccount, setCurrentAccount] = useState();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

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
      } catch (error) {
        // !TODO: handle error
        console.error("error :>> ", error);
      }

      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    const fetchAccount = async () => {
      if (!apiKeySecretPairs) return;
      setLoading(true);
      const pair = apiKeySecretPairs[currentPairIndex];

      const request = fetchAll[pair.ex.id].account;
      const accountInfo = await request({ pair });

      setCurrentAccount({ ...accountInfo, currentApiPair: pair });
      setLoading(false);
    };

    fetchAccount();
  }, [currentPairIndex, apiKeySecretPairs]);

  const handleGoPrevAccount = useCallback(() => {
    if (apiKeySecretPairs && apiKeySecretPairs.length > 1) {
      setCurrentPairIndex(
        (i) => (i + apiKeySecretPairs.length - 1) % apiKeySecretPairs.length
      );
    }
  }, [apiKeySecretPairs, setCurrentPairIndex]);

  const handleGoNextAccount = useCallback(() => {
    if (apiKeySecretPairs && apiKeySecretPairs.length > 1) {
      setCurrentPairIndex((i) => (i + 1) % apiKeySecretPairs.length);
    }
  }, [apiKeySecretPairs, setCurrentPairIndex]);

  if (loading) return <Spinner />;

  if (currentAccount)
    return (
      <React.Fragment>
        <AccountInfo currentAccount={currentAccount} />
        <Flex align="center" justify="center" height="40px" boxShadow="base">
          <Stack spacing={8} direction="row">
            <Button
              leftIcon={<FaChevronLeft />}
              colorScheme="blue"
              onClick={handleGoPrevAccount}
              size="xs"
            >
              Prev
            </Button>
            <Button
              rightIcon={<FaChevronRight />}
              colorScheme="blue"
              onClick={handleGoNextAccount}
              size="xs"
            >
              Next
            </Button>
          </Stack>
        </Flex>
      </React.Fragment>
    );

  if (!apiKeySecretPairs)
    return <AddApiKey setApiKeySecretPairs={setApiKeySecretPairs} />;

  return null;
};
