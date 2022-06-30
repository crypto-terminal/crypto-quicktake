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
import {
  FaUserPlus,
  FaFileExcel,
  FaChevronDown,
  FaTrashAlt
} from "react-icons/fa";
import { exchanges } from "../../constants";
import {
  getAllPairsFromChromeAsync,
  setAllPairsToChromeAsync,
  getTmpPairSync,
  setTmpPairSync,
  removeTmpPair,
  clearAllPairs
} from "../../libs";
import { AddModal } from './AddModal'


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
        <Button
          leftIcon={<FaTrashAlt />}
          colorScheme="grey"
          variant="outline"
          size="xs"
          onClick={clearAllPairs}
        >
          Clear All
        </Button>
      </Flex>
      <AddModal isAddOpen={isAddOpen} onAddClose={onAddClose} />
    </React.Fragment>
  );
};


const BulkAddModal = () => {
  return <></>;
};
