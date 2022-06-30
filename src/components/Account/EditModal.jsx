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
  const { isEditModalOpen, handleOnClose, currentEditableApi } = props;

  return (
    <Modal isOpen={isEditModalOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent margin="auto 10px">
        <ModalHeader>Edit your API</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={2}>
            <FormLabel>Crypto Exchange</FormLabel>
            <Input
              isReadOnly
              placeholder="Exchange"
              size="md"
              value={currentEditableApi.ex?.text}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>API Key</FormLabel>
            <Input
              placeholder="API Key"
              name="apiKey"
              value={currentEditableApi.apiKey}
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>API secret</FormLabel>
            <Input
              placeholder="API secret"
              name="apiSecret"
              value={currentEditableApi.apiSecret}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={handleOnClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

EditModal.propTypes = {
  isEditModalOpen: PropTypes.func.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  currentEditableApi: PropTypes.object.isRequired // eslint-disable-line
};
