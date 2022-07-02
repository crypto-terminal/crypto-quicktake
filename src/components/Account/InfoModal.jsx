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
  const { isInfoModalOpen, handleOnClose, currentApiInfo } = props;

  return (
    <Modal isOpen={isInfoModalOpen} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent margin="auto 10px">
        <ModalHeader>Full API Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={2}>
            <FormLabel>Crypto Exchange</FormLabel>
            <Input
              isReadOnly
              placeholder="Exchange"
              size="md"
              value={currentApiInfo.ex?.text}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>API Key</FormLabel>
            <Textarea
              placeholder="API Key"
              name="apiKey"
              value={currentApiInfo.apiKey}
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>API secret</FormLabel>
            <Textarea
              placeholder="API secret"
              name="apiSecret"
              value={currentApiInfo.apiSecret}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleOnClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

InfoModal.propTypes = {
  isInfoModalOpen: PropTypes.func.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  currentApiInfo: PropTypes.object.isRequired // eslint-disable-line
};
