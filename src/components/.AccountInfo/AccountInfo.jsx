import React, { useMemo } from "react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import List from "rc-virtual-list";

export const AccountInfo = ({ currentAccount }) => {
  const date = useMemo(() => {
    const d = new Date(currentAccount.accountInfo.updateTime);
    return `${d.toDateString()} ${d.toLocaleTimeString()}`;
  }, []);

  return (
    <React.Fragment>
      <Stat>
        <StatLabel>Total Balance</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelpText>{date}</StatHelpText>
      </Stat>
      <List
        data={currentAccount.accountInfo.balances}
        height={200}
        itemHeight={30}
        itemKey="id"
      >
        {(coinBalace, index) => {
          return (
            <div key={index}>
              {coinBalace.asset} -- {coinBalace.free}
            </div>
          );
        }}
      </List>
    </React.Fragment>
  );
};
