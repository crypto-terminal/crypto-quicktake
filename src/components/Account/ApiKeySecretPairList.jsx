import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { List } from "@chakra-ui/react";
import { ApiListItem } from "./ApiListItem";

export const ApiKeySecretPairList = ({ pairs }) => {
  const _pairs = useMemo(() => {
    return pairs.map((pair, index) => {
      const first5 = pair.apiKey.slice(0, 5);
      const last5 = pair.apiKey.slice(pair.apiKey.length - 5);
      return {
        ...pair,
        trucatedApiKey: `${first5}...${last5}`,
        isMain: index === 0
      };
    });
  }, [pairs]);

  return (
    <List width="100%" height="520px">
      {_pairs.map((pair) => (
        <ApiListItem pair={pair} key={pair.apiKey} />
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
