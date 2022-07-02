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
  Button,
  Text
} from "@chakra-ui/react";

export const AreYouSure = (props) => {
  const { isModalOpen, handleOnYes, handleOnNo, yesText, noText, question } =
    props;

  return (
    <Modal isOpen={isModalOpen} onClose={handleOnNo}>
      <ModalOverlay />
      <ModalContent margin="auto 10px">
        <ModalHeader>Are you sure</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <Text fontSize="md">{question}</Text>
        </ModalBody>

        <ModalFooter>
          <Button size="sm" mr={2} colorScheme="red" onClick={handleOnYes}>
            {yesText}
          </Button>
          <Button size="sm" colorScheme="blue" onClick={handleOnNo}>
            {noText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

AreYouSure.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  handleOnYes: PropTypes.func.isRequired,
  handleOnNo: PropTypes.func.isRequired,
  yesText: PropTypes.string,
  noText: PropTypes.string,
  question: PropTypes.string
};

AreYouSure.defaultProps = {
  yesText: "Yes",
  noText: "No",
  question: "to do this?"
};
