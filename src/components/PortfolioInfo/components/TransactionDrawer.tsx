import { Drawer } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectIsDrawerOpen,
  setIsDrawerOpenAction,
  setShowSuccessTransactionAction,
} from '@/store/portfolio/portfolio.slice';
import TransactionForm from './TransactionForm';

const TransactionDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const IsDrawerOpen = useAppSelector(selectIsDrawerOpen);

  return (
    <Drawer
      title="New transaction"
      width={400}
      onClose={() => {
        dispatch(setIsDrawerOpenAction(false));
        setTimeout(() => {
          dispatch(setShowSuccessTransactionAction(false));
        }, 500);
      }}
      open={IsDrawerOpen}
    >
      <TransactionForm />
    </Drawer>
  );
};

export default TransactionDrawer;
