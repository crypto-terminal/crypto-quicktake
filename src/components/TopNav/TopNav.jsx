import { Flex, Stack, Button } from "@chakra-ui/react";
import { FaHome, FaBell, FaUserLock, FaChartLine } from "react-icons/fa";

export const TopNav = () => {
  return (
    <Flex
      height="40px"
      width="360px"
      paddingLeft={"10px"}
      paddingRight={"10px"}
      justify={"space-between"}
      alignItems="center"
      boxShadow="base"
    >
      <Stack direction="row" spacing={1}>
        <Button
          leftIcon={<FaHome />}
          colorScheme="blue"
          variant="outline"
          size="xs"
        >
          Home
        </Button>
        <Button
          leftIcon={<FaBell />}
          colorScheme="blue"
          variant="outline"
          size="xs"
        >
          News
        </Button>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button
          rightIcon={<FaChartLine />}
          colorScheme="blue"
          variant="outline"
          size="xs"
        >
          Market
        </Button>
        <Button
          rightIcon={<FaUserLock />}
          colorScheme="blue"
          variant="outline"
          size="xs"
        >
          Account
        </Button>
      </Stack>
    </Flex>
  );
};
