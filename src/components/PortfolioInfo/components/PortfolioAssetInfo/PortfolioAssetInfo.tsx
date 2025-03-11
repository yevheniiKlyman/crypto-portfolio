import { useMemo } from 'react';
import Decimal from 'decimal.js';
import { Alert, Button, Divider, Flex, Spin, Tag, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import AddTransactionButton from '@/components/ui/AddTransactionButton';
import AppStatistic from '@/components/ui/AppStatistic';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetTickerQuery } from '@/store/coinlore/coinlore.api';
import {
  selectSelectedAsset,
  setSelectedAssetAction,
} from '@/store/portfolio/portfolio.slice';
import { formatNumber } from '@/utils/formatNumber';
import { useGetPortfolio } from '@/store/hooks/useGetPortfolio';
import AssetTransactions from './components/AssetTransactions/AssetTransactions';

const PortfolioAssetInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { portfolio, portfolioError, portfolioLoading } = useGetPortfolio();
  const assetsIds = portfolio.assets.map((asset) => asset.id).join(',');
  const selectedAsset = useAppSelector(selectSelectedAsset);
  const { data, error, isLoading } = useGetTickerQuery(assetsIds, {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
    skip: !selectedAsset?.value,
  });

  const assetData = useMemo(() => {
    const asset = portfolio.assets.find(
      (asset) => asset.id === selectedAsset?.value
    );
    const ticker = data?.find((item) => item.id === selectedAsset?.value);

    if (!asset || !ticker) return null;

    const currentTotalPrice = new Decimal(ticker.price_usd)
      .mul(asset.totalAmount)
      .toNumber();

    const totalPriceUsdDiff = new Decimal(currentTotalPrice)
      .sub(asset.totalPrice)
      .toNumber();

    return {
      name: `(${ticker.symbol}) ${ticker.name}`,
      currentPrice: formatNumber(Number(ticker.price_usd)),
      averagePrice: formatNumber(asset.averagePrice),
      currentTotalPrice,
      totalPrice: asset.totalPrice,
      totalPriceUsdDiff,
      totalPriceDiffPrecentage: new Decimal(totalPriceUsdDiff)
        .div(portfolio.totalPrice)
        .mul(100)
        .toFixed(2),
      totalAmount: asset.totalAmount,
    };
  }, [portfolio, data, selectedAsset]);

  if (isLoading || portfolioLoading) {
    return (
      <Flex justify="center" style={{ marginTop: '2rem' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (error || portfolioError) {
    return (
      <Alert
        message={
          portfolioError || 'Something went wrong. Please try again later...'
        }
        type="error"
      />
    );
  }

  return (
    <>
      <Flex justify="space-between" style={{ marginBlockEnd: '1rem' }}>
        <Button
          icon={<LeftOutlined />}
          onClick={() => {
            dispatch(setSelectedAssetAction(null));
          }}
        >
          Back to Portfolio
        </Button>
        <AddTransactionButton />
      </Flex>
      {assetData ? (
        <>
          <AppStatistic
            asset={{
              name: assetData.name,
              currentTotalPrice: assetData.currentTotalPrice,
              usdDiff: assetData.totalPriceUsdDiff,
            }}
            titleStyle={{ fontWeight: 500, fontSize: 26, color: '#000000e0' }}
          />
          <Typography.Paragraph style={{ marginBlockStart: '1rem' }}>
            <span
              style={{
                fontWeight: 500,
                fontSize: 16,
                paddingInlineEnd: '1rem',
              }}
            >
              Total profit:
            </span>
            <Tag color={assetData.totalPriceUsdDiff >= 0 ? 'green' : 'red'}>
              {assetData.totalPriceDiffPrecentage}%
            </Tag>
            <Typography.Text
              type={assetData.totalPriceUsdDiff >= 0 ? 'success' : 'danger'}
            >
              {assetData.totalPriceUsdDiff.toFixed(2)}$
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{ fontSize: '16px', marginBlockEnd: '5px' }}
          >
            <span style={{ color: '#00000073', marginInlineEnd: '1rem' }}>
              Coin's average buying price:
            </span>
            {assetData.averagePrice}$
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{ fontSize: '16px', marginBlockEnd: '5px' }}
          >
            <span style={{ color: '#00000073', marginInlineEnd: '1rem' }}>
              Current coin price:
            </span>
            <Typography.Text
              type={assetData.totalPriceUsdDiff >= 0 ? 'success' : 'danger'}
              style={{ fontSize: '16px' }}
            >
              {assetData.currentPrice}$
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ fontSize: '16px' }}>
            <span style={{ color: '#00000073', marginInlineEnd: '1rem' }}>
              Asset amount:
            </span>
            {assetData.totalAmount}
          </Typography.Paragraph>
          <Divider style={{ marginBlockStart: '5px' }} />
          <AssetTransactions />
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default PortfolioAssetInfo;
