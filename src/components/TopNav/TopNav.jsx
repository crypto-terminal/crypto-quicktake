import { Flex, Button } from "@chakra-ui/react";
import { FaHome, FaBell, FaUserLock, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const buttons = [
  {
    leftIcon: FaHome,
    text: "Home",
    route: "/",
  },
  {
    leftIcon: FaBell,
    text: "News",
    route: "/news",
  },
  {
    rightIcon: FaChartLine,
    text: "Market",
    route: "/market",
  },
  {
    rightIcon: FaUserLock,
    text: "Account",
    route: "/account",
  },
];

export const TopNav = () => {
  const navigate = useNavigate();
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
            onClick={() => navigate(button.route)}
          >
            {button.text}
          </Button>
        );
      })}
    </Flex>
  );
};
