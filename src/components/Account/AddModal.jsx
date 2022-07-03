import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import {
  getAllPairsFromChromeAsync,
  setAllPairsToChromeAsync,
  getTmpPairSync,
  setTmpPairSync,
  removeTmpPair
} from "../../libs";

import { exchanges } from "../../constants";

const DEFAULT_INPUT = {};

// add key/secret pairs repeatedly
// should consider to prevent duplicates
export const AddModal = (props) => {
  const { isAddOpen, onAddClose } = props;
  const [input, setInput] = useState(DEFAULT_INPUT);
  const inputRef = useRef();

  useEffect(() => {
    getTmpPairSync(setInput);
  }, [setInput]);

  useEffect(() => {
    inputRef.current = JSON.parse(JSON.stringify(input));
    setTmpPairSync(input);
  }, [input]);

  const handleUpdatePair = useCallback(
    (evt) => {
      const key = evt.target.name;
      const value =
        typeof evt.target.value === "string" ? evt.target.value.trim() : evt.target.value;
      setInput((_input) => ({
        ..._input,
        [key]: value
      }));
    },
    [setInput]
  );

  const handleAdd = useCallback(async () => {
    if (!inputRef?.current?.apiKey || !inputRef?.current?.apiSecret || !inputRef?.current?.ex) {
      alert("Please fill all fields"); // eslint-disable-line no-alert
      return;
    }
    // console.log(inputRef?.current);
    // get the current key/secret pairs from chrome storage
    const allPairs = await getAllPairsFromChromeAsync(); // always returns an array

    const isUniquePair = !allPairs.find((pair) => pair.apiKey === inputRef.current.apiKey);
    if (isUniquePair) {
      // add the key/secret pair
      allPairs.push(inputRef.current);

      // update the key/secret pairs in the chrome storage
      setAllPairsToChromeAsync(allPairs);

      setInput(DEFAULT_INPUT);
      removeTmpPair();
      onAddClose();
    } else {
      alert("API key already exists"); // eslint-disable-line
    }
  }, [onAddClose, inputRef, setInput]);

  const handleClose = useCallback(() => {
    setInput(DEFAULT_INPUT);
    removeTmpPair();
    onAddClose();
  }, [setInput]);

  return (
    <Modal isOpen={isAddOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent margin="auto 10px">
        <ModalHeader>Add your API</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <HStack spacing="8px">
            <Menu>
              <MenuButton
                minWidth="unset"
                as={Button}
                rightIcon={<FaChevronDown />}
                _hover={{ bg: "gray.400" }}
              >
                Select
              </MenuButton>
              <MenuList>
                {exchanges.map((ex) => (
                  <MenuItem
                    key={ex.id}
                    id={ex.id}
                    onClick={() =>
                      handleUpdatePair({
                        target: {
                          name: "ex",
                          value: ex
                        }
                      })
                    }
                  >
                    {ex.text}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Input isReadOnly placeholder="Exchange" size="md" value={input.ex?.text || ""} />
          </HStack>
          <FormControl mt={2}>
            <FormLabel>API Key</FormLabel>
            <Input
              placeholder="API Key"
              value={input.apiKey || ""}
              name="apiKey"
              onChange={handleUpdatePair}
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>API secret</FormLabel>
            <Input
              placeholder="API secret"
              value={input.apiSecret || ""}
              name="apiSecret"
              onChange={handleUpdatePair}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={2} onClick={handleAdd}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

AddModal.propTypes = {
  isAddOpen: PropTypes.func.isRequired,
  onAddClose: PropTypes.func.isRequired
};
