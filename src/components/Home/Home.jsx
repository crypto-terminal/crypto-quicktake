import React, { useState, useEffect } from "react";
import { AddApiKey } from "../AddApiKey";
import { Spinner } from "@chakra-ui/react";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [apiKySecretPairs, setApiKySecretPairs] = useState();
  useEffect(() => {
    chrome.storage.sync.get(["apiKySecretPairs"], function (result) {
      console.log("Value currently is " + result.apiKySecretPairs);
    });
  }, []);
  return loading ? (
    <Spinner />
  ) : apiKySecretPairs ? (
    <div>Home</div>
  ) : (
    <AddApiKey />
  );
};
