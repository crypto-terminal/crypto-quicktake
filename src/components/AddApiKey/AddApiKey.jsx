import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Box,
  Button,
  Heading,
  Text,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { exchanges } from "../../constants";

export const AddApiKey = () => {
  return (
    <Flex
      width={"360px"}
      height={"560px" /* 600px - 40px (TopNav) */}
      flexDirection="column"
      alignItems="space-between"
      p="10px"
    >
      <Stack spacing={3}>
        <HStack spacing="8px">
          <Menu>
            <MenuButton
              minWidth={"unset"}
              as={Button}
              rightIcon={<FaChevronDown />}
            >
              Select
            </MenuButton>
            <MenuList>
              {exchanges.map((ex, index) => {
                return (
                  <MenuItem key={index} id={ex.id}>
                    {ex.text}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Input isReadOnly placeholder="Exchange or Wallet" size="md" />
        </HStack>

        <Input autoFocus placeholder="API key" size="md" />
        <Input placeholder="API secret" size="md" />
      </Stack>

      <Box mt={3} p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Security Warning</Heading>
        <Text mt={4}>
          Please make sure the access of your API key is restricted as read-only
          or can-read, nothing more.
        </Text>
        <Text mt={4}>
          You should not be able to buy/sell cryptocurrencies or withdraw money
          via your API key.
        </Text>
      </Box>
    </Flex>
  );
};
 