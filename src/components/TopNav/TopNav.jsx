import { Flex, Button } from "@chakra-ui/react";
import { FaHome, FaBell, FaUserLock, FaChartLine } from "react-icons/fa";

export const TopNav = () => {
  return (
    <Flex
      height="40px"
      width="360px"
      paddingLeft={"10px"}
      paddingRight={"10px"}
      justify={"space-around"}
      alignItems="center"
      boxShadow="base"
    >
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
    </Flex>
  );
};
