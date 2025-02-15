import { useMemo } from 'react';
import Decimal from 'decimal.js';
import { Alert, Button, Divider, Flex, Spin, Tag, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectAssets,
  setIsDrawerOpenAction,
} from '@/store/portfolio/portfolio.slice';
import AppStatistic from '@/components/ui/AppStatistic';
import { PlusOutlined } from '@ant-design/icons';
import { useGetTickerQuery } from '@/store/coinlore/coinlore.api';
import PieChart from './PieChart/PieChart';

const PortfolioGeneralInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const assets = useAppSelector(selectAssets);
  const assetsIds = assets.assets.map((asset) => asset.id).join(',');
  const { data, error, isLoading } = useGetTickerQuery(assetsIds, {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
    skip: !assets.totalPrice,
  });

  const portfolioCurrentData = useMemo(() => {
    const currentAssetsTotalPrices = [];

    for (const asset of assets.assets.filter(
      (asset) => asset.totalAmount > 0
    )) {
      const ticker = data?.find((item) => item.id === asset.id);

      if (!ticker) continue;

      currentAssetsTotalPrices.push({
        label: `(${ticker.symbol}) ${ticker.name}`,
        price: new Decimal(ticker.price_usd).mul(asset.totalAmount).toNumber(),
      });
    }

    const portfolioCurrentTotalPrice = currentAssetsTotalPrices.reduce(
      (acc, asset) => {
        return new Decimal(acc).add(asset.price).toNumber();
      },
      0
    );

    const priceDiffUsd = new Decimal(portfolioCurrentTotalPrice)
      .sub(assets.totalPrice)
      .toNumber();

    return {
      totalPrice: portfolioCurrentTotalPrice,
      priceDiffUsd,
      priceDiffPrecentage: new Decimal(priceDiffUsd)
        .div(assets.totalPrice)
        .mul(100)
        .toFixed(2),
      chartData: currentAssetsTotalPrices.map((item) => ({
        label: item.label,
        exploded: true,
        y: Number(
          new Decimal(item.price)
            .div(portfolioCurrentTotalPrice)
            .mul(100)
            .toFixed(2)
        ),
      })),
    };
  }, [data, assets]);

  if (isLoading) {
    return (
      <Flex justify="center" style={{ marginTop: '2rem' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert
        message="Something went wrong. Please try again later..."
        type="error"
      />
    );
  }

  return (
    <Flex vertical>
      <Flex justify="space-between">
        <AppStatistic
          asset={{
            name: 'Portfolio',
            currentTotalPrice: portfolioCurrentData.totalPrice,
            usdDiff: portfolioCurrentData.priceDiffUsd,
          }}
          titleStyle={{ fontWeight: 500, fontSize: 24, color: '#000000e0' }}
        />
        <Button
          type="primary"
          onClick={() => dispatch(setIsDrawerOpenAction(true))}
          icon={<PlusOutlined />}
        >
          Add transaction
        </Button>
      </Flex>
      <Typography.Paragraph style={{ marginBlockStart: '1rem' }}>
        <span
          style={{ fontWeight: 500, fontSize: 16, paddingInlineEnd: '1rem' }}
        >
          Total profit:
        </span>
        <Tag color={portfolioCurrentData.priceDiffUsd >= 0 ? 'green' : 'red'}>
          {portfolioCurrentData.priceDiffPrecentage}%
        </Tag>
        <Typography.Text
          type={portfolioCurrentData.priceDiffUsd >= 0 ? 'success' : 'danger'}
        >
          {portfolioCurrentData.priceDiffUsd.toFixed(2)}$
        </Typography.Text>
      </Typography.Paragraph>
      <Divider style={{ marginBlockStart: '5px' }} />
      <PieChart dataPoints={portfolioCurrentData.chartData} />
      <Divider />
    </Flex>
  );
};

export default PortfolioGeneralInfo;
