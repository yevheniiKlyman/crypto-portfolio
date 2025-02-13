import { useAppDispath } from '@/store';
import { setIsDrawerOpenAction } from '@/store/portfolio/portfolio.slice';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TransactionDrawer from './components/TransactionDrawer';

const PortfolioInfo: React.FC = () => {
  const dispatch = useAppDispath();

  return (
    <>
      <Button
        type="primary"
        onClick={() => dispatch(setIsDrawerOpenAction(true))}
        icon={<PlusOutlined />}
      >
        Add transaction
      </Button>
      <TransactionDrawer />
    </>
  );
};

export default PortfolioInfo;
