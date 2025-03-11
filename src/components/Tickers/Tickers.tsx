import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Collapse,
  CollapseProps,
  Flex,
  Spin,
  Typography,
} from 'antd';
import {
  useGetTickerQuery,
  useGetTickersQuery,
} from '@store/coinlore/coinlore.api';
import TickersTable from './components/TickersTable';
import { useGetWatchlist } from '@/store/hooks/useGetWatchlist';
import classes from './styles/Tickers.module.css';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth/auth.slice';
import SignInButton from '../ui/SignInButton';

const Tickers: React.FC = () => {
  const user = useAppSelector(selectUser);
  const [tickerstStart, setTickerstStart] = useState(0);
  const { data, error, isLoading } = useGetTickersQuery(
    { start: tickerstStart, limit: 50 },
    {
      pollingInterval: 3 * 60 * 1000,
      skipPollingIfUnfocused: true,
    }
  );

  const { watchlist, watchlistError, watchlistLoading } = useGetWatchlist();
  const {
    data: watchlistTickers,
    error: watchlistTickersError,
    isLoading: watchlistTickersLoading,
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

  const watchlistDataSorted = useMemo(() => {
    return watchlistTickers
      ? [...watchlistTickers].sort((a, b) => a.rank - b.rank)
      : [];
  }, [watchlistTickers]);

  const getWatchlistContent = useCallback(() => {
    if (watchlistDataSorted.length && watchlist.length) {
      return <TickersTable data={watchlistDataSorted} pagination={false} />;
    } else if (watchlistTickersError || watchlistError) {
      return (
        <Alert
          message={
            watchlistError || 'Something went wrong. Please try again later...'
          }
          type="error"
        />
      );
    } else if (watchlistTickersLoading || watchlistLoading) {
      return (
        <Flex justify="center">
          <Spin size="large" />
        </Flex>
      );
    }

    return (
      <Typography.Paragraph style={{ marginBlockEnd: '0.5rem' }}>
        <span style={{ paddingInlineEnd: '5px' }}>
          Your watchlist is currently empty.
        </span>
        {user ? (
          'Add some coins to keep track of your favorites!'
        ) : (
          <>
            Please
            <SignInButton style={{ paddingInline: '5px' }} />
            to add coins to your watchlist.
          </>
        )}
      </Typography.Paragraph>
    );
  }, [
    watchlistDataSorted,
    watchlist.length,
    watchlistTickersError,
    watchlistError,
    watchlistTickersLoading,
    watchlistLoading,
    user,
  ]);

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
