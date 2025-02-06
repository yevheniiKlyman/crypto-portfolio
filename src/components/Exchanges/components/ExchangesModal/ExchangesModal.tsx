import { Alert, Modal, Typography } from 'antd';
import { useAppDispath, useAppSelector } from '@/store';
import {
  selectExchangeId,
  setExchangeIdAction,
} from '@/store/coinlore/coinlore.slice';
import { useGetExchangeQuery } from '@/store/coinlore/coinlore.api';
import CryptoPairsTable from './components/CryptoPairsTable';

const ExchangesModal: React.FC = () => {
  const exchangeId = useAppSelector(selectExchangeId);
  const { data, error, isLoading } = useGetExchangeQuery(exchangeId);
  const dispatch = useAppDispath();

  return (
    <>
      <Modal
        title={<Typography.Title level={3}>{data?.[0].name}</Typography.Title>}
        loading={isLoading}
        open={!!exchangeId}
        footer={null}
        width={600}
        onCancel={() => dispatch(setExchangeIdAction(''))}
      >
        {data && (
          <>
            <p>
              <strong>URL: </strong>
              <a href={data?.[0].url} target="_blank">
                {data?.[0].url}
              </a>
            </p>
            <Typography.Title
              level={4}
              style={{ marginTop: '1rem', textAlign: 'center' }}
            >
              Top crypto pairs
            </Typography.Title>
            <CryptoPairsTable data={data.pairs} />
          </>
        )}
        {error && (
          <Alert
            message="Something went wrong. Please try again later..."
            type="error"
            style={{ marginBlock: '2rem' }}
          />
        )}
      </Modal>
    </>
  );
};

export default ExchangesModal;
