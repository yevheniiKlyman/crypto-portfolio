import { useMemo } from 'react';
import {
  Alert,
  Card,
  Empty,
  Flex,
  List,
  Spin,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/store';
import { selectAssets } from '@/store/portfolio/portfolio.slice';
import AppSider from '../layout/AppSider';
import { useGetTickerQuery } from '@/store/coinlore/coinlore.api';
import Decimal from 'decimal.js';

export const PortfolioSider: React.FC = () => {
  const assets = useAppSelector(selectAssets);
  const assetsIds = assets.map((asset) => asset.id).join(',');
  const { data, error, isLoading } = useGetTickerQuery(assetsIds, {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
    skip: !assets.length,
  });

  const assetsCardData = useMemo(() => {
    const result = [];

    for (const asset of assets.filter((asset) => asset.totalAmount > 0)) {
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

    return result;
  }, [data, assets]);

  return (
    <AppSider>
      {!isLoading && !error && !assetsCardData?.length && (
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
            Time to add your first asset!
          </Typography.Paragraph>
        </Card>
      )}
      {!isLoading && !error && assetsCardData?.length && (
        <List
          itemLayout="vertical"
          dataSource={assetsCardData}
          size="small"
          renderItem={(asset) => (
            <List.Item key={asset.key} style={{ borderBlockEnd: 'none', paddingInlineEnd: '3px' }}>
              <Card variant="borderless">
                <Statistic
                  title={
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>
                      {asset.name}
                    </span>
                  }
                  value={asset.currentTotalPrice}
                  precision={2}
                  valueStyle={{
                    color: asset.usdDiff >= 0 ? '#3f8600' : '#cf1322',
                  }}
                  prefix={
                    asset.usdDiff >= 0 ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
                  suffix="$"
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
      )}
      {isLoading && (
        <Flex justify="center" style={{ marginTop: '2rem' }}>
          <Spin size="large" />
        </Flex>
      )}
      {error && (
        <Alert
          message="Something went wrong. Please try again later..."
          type="error"
        />
      )}
    </AppSider>
  );
};

export default PortfolioSider;
