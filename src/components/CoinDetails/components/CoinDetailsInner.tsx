import { useEffect, useState } from 'react';
import { Typography, Flex, Spin, Alert, Button } from 'antd';
import {  useAppSelector } from '@/store';
import {
  useGetTickerQuery,
  useLazyGetMarketsForCoinQuery,
} from '@store/coinlore/coinlore.api';
import { selectCoinId } from '@store/coinlore/coinlore.slice';
import { useGetWatchlist } from '@store/hooks/useGetWatchlist';
import { selectUser } from '@store/auth/auth.slice';
import CoinDescription from './CoinDescription/CoinDescription';
import Markets from './Markets/Markets';
import WatchlistButtons from './WatchlistButtons/WatchlistButtons';
import SignInButton from '@components/ui/SignInButton';

const { Title, Paragraph } = Typography;

const CoinDetailsInner: React.FC = () => {
  const user = useAppSelector(selectUser);
  const coinId = useAppSelector(selectCoinId);
  const [showMarkets, setShowMarkets] = useState(false);
  const { watchlist, watchlistError, watchlistLoading } = useGetWatchlist();

  const [
    triggerMarketsLoad,
    { data: markets, isFetching: isMarketsFetching, isError: isMarketsError },
  ] = useLazyGetMarketsForCoinQuery();

  const {
    data: coinDataArr,
    error,
    isLoading,
    isFetching,
  } = useGetTickerQuery(coinId, {
    pollingInterval: 10 * 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  const coinData = coinDataArr?.[0];

  useEffect(() => {
    setShowMarkets(false);
  }, [coinId]);

  if (isLoading || watchlistLoading) {
    return (
      <Flex justify="center" style={{ paddingTop: '2rem' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (error || watchlistError) {
    return (
      <Alert
        message={
          watchlistError ||
          'Failed to load coin details. Please try again later...'
        }
        type="error"
      />
    );
  }

  if (coinData) {
    return (
      <>
        <Title level={2} className={isFetching ? 'blur-loading' : ''}>
          ({coinData.symbol}) {coinData.name}
        </Title>
        <CoinDescription data={coinData} isFetching={isFetching} />
        <Flex
          gap="14px"
          align="center"
          wrap
          style={{ marginTop: '1.5rem' }}
          className={isFetching ? 'blur-loading' : ''}
        >
          <WatchlistButtons coinId={coinData.id} watchlist={watchlist} />
          {(!showMarkets || isMarketsFetching || isMarketsError) && (
            <Button
              variant="solid"
              color="primary"
              loading={isMarketsFetching}
              onClick={() => {
                setShowMarkets(true);
                triggerMarketsLoad(coinId);
              }}
            >
              Show top markets for {coinData.symbol}
            </Button>
          )}
        </Flex>
        {!user && (
          <Paragraph style={{ marginTop: '1rem' }}>
            Please
            <SignInButton style={{ paddingInline: '5px' }} />
            to add {coinData.symbol} to your watchlist.
          </Paragraph>
        )}
        {markets && showMarkets && !isMarketsFetching && (
          <Markets data={markets} />
        )}
        {isMarketsError && (
          <Alert
            message="Something went wrong. Please try again later..."
            type="error"
            style={{ marginTop: '1.5rem' }}
          />
        )}
      </>
    );
  }
};

export default CoinDetailsInner;
