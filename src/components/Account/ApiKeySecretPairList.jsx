import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListIcon,
  Tooltip,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";

export const ApiKeySecretPairList = ({ pairs }) => {
  const isMainAccount = useCallback(() => {}, []);

  return (
    <List spacing={3}>
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
        text: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
};

const ApiItem = ({ pair }) => {
  const trucatedApiKey = useMemo(() => {
    const l = pair.apiKey.length;
    return `${pair.apiKey.slice(0, 6)}...${pair.apiKey.slice(l - 5)}`;
  }, []);
  return (
    <ListItem>
      <HStack spacing={1}>
        <ListIcon as={FaCog} color="green.500" />
        <Text fontWeight={700}>{pair.ex.text}</Text>
        <Text maxWidth="120px" noOfLines={1}>
          <Tooltip hasArrow placement="top" label={pair.apiKey}>
            {trucatedApiKey}
          </Tooltip>
        </Text>
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
