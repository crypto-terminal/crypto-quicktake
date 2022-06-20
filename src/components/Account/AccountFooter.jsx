import React, { useCallback } from "react";
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

export const AccountFooter = () => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isBulkAddOpen,
    onOpen: onBulkAddOpen,
    onClose: onBulkAddClose,
  } = useDisclosure();

  const handleAddOne = useCallback(() => {}, []);
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
      <AddModal
        isAddOpen={isAddOpen}
        onAddClose={onAddClose}
        handleAdd={handleAdd}
      />
    </React.Fragment>
  );
};

const AddModal = (props) => {
  const { isAddOpen, onAddClose, handleAdd } = props;
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
              >
                Select
              </MenuButton>
              <MenuList>
                {exchanges.map((ex) => (
                  <MenuItem key={ex.id} id={ex.id}>
                    {ex.text}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Input isReadOnly placeholder="Exchange or Wallet" size="md" />
          </HStack>
          <FormControl>
            <FormLabel>API Key</FormLabel>
            <Input placeholder="API Key" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>API secret</FormLabel>
            <Input placeholder="API secret" />
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
};

AddModal.propTypes = {
  isAddOpen: PropTypes.func.isRequired,
  onAddClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

const BulkAddModal = () => {
  return <></>;
};
