import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";

export const AddApiKey = () => {
  return (
    <Flex width={"360px"} height={"560px" /* 600px - 40px (TopNav) */}>
      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
        >
          Select <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>Binance US</MenuItem>
          <MenuItem>OKCoin</MenuItem>
          <MenuItem>Gemini</MenuItem>
          <MenuItem>Coinbase</MenuItem>
          <MenuItem>Kraken</MenuItem>
        </MenuList>
      </Menu>
      <Input placeholder="API key" size="md" />
      <Input placeholder="API secret" size="md" />
      <Container width={"100%"}>
        <Heading fontSize="xl">Security Warning</Heading>
        <Text mt={4}>
          Please make sure the access of your API key is restricted as read-only
          or can-read, nothing more. You should not be able to buy/sell
          cryptocurrencies or withdraw money via your API key.
        </Text>
      </Container>
    </Flex>
  );
};
 