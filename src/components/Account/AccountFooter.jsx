import React, { useCallback } from "react";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { FaUserPlus, FaFileExcel, FaTrashAlt } from "react-icons/fa";
import { clearAllPairsAsync } from "../../libs";
import { AddModal } from "./AddModal";
import { AreYouSure as AreYouSureModal } from "../.AreYouSure";

export const AccountFooter = () => {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

  const {
    isOpen: isConfirmClearModalOpen,
    onOpen: onConfirmClearModalOpen,
    onClose: onConfirmClearModalClose
  } = useDisclosure();

  const handleClearConfirmModalYes = useCallback(() => {
    clearAllPairsAsync().then(() => {
      onConfirmClearModalClose();
    });
  }, [onConfirmClearModalClose]);

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
          onClick={() => null}
        >
          Bulk Add
        </Button>
        <Button
          leftIcon={<FaTrashAlt />}
          colorScheme="grey"
          variant="outline"
          size="xs"
          onClick={onConfirmClearModalOpen}
        >
          Clear All
        </Button>
      </Flex>
      <AddModal isAddOpen={isAddOpen} onAddClose={onAddClose} />
      <AreYouSureModal
        isModalOpen={isConfirmClearModalOpen}
        handleOnYes={handleClearConfirmModalYes}
        handleOnNo={onConfirmClearModalClose}
        question="to delete all APIs?"
      />
    </React.Fragment>
  );
};
