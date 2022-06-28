import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListIcon,
  Tooltip,
  Text,
  HStack,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import { removeOnePairFromChromeAsync, setApiKeyAsMainAsync } from "../../libs";

export const ApiKeySecretPairList = ({ pairs }) => {
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose
  } = useDisclosure();

  const _pairs = useMemo(() => {
    return pairs.map((pair, index) => {
      const first5 = pair.apiKey.slice(0, 5);
      const last5 = pair.apiKey.slice(pair.apiKey.length - 5);
      return {
        ...pair,
        trucatedApiKey: `${first5}...${last5}`,
        isMain: index === 0,
        onEditModalOpen
      };
    });
  }, []);

  return (
    <React.Fragment>
      <List width="100%" height="520px">
        {_pairs.map((pair) => (
          <ApiItem pair={pair} key={pair.apiKey} />
        ))}
      </List>
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
    </React.Fragment>
  );
};

ApiKeySecretPairList.propTypes = {
  pairs: PropTypes.arrayOf(
    PropTypes.exact({
      apiKey: PropTypes.string.isRequired,
      apiSecret: PropTypes.string.isRequired,
      ex: PropTypes.exact({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    })
  ).isRequired
};

const ApiItem = ({ pair }) => {
  const { ex, apiKey, trucatedApiKey, isMain, onEditModalOpen } = pair;
  const handleRemoveOnePair = useCallback(async () => {
    await removeOnePairFromChromeAsync(apiKey);
  }, [apiKey]);

  const handleSetMain = useCallback(async () => {
    await setApiKeyAsMainAsync(apiKey);
  }, []);
  return (
    <ListItem width="100%" mt={3}>
      <HStack spacing={1} width="100%">
        <ListIcon as={FaCog} color="green.500" />
        <Text fontWeight={700} minWidth="80px">
          {ex.text}:
        </Text>
        <Text w="80px" noOfLines={1}>
          <Tooltip hasArrow placement="top" label={apiKey}>
            {trucatedApiKey /** fixed width */}
          </Tooltip>
        </Text>

        <Badge
          variant="outline"
          colorScheme={isMain ? "green" : "gray"}
          _hover={{ cursor: "pointer" }}
          onClick={handleSetMain}
        >
          Main
        </Badge>
        <Badge
          variant="outline"
          colorScheme="green"
          _hover={{ cursor: "pointer" }}
          onClick={onEditModalOpen}
        >
          Edit
        </Badge>
        <Badge
          variant="outline"
          colorScheme="red"
          _hover={{ cursor: "pointer" }}
          onClick={handleRemoveOnePair}
        >
          Remove
        </Badge>
      </HStack>
    </ListItem>
  );
};

ApiItem.propTypes = {
  pair: PropTypes.exact({
    apiKey: PropTypes.string.isRequired,
    apiSecret: PropTypes.string.isRequired,
    ex: PropTypes.exact({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }),
    trucatedApiKey: PropTypes.string.isRequired,
    isMain: PropTypes.bool.isRequired,
    onEditModalOpen: PropTypes.func.isRequired
  }).isRequired
};
