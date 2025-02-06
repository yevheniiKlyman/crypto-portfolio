import { useState } from 'react';
import { Alert, Collapse, CollapseProps, Flex, Spin, Typography } from 'antd';
import {
  useGetTickerQuery,
  useGetTickersQuery,
} from '@store/coinlore/coinlore.api';
import TickersTable from './components/TickersTable';
import classes from './styles/Tickers.module.css';
import { useAppSelector } from '@/store';
import { selectWatchlist } from '@/store/coinlore/coinlore.slice';

const Tickers: React.FC = () => {
  const [tickerstStart, setTickerstStart] = useState(0);
  const { data, error, isLoading } = useGetTickersQuery(tickerstStart, {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  const watchlist = useAppSelector(selectWatchlist);
  const {
    data: watchlistData,
    error: watchlistError,
    isLoading: watchlistLoading,
  } = useGetTickerQuery(watchlist.join(','), {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
    skip: !watchlist.length,
  });

  const onPaginationPageChange = (page: number) => {
    setTickerstStart((page - 1) * 50);
  };

  const getAllCryptoContent = (): React.ReactNode => {
    if (data) {
      return (
        <TickersTable
          data={data.data}
          pagination={{
            defaultCurrent: 1,
            pageSize: 50,
            total: data.info.coins_num,
            showSizeChanger: false,
            onChange: onPaginationPageChange,
          }}
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

  const getWatchlistContent = (): React.ReactNode => {
    if (watchlistData && watchlist.length) {
      return <TickersTable data={watchlistData} pagination={false} />;
    } else if (watchlistError) {
      return (
        <Alert
          message="Something went wrong. Please try again later..."
          type="error"
        />
      );
    } else if (watchlistLoading) {
      return (
        <Flex justify="center">
          <Spin size="large" />
        </Flex>
      );
    }

    return (
      <Typography.Text>
        Your watchlist is currently empty. Add some coins to keep track of your
        favorites!
      </Typography.Text>
    );
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Watchlist',
      children: getWatchlistContent(),
    },
    {
      key: '2',
      label: 'All Crypto',
      children: getAllCryptoContent(),
    },
  ];

  return (
    <Collapse
      items={items}
      defaultActiveKey={['1', '2']}
      className={classes.Tickers}
    />
  );
};

export default Tickers;
