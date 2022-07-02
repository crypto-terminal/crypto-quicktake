import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListIcon,
  Tooltip,
  Text,
  HStack,
  Badge,
  useDisclosure
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import { removeOnePairFromChromeAsync, setApiKeyAsMainAsync } from "../../libs";
import { AreYouSure as AreYouSureModal } from "../.AreYouSure";
import { InfoModal } from "./InfoModal";

export const ApiListItem = ({ pair }) => {
  const { ex, apiKey, trucatedApiKey, isMain } = pair;

  const {
    isOpen: isInfoModalOpen,
    onOpen: onInfoModalOpen,
    onClose: onInfoModalClose
  } = useDisclosure();

  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose
  } = useDisclosure();

  const handleRemoveOnePair = useCallback(async () => {
    await removeOnePairFromChromeAsync(apiKey);
  }, [apiKey]);

  const handleSetMain = useCallback(async () => {
    await setApiKeyAsMainAsync(apiKey);
  }, []);

  return (
    <React.Fragment>
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
            onClick={onInfoModalOpen}
          >
            Info
          </Badge>
          <Badge
            variant="outline"
            colorScheme="red"
            _hover={{ cursor: "pointer" }}
            onClick={onConfirmModalOpen}
          >
            Remove
          </Badge>
        </HStack>
      </ListItem>
      <AreYouSureModal
        isModalOpen={isConfirmModalOpen}
        handleOnYes={handleRemoveOnePair}
        handleOnNo={onConfirmModalClose}
        noText="Never mind"
        question="to remove this account?"
      />
      <InfoModal
        isInfoModalOpen={isInfoModalOpen}
        onInfoModalClose={onInfoModalClose}
        pair={pair}
      />
    </React.Fragment>
  );
};

ApiListItem.propTypes = {
  pair: PropTypes.exact({
    apiKey: PropTypes.string.isRequired,
    apiSecret: PropTypes.string.isRequired,
    ex: PropTypes.exact({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }),
    trucatedApiKey: PropTypes.string.isRequired,
    isMain: PropTypes.bool.isRequired,
    onInfoModalOpen: PropTypes.func.isRequired
  }).isRequired
};
