import React from "react";
import PropTypes from "prop-types";
import {
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
  Button
} from "@chakra-ui/react";

export const EditModal = (props) => {
  const { isEditModalOpen, onEditModalClose } = props;
  return (
    <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
      <ModalOverlay />
      <ModalContent margin="auto 10px">
        <ModalHeader>Edit your API</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={2}>
            <FormLabel>Crypto Exchange</FormLabel>
            <Input isReadOnly placeholder="Exchange" size="md" />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>API Key</FormLabel>
            <Input placeholder="API Key" name="apiKey" />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>API secret</FormLabel>
            <Input placeholder="API secret" name="apiSecret" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onEditModalClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

EditModal.propTypes = {
  isEditModalOpen: PropTypes.func.isRequired,
  onEditModalClose: PropTypes.func.isRequired
};
