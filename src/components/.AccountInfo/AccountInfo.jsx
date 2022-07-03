import React, { useMemo } from "react";
import { Stat, StatLabel, StatNumber, StatHelpText, HStack, Flex, Badge } from "@chakra-ui/react";
import VirtualList from "rc-virtual-list";

// !TODO: refactor this to accommodate multiple accounts
// and we need to define currentAccount schema
export const AccountInfo = ({ currentAccount }) => {
  const { accountInfo, totalBalance, currentApiPair } = currentAccount;
  const date = useMemo(() => {
    const d = new Date();
    return `${d.toDateString()} ${d.toLocaleTimeString()}`;
  }, []);
  return (
    <React.Fragment>
      <Stat height="81px" flex="unset" marginBottom={"12px"} padding="10px 10px 0px 10px">
        <StatLabel>
          <Flex height="24px" align="center" justify={"space-between"}>
            Total Balance
            <Badge variant="outline" colorScheme="green">
              {currentApiPair.ex.text}
            </Badge>
          </Flex>
        </StatLabel>
        <StatNumber>${totalBalance}</StatNumber>
        <StatHelpText>{date}</StatHelpText>
      </Stat>
      <HStack height="40px" width="360px" paddingLeft="10px" paddingRight="10px" shadow={"base"}>
        <Flex justify="flex-start" width="50px" fontSize="14px" fontWeight={600}>
          Coin
        </Flex>
        <Flex justify="flex-end" width="145px" fontSize="14px" fontWeight={600}>
          Balance
        </Flex>
        <Flex justify="flex-end" width="145px" fontSize="14px" fontWeight={600}>
          USD
        </Flex>
      </HStack>
      <VirtualList data={accountInfo.balances} height={387} itemHeight={30} itemKey="id">
        {(coinBalance, index) => {
          return (
            <HStack height="40px" width="360px" paddingLeft="10px" paddingRight="10px" key={index}>
              <Flex justify="flex-start" width="50px" fontSize="14px" fontWeight={600}>
                {coinBalance.coinSymbol}
              </Flex>
              <Flex width="145px" justify="flex-end">
                {coinBalance.coinAmount}
              </Flex>
              <Flex width="145px" justify="flex-end">
                {coinBalance.fiatValue}
              </Flex>
            </HStack>
          );
        }}
      </VirtualList>
    </React.Fragment>
  );
};
