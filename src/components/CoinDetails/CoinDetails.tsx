import { Button } from 'antd';
import { useAppDispatch } from '@/store';
import { LeftOutlined } from '@ant-design/icons';
import { coinloreApi } from '@store/coinlore/coinlore.api';
import { setCoinIdAction } from '@store/coinlore/coinlore.slice';
import CoinDetailsInner from './components/CoinDetailsInner';

const CoinDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        icon={<LeftOutlined />}
        style={{ marginBottom: '1rem' }}
        className='sider-btn-margin'
        onClick={() => {
          dispatch(setCoinIdAction(''));
          setTimeout(() => {
            dispatch(coinloreApi.util.invalidateTags(['Ticker']));
          });
        }}
      >
        Back to Global statistics
      </Button>
      <CoinDetailsInner />
    </>
  );
};

export default CoinDetails;
