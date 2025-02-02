import { Typography, Flex, Spin, Descriptions, Tag, Alert, Button } from 'antd';
import { useAppDispath, useAppSelector } from '../../store';
import { LeftOutlined, StarTwoTone } from '@ant-design/icons';
import {
  coinloreApi,
  useGetTickerQuery,
} from '../../store/coinlore/coinlore.api';
import {
  selectCoinId,
  setCoinIdAction,
} from '../../store/coinlore/coinlore.slice';
import { formatNumber } from '../../utils/formatNumber';
import classes from './styles/CoinDetails.module.css';

const { Title } = Typography;

const CoinDetails = (): React.ReactElement => {
  const coinId = useAppSelector(selectCoinId);
  const dispatch = useAppDispath();
  const { data, error, isLoading, isFetching } = useGetTickerQuery(coinId, {
    pollingInterval: 10 * 60 * 1000,
    skipPollingIfUnfocused: true,
  });

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

      {!isLoading && data && (
        <>
          <Title level={2} className={isFetching ? 'blur' : ''}>
            ({data.symbol}) {data.name}
          </Title>
          <Descriptions column={1} className={isFetching ? 'blur' : ''}>
            <Descriptions.Item key="price_usd" label={<b>Price</b>}>
              <b>${formatNumber(Number(data.price_usd))}</b>
            </Descriptions.Item>
            <Descriptions.Item key="price_change">
              <Descriptions column={3} className={classes.priceChange}>
                <Descriptions.Item key="percent_change_1h" label="1h">
                  <Tag
                    color={
                      Number(data.percent_change_1h) >= 0 ? 'success' : 'error'
                    }
                  >
                    {data.percent_change_1h}%
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item key="percent_change_24h" label="24h">
                  <Tag
                    color={
                      Number(data.percent_change_24h) >= 0 ? 'success' : 'error'
                    }
                  >
                    {data.percent_change_24h}%
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item key="percent_change_7d" label="7d">
                  <Tag
                    color={
                      Number(data.percent_change_7d) >= 0 ? 'success' : 'error'
                    }
                  >
                    {data.percent_change_7d}%
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
            <Descriptions.Item key="market_cap_usd" label="Coin marketcap">
              ${formatNumber(Number(data.market_cap_usd), 2)}
            </Descriptions.Item>
            <Descriptions.Item
              key="volume24"
              label="Trading volume of coin for last 24h"
            >
              ${formatNumber(data.volume24, 2)}
            </Descriptions.Item>
            <Descriptions.Item key="tsupply" label="Total Supply">
              {formatNumber(Number(data.tsupply), 2)}
            </Descriptions.Item>
            <Descriptions.Item key="csupply" label="Circulating Supply">
              {formatNumber(Number(data.csupply), 2)}
            </Descriptions.Item>
          </Descriptions>

          <Flex
            gap="small"
            align="center"
            style={{ marginTop: '1.5rem' }}
            className={isFetching ? 'blur' : ''}
          >
            <Button icon={<StarTwoTone />} variant="outlined" color="primary">
              Add to Watchlist
            </Button>
            <Button
              variant="solid"
              color="primary"
              // onClick={() => dispatch(setCoinIdAction(''))}
            >
              Show top exchanges for {data.symbol}
            </Button>
          </Flex>
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
