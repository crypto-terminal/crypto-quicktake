import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";
import { FaUserPlus, FaFileExcel } from "react-icons/fa";

const buttons = [
  {
    leftIcon: FaUserPlus,
    text: "Add",
    route: "/add",
  },
  {
    leftIcon: FaFileExcel,
    text: "Bulk Add",
    route: "/bulk-add",
  },
];

export const AccountFooter = () => {
  const navigate = useNavigate();
  return (
    <Flex
      height="40px"
      width="360px"
      padding="0 10px"
      justify="space-between"
      alignItems="center"
      boxShadow="base"
    >
      {buttons.map((button) => (
        <Button
          key={button.text}
          leftIcon={<button.leftIcon />}
          colorScheme="blue"
          variant="outline"
          size="xs"
          onClick={() => navigate(button.route)}
        >
          {button.text}
        </Button>
      ))}
    </Flex>
  );
};
