import React, { useMemo } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Flex,
} from "@chakra-ui/react";
import VirtualList from "rc-virtual-list";

export const AccountInfo = ({ currentAccount }) => {
  const date = useMemo(() => {
    const d = new Date(currentAccount.accountInfo.updateTime);
    return `${d.toDateString()} ${d.toLocaleTimeString()}`;
  }, []);

  const virtualListData = useMemo(() => {
    return currentAccount.accountInfo.balances.filter(
      (balance) => parseInt(balance.free) > 0
    );
  }, [currentAccount]);

  return (
    <React.Fragment>
      <Stat height="78px" flex="unset" marginBottom={"12px"}>
        <StatLabel>Total Balance</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelpText>{date}</StatHelpText>
      </Stat>
      <HStack
        height="40px"
        width="360px"
        paddingLeft="10px"
        paddingRight="10px"
        shadow={"base"}
      >
        <Flex justify="center" width="50px" fontSize="14px" fontWeight={600}>
          Coin
        </Flex>
        <Flex justify="flex-end" width="145px" fontSize="14px" fontWeight={600}>
          Balance
        </Flex>
        <Flex justify="flex-end" width="145px" fontSize="14px" fontWeight={600}>
          USD
        </Flex>
      </HStack>
      <VirtualList
        data={virtualListData}
        height={370}
        itemHeight={30}
        itemKey="id"
      >
        {(coinBalace, index) => {
          return (
            <HStack
              height="40px"
              width="360px"
              paddingLeft="10px"
              paddingRight="10px"
              key={index}
            >
              <Flex
                justify="center"
                width="50px"
                fontSize="14px"
                fontWeight={600}
              >
                {coinBalace.asset}
              </Flex>
              <Flex width="145px" justify="flex-end">
                {coinBalace.free}
              </Flex>
              <Flex width="145px" justify="flex-end">
                0
              </Flex>
            </HStack>
          );
        }}
      </VirtualList>
    </React.Fragment>
  );
};
