import { useMemo } from 'react';
import { Alert, Card, Empty, Flex, List, Spin, Tag, Typography } from 'antd';
import Decimal from 'decimal.js';
import { useAppDispatch, useAppSelector } from '@/store';
import { setSelectedAssetAction } from '@/store/portfolio/portfolio.slice';
import { coinloreApi, useGetTickerQuery } from '@/store/coinlore/coinlore.api';
import { useGetPortfolio } from '@/store/hooks/useGetPortfolio';
import { selectUser } from '@/store/auth/auth.slice';
import AppSider from '../layout/AppSider';
import AppStatistic from '../ui/AppStatistic';
import AddTransactionButton from '../ui/AddTransactionButton';

export const PortfolioSider: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { portfolio, portfolioError, portfolioLoading } = useGetPortfolio();
  const assetsIds = portfolio.assets.map((asset) => asset.id).join(',');

  const { data, error, isLoading } = useGetTickerQuery(assetsIds, {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
    skip: !portfolio.totalPrice,
  });

  const assetsCardData = useMemo(() => {
    const result = [];

    for (const asset of portfolio.assets.filter(
      (asset) => asset.totalAmount > 0
    )) {
      const ticker = data?.find((item) => item.id === asset.id);

      if (!ticker) continue;

      const currentTotalPrice = new Decimal(ticker.price_usd)
        .mul(asset.totalAmount)
        .toNumber();
      const usdDiff = new Decimal(currentTotalPrice)
        .sub(asset.totalPrice)
        .toNumber();

      result.push({
        name: `(${ticker.symbol}) ${ticker.name}`,
        totalAmount: asset.totalAmount,
        currentTotalPrice,
        usdDiff,
        precentageDiff: new Decimal(usdDiff)
          .div(asset.totalPrice)
          .mul(100)
          .toFixed(2),
        key: asset.key,
      });
    }

    return result.sort((a, b) => b.currentTotalPrice - a.currentTotalPrice);
  }, [data, portfolio]);

  const onAssetClick = (asset: { key: string; name: string }) => {
    dispatch(
      setSelectedAssetAction({
        value: asset.key,
        label: asset.name,
      })
    );
    dispatch(coinloreApi.util.invalidateTags(['Ticker']));
  };

  if (isLoading || portfolioLoading) {
    return (
      <AppSider>
        <Flex justify="center" style={{ marginTop: '2rem' }}>
          <Spin size="large" />
        </Flex>
      </AppSider>
    );
  }

  if (error || portfolioError) {
    return (
      <AppSider>
        <Alert
          message={
            portfolioError || 'Something went wrong. Please try again later...'
          }
          type="error"
        />
      </AppSider>
    );
  }

  if (!assetsCardData?.length) {
    return (
      <AppSider>
        <Card variant="borderless" style={{ marginTop: '0.5rem' }}>
          <Empty />
          <Typography.Title
            level={4}
            style={{ marginTop: '1rem', textAlign: 'center' }}
          >
            Your portfolio is currently empty!
          </Typography.Title>
          <Typography.Paragraph
            style={{ textAlign: 'center', fontSize: '16px' }}
          >
            Time to
            <AddTransactionButton
              color="primary"
              type="link"
              icon={false}
              disabled={!user}
              style={{ fontSize: '16px', paddingInlineStart: '5px' }}
            >
              add your first asset!
            </AddTransactionButton>
          </Typography.Paragraph>
        </Card>
      </AppSider>
    );
  }

  return (
    assetsCardData?.length && (
      <AppSider>
        <List
          itemLayout="vertical"
          dataSource={assetsCardData}
          size="small"
          renderItem={(asset) => (
            <List.Item
              key={asset.key}
              style={{
                borderBlockEnd: 'none',
                paddingInlineEnd: '3px',
                cursor: 'pointer',
              }}
              onClick={() => onAssetClick(asset)}
            >
              <Card variant="borderless">
                <AppStatistic
                  asset={asset}
                  titleStyle={{ fontSize: '16px', fontWeight: '500' }}
                />
                <List
                  size="small"
                  style={{
                    borderBlockStart: '1px solid rgba(5, 5, 5, 0.06)',
                    marginBlockStart: '0.5rem',
                    paddingBlockStart: '0.5rem',
                  }}
                  dataSource={[
                    {
                      title: 'Total Profit',
                      value: asset.usdDiff,
                      tagValue: asset.precentageDiff,
                    },
                    {
                      title: 'Asset Amount',
                      value: asset.totalAmount,
                      isPlain: true,
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item style={{ borderBlockEnd: 'none' }}>
                      <span>{item.title}</span>
                      <span>
                        {item.tagValue && (
                          <Tag color={asset.usdDiff >= 0 ? 'green' : 'red'}>
                            {item.tagValue}%
                          </Tag>
                        )}
                        {item.isPlain && item.value}
                        {!item.isPlain && (
                          <Typography.Text
                            type={asset.usdDiff >= 0 ? 'success' : 'danger'}
                          >
                            {item.value.toFixed(2)}$
                          </Typography.Text>
                        )}
                      </span>
                    </List.Item>
                  )}
                />
              </Card>
            </List.Item>
          )}
        />
      </AppSider>
    )
  );
};

export default PortfolioSider;
