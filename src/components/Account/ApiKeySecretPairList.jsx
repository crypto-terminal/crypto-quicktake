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
import { EditModal } from "./EditModal";
import { ApiListItem } from "./ApiListItem";

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
          <ApiListItem pair={pair} key={pair.apiKey} />
        ))}
      </List>
      <EditModal
        isEditModalOpen={isEditModalOpen}
        onEditModalClose={onEditModalClose}
      />
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

