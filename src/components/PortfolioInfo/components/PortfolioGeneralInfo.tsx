import { useMemo } from 'react';
import { Alert, Divider, Flex, Spin, Tag, Typography, Image } from 'antd';
import { useAppSelector } from '@/store';
import { selectAssets } from '@/store/portfolio/portfolio.slice';
import AppStatistic from '@/components/ui/AppStatistic';
import { useGetTickerQuery } from '@/store/coinlore/coinlore.api';
import PieChart from './PieChart/PieChart';
import { calculatePortfolioCurrentData } from '../utils/calculatePortfolioCurrentData';
import emptyPortfolioImg from '@/assets/images/empty-portfolio.jpg';
import AddTransactionButton from '@/components/ui/AddTransactionButton';

const PortfolioGeneralInfo: React.FC = () => {
  const assets = useAppSelector(selectAssets);
  const assetsIds = assets.assets.map((asset) => asset.id).join(',');
  const { data, error, isLoading } = useGetTickerQuery(assetsIds, {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
    skip: !assets.totalPrice,
  });

  const portfolioCurrentData = useMemo(() => {
    return calculatePortfolioCurrentData(assets, data);
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

  if (!assets.totalPrice) {
    return (
      <Flex align="center" vertical>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Track the status of your assets. And watch your portfolio flourish!
        </Typography.Title>
        <AddTransactionButton style={{ marginBlock: '1rem' }}>
          Add Asset
        </AddTransactionButton>
        <Image
          preview={false}
          src={emptyPortfolioImg}
          style={{ maxWidth: '700px' }}
        />
      </Flex>
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
          titleStyle={{ fontWeight: 500, fontSize: 26, color: '#000000e0' }}
        />
        <AddTransactionButton />
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
      {portfolioCurrentData.chartData.length ? (
        <>
          <PieChart dataPoints={portfolioCurrentData.chartData} />
          <Divider />
        </>
      ) : null}
    </Flex>
  );
};

export default PortfolioGeneralInfo;
