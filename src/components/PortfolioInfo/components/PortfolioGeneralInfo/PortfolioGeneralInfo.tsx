import { useMemo } from 'react';
import { Alert, Divider, Flex, Spin, Tag, Typography, Image, Grid } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import AppStatistic from '@/components/ui/AppStatistic';
import { useGetTickerQuery } from '@/store/coinlore/coinlore.api';
import PieChart from '../PieChart/PieChart';
import { calculatePortfolioCurrentData } from '../../utils/calculatePortfolioCurrentData';
import AddTransactionButton from '@/components/ui/AddTransactionButton';
import { useGetPortfolio } from '@/store/hooks/useGetPortfolio';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth/auth.slice';
import SignInButton from '@/components/ui/SignInButton';
import emptyPortfolioImg from '@/assets/images/empty-portfolio.jpg';
import classes from './styles/PortfolioGeneralInfo.module.css';

const PortfolioGeneralInfo: React.FC = () => {
  const user = useAppSelector(selectUser);
  const screens = Grid.useBreakpoint();
  const { portfolio, portfolioError, portfolioLoading } = useGetPortfolio();
  const assetsIds = portfolio.assets.map((asset) => asset.id).join(',');
  const { data, error, isLoading } = useGetTickerQuery(assetsIds, {
    pollingInterval: 3 * 60 * 1000,
    skipPollingIfUnfocused: true,
    skip: !portfolio.totalPrice,
  });

  const portfolioCurrentData = useMemo(() => {
    return calculatePortfolioCurrentData(portfolio, data);
  }, [data, portfolio]);

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

  if (!portfolio.totalPrice) {
    return (
      <Flex align="center" vertical>
        <Typography.Title
          level={3}
          className="sider-btn-margin"
          style={{ textAlign: 'center' }}
        >
          Track the status of your assets. And watch your portfolio flourish!
        </Typography.Title>
        {!user && (
          <Alert
            message={
              <>
                <ExclamationCircleTwoTone style={{ marginInlineEnd: '8px' }} />
                You need to
                <SignInButton
                  style={{ paddingInline: '5px', fontSize: '18px' }}
                />
                first.
              </>
            }
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: '18px',
              marginBlock: '1rem',
            }}
            type="info"
          />
        )}
        <AddTransactionButton style={{ marginBlock: '1rem' }} disabled={!user}>
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
      <Flex justify="space-between" className={classes.statistic}>
        <AppStatistic
          titleClassName="sider-btn-margin"
          asset={{
            name: 'Portfolio',
            currentTotalPrice: portfolioCurrentData.totalPrice,
            usdDiff: portfolioCurrentData.priceDiffUsd,
          }}
          titleStyle={{ fontWeight: 500, fontSize: 26, color: '#000000e0' }}
        />
        {!screens.xs && <AddTransactionButton />}
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
      {screens.xs && (
        <AddTransactionButton
          style={{ alignSelf: 'flex-start', marginBlock: '5px' }}
        />
      )}
      <Divider style={{ marginBlockStart: '5px' }} />
      {portfolioCurrentData.chartData.length ? (
        <>
          <Typography.Title level={2} style={{ marginBlockStart: '1rem', textAlign: 'center' }}>
            Crypto asset allocation chart
          </Typography.Title>
          <PieChart dataPoints={portfolioCurrentData.chartData} />
          <Divider />
        </>
      ) : null}
    </Flex>
  );
};

export default PortfolioGeneralInfo;
