import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListIcon,
  Tooltip,
  Text,
  HStack,
  Badge
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";

export const ApiKeySecretPairList = ({ pairs }) => {
  const isMainAccount = useCallback(() => {}, []);

  return (
    <List width="100%" height="520px">
      {pairs.map((pair) => (
        <ApiItem pair={pair} key={pair.apiKey} />
      ))}
    </List>
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
  const trucatedApiKey = useMemo(() => {
    const l = pair.apiKey.length;
    return `${pair.apiKey.slice(0, 6)}...${pair.apiKey.slice(l - 5)}`;
  }, []);

  return (
    <ListItem width="100%" mt={3}>
      <HStack spacing={1} width="100%">
        <ListIcon as={FaCog} color="green.500" />
        <Text fontWeight={700} minWidth="80px">
          {pair.ex.text}:
        </Text>
        <Text w="80px" noOfLines={1}>
          <Tooltip hasArrow placement="top" label={pair.apiKey}>
            {trucatedApiKey /** fixed width */}
          </Tooltip>
        </Text>

        <Badge variant="outline" colorScheme="green">
          Main
        </Badge>
        <Badge variant="outline" colorScheme="green">
          Edit
        </Badge>
        <Badge variant="outline" colorScheme="red">
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
      text: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
