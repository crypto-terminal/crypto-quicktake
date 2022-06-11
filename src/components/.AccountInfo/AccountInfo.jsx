import React, { useMemo } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Flex,
  Badge,
} from "@chakra-ui/react";
import VirtualList from "rc-virtual-list";

// !TODO: refactor this to accommodate multiple accounts
// and we need to define currentAccount schema
export const AccountInfo = ({ currentAccount }) => {
  const { accountInfo } = currentAccount;

  const date = useMemo(() => {
    const d = new Date(accountInfo.updateTime);
    return `${d.toDateString()} ${d.toLocaleTimeString()}`;
  }, []);

  return (
    <React.Fragment>
      <Stat height="81px" flex="unset" marginBottom={"12px"}>
        <StatLabel>
          <Flex height="24px" align="center">
            <Badge variant="outline" colorScheme="green">
              Binance US
            </Badge>
            Total Balance
          </Flex>
        </StatLabel>
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
        <Flex justify="flex-end" width="100px" fontSize="14px" fontWeight={600}>
          Balance
        </Flex>
        <Flex justify="flex-end" width="100px" fontSize="14px" fontWeight={600}>
          USD
        </Flex>
        <Flex justify="flex-end" width="90px" fontSize="14px" fontWeight={600}>
          Locked
        </Flex>
      </HStack>
      <VirtualList
        data={accountInfo.balances}
        height={367}
        itemHeight={30}
        itemKey="id"
      >
        {(coinBalance, index) => {
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
                {coinBalance.asset}
              </Flex>
              <Flex width="100px" justify="flex-end">
                {coinBalance.free}
              </Flex>
              <Flex width="100px" justify="flex-end">
                {coinBalance.value}
              </Flex>
              <Flex width="90px" justify="flex-end">
                {coinBalance.locked}
              </Flex>
            </HStack>
          );
        }}
      </VirtualList>
    </React.Fragment>
  );
};
