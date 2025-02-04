import { useEffect, useState } from 'react';
import { Typography, Flex, Spin, Alert, Button } from 'antd';
import { useAppDispath, useAppSelector } from '@/store';
import { LeftOutlined, StarTwoTone } from '@ant-design/icons';
import {
  coinloreApi,
  useGetTickerQuery,
  useLazyGetMarketsForCoinQuery,
} from '@store/coinlore/coinlore.api';
import {
  selectCoinId,
  setCoinIdAction,
} from '@store/coinlore/coinlore.slice';
import CoinDescription from './components/CoinDescription/CoinDescription';
import Markets from './components/Markets';

const { Title } = Typography;

const CoinDetails: React.FC = () => {
  const coinId = useAppSelector(selectCoinId);
  const dispatch = useAppDispath();
  const [showMarkets, setShowMarkets] = useState(false);

  const [
    triggerMarketsLoad,
    { data: markets, isFetching: isMarketsFetching, isError: isMarketsError },
  ] = useLazyGetMarketsForCoinQuery();

  const {
    data: coinData,
    error,
    isLoading,
    isFetching,
  } = useGetTickerQuery(coinId, {
    pollingInterval: 10 * 60 * 1000,
    skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    setShowMarkets(false);
  }, [coinId]);

  return (
    <>
      <Button
        icon={<LeftOutlined />}
        style={{ marginBottom: '1rem' }}
        onClick={() => {
          dispatch(setCoinIdAction(''));
          setTimeout(() => {
            dispatch(coinloreApi.util.invalidateTags(['Ticker']));
          });
        }}
      >
        Back to Global statistics
      </Button>
      {isLoading && (
        <Flex justify="center" style={{ paddingTop: '2rem' }}>
          <Spin size="large" />
        </Flex>
      )}

      {!isLoading && coinData && (
        <>
          <Title level={2} className={isFetching ? 'blur-loading' : ''}>
            ({coinData.symbol}) {coinData.name}
          </Title>
          <CoinDescription data={coinData} isFetching={isFetching} />
          <Flex
            gap="small"
            align="center"
            style={{ marginTop: '1.5rem' }}
            className={isFetching ? 'blur-loading' : ''}
          >
            <Button icon={<StarTwoTone />} variant="outlined" color="primary">
              Add to Watchlist
            </Button>
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
      )}

      {error && (
        <Alert
          message="Something went wrong. Please try again later..."
          type="error"
        />
      )}
    </>
  );
};

export default CoinDetails;
