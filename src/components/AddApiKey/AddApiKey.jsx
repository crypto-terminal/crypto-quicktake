import React, { useState, useEffect } from "react";
import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Box,
  Button,
  Heading,
  Text,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { exchanges } from "../../constants";

export const AddApiKey = (props) => {
  const [apiKeySecretPair, setApiKeySecretPair] = useState({});

  useEffect(() => {
    // ! convention: start with tmp, then all lowercase component name, then, var name
    chrome.storage.sync.get(["tmp_addapikey_pair"], function (result) {
      setApiKeySecretPair(result.tmp_addapikey_pair || {});
    });
  }, []);

  const handleUpdateApiKey = (kv) => {
    const pair = {
      ...apiKeySecretPair,
      ...kv,
    };
    setApiKeySecretPair(pair);

    chrome.storage.sync.set({ tmp_addapikey_pair: pair }, function () {
      console.log("DO NOT FORGET TO DELETE TMP VALUE AFTER SUBMIT");
    });
  };

  const handleSubmit = async () => {
    // determine if it's empty object
    if (JSON.stringify(apiKeySecretPair) === "{}") {
      alert("Please enter your API key");
      return;
    }

    if (
      !apiKeySecretPair.apiKey ||
      !apiKeySecretPair.apiSecret ||
      !apiKeySecretPair.ex
    ) {
      alert("Please fill all fields");
      return;
    }

    let pairs;
    const result = await chrome.storage.sync.get(["apiKeySecretPairs"]);
    if (result.apiKeySecretPairs) {
      // prevent duplicates
      const alreadyExistingKey = result.apiKeySecretPairs.find(
        (pair) => pair.apiKey === apiKeySecretPair.apiKey
      );
      if (alreadyExistingKey) {
        alert("API key already exists");
      } else {
        pairs = [...result.apiKeySecretPairs, apiKeySecretPair];
      }
    } else {
      pairs = [apiKeySecretPair];
    }
    await chrome.storage.sync.set({
      apiKeySecretPairs: pairs,
    });

    //  clean up tmp values in storage
    await chrome.storage.sync.remove(["tmp_addapikey_pair"]);

    // finally, change api pairs in parent component
    props.setApiKeySecretPairs(pairs);
  };

  return (
    <Flex
      width={"360px"}
      height={"560px" /* 600px - 40px (TopNav) */}
      flexDirection="column"
      alignItems="space-between"
      p="10px"
    >
      <Stack spacing={3}>
        <HStack spacing="8px">
          <Menu>
            <MenuButton
              minWidth={"unset"}
              as={Button}
              rightIcon={<FaChevronDown />}
            >
              Select
            </MenuButton>
            <MenuList>
              {exchanges.map((ex, index) => {
                return (
                  <MenuItem
                    key={index}
                    id={ex.id}
                    onClick={() => handleUpdateApiKey({ ex })}
                  >
                    {ex.text}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Input
            isReadOnly
            placeholder="Exchange or Wallet"
            size="md"
            value={apiKeySecretPair.ex?.text || ""}
          />
        </HStack>

        <Input
          autoFocus
          placeholder="API key"
          size="md"
          value={apiKeySecretPair.apiKey || ""}
          onChange={(evt) =>
            handleUpdateApiKey({ apiKey: evt.target.value.trim() })
          }
        />
        <Input
          placeholder="API secret"
          size="md"
          value={apiKeySecretPair.apiSecret || ""}
          onChange={(evt) =>
            handleUpdateApiKey({ apiSecret: evt.target.value.trim() })
          }
        />
      </Stack>

      <Box mt={3} p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Security Warning</Heading>
        <Text mt={4}>
          Please make sure the access of your API key is restricted as read-only
          or can-read, nothing more.
        </Text>
        <Text mt={4}>
          You should not be able to buy/sell cryptocurrencies or withdraw money
          via your API key.
        </Text>
      </Box>
      <Button mt={3} colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </Flex>
  );
};;
