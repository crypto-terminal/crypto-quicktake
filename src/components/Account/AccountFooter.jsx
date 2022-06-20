import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Flex,
  useDisclosure,
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
  HStack,
} from "@chakra-ui/react";
import { FaUserPlus, FaFileExcel, FaChevronDown } from "react-icons/fa";
import { exchanges } from "../../constants";

const DEFAULT_INPUT = {};

export const AccountFooter = () => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose
  } = useDisclosure();

  const {
    isOpen: isBulkAddOpen,
    onOpen: onBulkAddOpen,
    onClose: onBulkAddClose
  } = useDisclosure();

  return (
    <React.Fragment>
      <Flex
        height="40px"
        width="360px"
        padding="0 10px"
        justify="space-between"
        alignItems="center"
        boxShadow="base"
      >
        <Button
          leftIcon={<FaUserPlus />}
          colorScheme="blue"
          variant="outline"
          size="xs"
          onClick={onAddOpen}
        >
          Add
        </Button>
        <Button
          leftIcon={<FaFileExcel />}
          colorScheme="blue"
          variant="outline"
          size="xs"
          onClick={onBulkAddOpen}
        >
          Bulk Add
        </Button>
      </Flex>
      <AddModal isAddOpen={isAddOpen} onAddClose={onAddClose} />
    </React.Fragment>
  );
};

const AddModal = (props) => {
  const { isAddOpen, onAddClose } = props;
  const [input, setInput] = useState(DEFAULT_INPUT);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current = JSON.parse(JSON.stringify(input));
  }, [input]);

  const handleUpdatePair = useCallback(
    (evt) => {
      const key = evt.target.name;
      const value =
        typeof evt.target.value === "string"
          ? evt.target.value.trim()
          : evt.target.value;
      setInput((_input) => ({
        ..._input,
        [key]: value
      }));
    },
    [setInput]
  );

  const handleAdd = useCallback(async () => {
    if (
      !inputRef?.current?.apiKey ||
      !inputRef?.current?.apiSecret ||
      !inputRef?.current?.ex
    ) {
      alert("Please fill all fields"); // eslint-disable-line no-alert
      return;
    }
    // console.log(inputRef?.current);
    // get the current key/secret pairs from chrome storage

    // add the key/secret pair

    // update the key/secret pairs in the chrome storage

    setInput(DEFAULT_INPUT);
    onAddClose();
  }, [onAddClose, inputRef, setInput]);

  return (
    <Modal isOpen={isAddOpen} onClose={onAddClose}>
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
            <Input
              isReadOnly
              placeholder="Exchange or Wallet"
              size="md"
              value={input.ex?.text || ""}
            />
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
          <Button colorScheme="blue" mr={3} onClick={handleAdd}>
            Save
          </Button>
          <Button onClick={onAddClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};;;

AddModal.propTypes = {
  isAddOpen: PropTypes.func.isRequired,
  onAddClose: PropTypes.func.isRequired,
};

const BulkAddModal = () => {
  return <></>;
};
