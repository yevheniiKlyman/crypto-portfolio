import { Alert, Flex, Spin, Tooltip, Typography } from 'antd';
import { useGetAllExchangesQuery } from '@store/coinlore/coinlore.api';
import ExchangesTable from './components/ExchangesTable/ExchangesTable';
import { InfoCircleTwoTone } from '@ant-design/icons';
import ExchangesModal from './components/ExchangesModal/ExchangesModal';
import { useAppSelector } from '@/store';
import { selectExchangeId } from '@/store/coinlore/coinlore.slice';

const Exchanges: React.FC = () => {
  const { data, error, isLoading } = useGetAllExchangesQuery();
  const exchangeId = useAppSelector(selectExchangeId);

  return (
    <>
      {data && (
        <>
          <Typography.Title
            level={2}
            style={{ marginBlock: '1rem', textAlign: 'center' }}
          >
            All Exchanges&#160;
            <Tooltip title="According to coinlore.com">
              <InfoCircleTwoTone />
            </Tooltip>
          </Typography.Title>
          <ExchangesTable data={data} />
          {exchangeId && <ExchangesModal />}
        </>
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
          style={{ marginTop: '2rem' }}
        />
      )}
    </>
  );
};

export default Exchanges;
