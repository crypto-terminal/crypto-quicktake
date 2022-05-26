import {
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";

export const AddApiKey = () => {
  return (
    <VStack>
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
          File <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>Binance US</MenuItem>
          <MenuItem>OKCoin</MenuItem>
        </MenuList>
      </Menu>
      <Input placeholder="API key" size="md" />
      <Input placeholder="API secret" size="md" />
    </VStack>
  );
};
