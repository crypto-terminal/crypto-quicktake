import React, { useCallback } from "react";
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
  Input
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import {
  getAllPairsFromChromeAsync,
  setAllPairsToChromeAsync,
  getTmpPairSync,
  setTmpPairSync,
  removeTmpPair
} from "../../libs";

// add key/secret pairs in bulk
// should consider to prevent duplicates
export const BulkAddModal = (props) => {
  const { isBulkAddOpen, onBulkAddClose } = props;

  const handleBulkAdd = useCallback(() => {}, []);

  return (
    <Modal isOpen={isBulkAddOpen} onClose={onBulkAddClose}>
      <ModalOverlay />
      <ModalContent margin="auto 10px">
        <ModalHeader>Add your APIs in bulk</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={2}>
            <FormLabel>Upload excel or csv file</FormLabel>
            <Input type="file" height="unset" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={2} onClick={handleBulkAdd}>
            Submit
          </Button>
          <Button onClick={onBulkAddClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

BulkAddModal.propTypes = {
  isBulkAddOpen: PropTypes.func.isRequired,
  onBulkAddClose: PropTypes.func.isRequired
};
