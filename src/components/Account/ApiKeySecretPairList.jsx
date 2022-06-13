import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "@chakra-ui/react";

export const ApiKeySecretPairList = ({ pairs }) => {
  const isMainAccount = useCallback(() => {}, []);

  return (
    <List spacing={3}>
      {pairs.map((pair) => (
        <ListItem key={pair.apiKey}>
          {pair.apiKey} -- {pair.ex.text}
        </ListItem>
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
