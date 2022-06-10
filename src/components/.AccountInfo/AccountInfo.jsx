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
import Decimal from "decimal.js";

// !TODO: refactor this to accommodate multiple accounts
// and we need to define currentAccount schema
export const AccountInfo = ({ currentAccount }) => {
  const { accountInfo, coinPrices } = currentAccount;

  const date = useMemo(() => {
    const d = new Date(accountInfo.updateTime);
    return `${d.toDateString()} ${d.toLocaleTimeString()}`;
  }, []);

  const virtualListData = useMemo(() => {
    const nonZeroBalances = accountInfo.balances.filter(
      (balance) => parseInt(balance.free) > 0
    );

    const balances = nonZeroBalances.map((balance) => {
      let price = coinPrices.find(
        (p) => p.symbol === `${balance.asset}USD`
      ).price;
      price = price || "0";
      return {
        ...balance,
        price,
      };
    });
    return balances;
  }, [currentAccount]);

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
        <Flex justify="flex-end" width="145px" fontSize="14px" fontWeight={600}>
          Balance
        </Flex>
        <Flex justify="flex-end" width="145px" fontSize="14px" fontWeight={600}>
          USD
        </Flex>
      </HStack>
      <VirtualList
        data={virtualListData}
        height={367}
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
                {new Decimal(coinBalace.price)
                  .times(coinBalace.free)
                  .toFixed(2)}
              </Flex>
            </HStack>
          );
        }}
      </VirtualList>
    </React.Fragment>
  );
};
