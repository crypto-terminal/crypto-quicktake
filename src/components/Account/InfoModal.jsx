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
  Button,
  Textarea
} from "@chakra-ui/react";

export const InfoModal = (props) => {
  const { isInfoModalOpen, onInfoModalClose, pair } = props;

  return (
    <Modal isOpen={isInfoModalOpen} onClose={onInfoModalClose}>
      <ModalOverlay />
      <ModalContent margin="auto 10px">
        <ModalHeader>Full API Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={2}>
            <FormLabel>Crypto Exchange</FormLabel>
            <Input isReadOnly placeholder="Exchange" size="md" value={pair.ex?.text} />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>API Key</FormLabel>
            <Textarea placeholder="API Key" name="apiKey" value={pair.apiKey} />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>API secret</FormLabel>
            <Textarea placeholder="API secret" name="apiSecret" value={pair.apiSecret} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onInfoModalClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

InfoModal.propTypes = {
  isInfoModalOpen: PropTypes.func.isRequired,
  onInfoModalClose: PropTypes.func.isRequired,
  pair: PropTypes.exact({
    apiKey: PropTypes.string.isRequired,
    apiSecret: PropTypes.string.isRequired,
    ex: PropTypes.exact({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  }).isRequired
};
