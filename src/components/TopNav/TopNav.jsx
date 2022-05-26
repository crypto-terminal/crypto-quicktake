import { Flex, Button } from "@chakra-ui/react";
import { FaHome, FaBell, FaUserLock, FaChartLine } from "react-icons/fa";

const buttons = [
  {
    leftIcon: FaHome,
    text: "Home",
  },
  {
    leftIcon: FaBell,
    text: "News",
  },
  {
    rightIcon: FaChartLine,
    text: "Market",
  },
  {
    rightIcon: FaUserLock,
    text: "Account",
  },
];

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
      {buttons.map((button, index) => {
        return (
          <Button
            key={index}
            leftIcon={button.leftIcon ? <button.leftIcon /> : undefined}
            rightIcon={button.rightIcon ? <button.rightIcon /> : undefined}
            colorScheme="blue"
            variant="outline"
            size="xs"
          >
            {button.text}
          </Button>
        );
      })}
    </Flex>
  );
};
