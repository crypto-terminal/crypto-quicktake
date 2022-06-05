import React from "react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";

export const TotalBalance = ({ accountInfo }) => {
  const date = useMemo(() => {
    const d = new Date(accountInfo.updateTime);
    return `${d.toDateString()} ${d.toLocaleTimeString()}`;
  }, []);
  return (
    <Stat>
      <StatLabel>Total Balance</StatLabel>
      <StatNumber>£0.00</StatNumber>
      <StatHelpText>{date}</StatHelpText>
    </Stat>
  );
};
