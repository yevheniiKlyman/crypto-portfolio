import { useState } from 'react';
import { Alert, Collapse, CollapseProps, Flex, Spin } from 'antd';
import { useGetTickersQuery } from '@store/coinlore/coinlore.api';
import TickersTable from './components/TickersTable';
import classes from './styles/Tickers.module.css';

const Tickers: React.FC = () => {
  const [tickerstStart, setTickerstStart] = useState(0);
  const { data, error, isLoading } = useGetTickersQuery(tickerstStart, {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  const onPaginationPageChange = (page: number) => {
    setTickerstStart((page - 1) * 50);
  };

  const getAllCryptoChildren = (): React.ReactNode => {
    if (data) {
      return (
        <TickersTable
          data={data.data}
          coinsNum={data.info.coins_num}
          onPaginationPageChange={onPaginationPageChange}
        />
      );
    } else if (error) {
      return (
        <Alert
          message="Something went wrong. Please try again later..."
          type="error"
        />
      );
    } else if (isLoading) {
      return (
        <Flex justify="center">
          <Spin size="large" />
        </Flex>
      );
    }

    return null;
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Watchlist',
      children: <p>{'text1'}</p>,
    },
    {
      key: '2',
      label: 'All Crypto',
      children: getAllCryptoChildren(),
    },
  ];

  return (
    <Collapse items={items} defaultActiveKey={2} className={classes.Tickers} />
  );
};

export default Tickers;
