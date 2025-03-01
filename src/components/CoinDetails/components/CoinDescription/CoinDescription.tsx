import { Descriptions, Tag } from 'antd';
import { formatNumber } from '@utils/formatNumber';
import { Coin } from '@/store/coinlore/coinloreTypes';
import classes from './styles/CoinDetails.module.css';

interface CoinDescriptionProps {
  data: Coin;
  isFetching: boolean;
}

const CoinDescription: React.FC<CoinDescriptionProps> = ({
  data,
  isFetching,
}) => {
  return (
    <Descriptions column={1} className={isFetching ? 'blur-loading' : ''}>
      <Descriptions.Item key="price_usd" label={<b>Price</b>}>
        <b>${formatNumber(Number(data.price_usd))}</b>
      </Descriptions.Item>
      <Descriptions.Item key="price_change">
        <Descriptions column={3} className={classes.priceChange}>
          <Descriptions.Item key="percent_change_1h" label="1h">
            <Tag
              color={Number(data.percent_change_1h) >= 0 ? 'success' : 'error'}
            >
              {data.percent_change_1h}%
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item key="percent_change_24h" label="24h">
            <Tag
              color={Number(data.percent_change_24h) >= 0 ? 'success' : 'error'}
            >
              {data.percent_change_24h}%
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item key="percent_change_7d" label="7d">
            <Tag
              color={Number(data.percent_change_7d) >= 0 ? 'success' : 'error'}
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
  );
};

export default CoinDescription;
