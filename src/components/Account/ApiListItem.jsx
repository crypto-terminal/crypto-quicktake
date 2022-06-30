import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListIcon,
  Tooltip,
  Text,
  HStack,
  Badge
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import { removeOnePairFromChromeAsync, setApiKeyAsMainAsync } from "../../libs";

export const ApiListItem = ({ pair }) => {
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
    onEditModalOpen: PropTypes.func.isRequired
  }).isRequired
};
