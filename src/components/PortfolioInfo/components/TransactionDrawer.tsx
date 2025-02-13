import { Drawer } from 'antd';
import { useAppDispath, useAppSelector } from '@/store';
import {
  selectIsDrawerOpen,
  setIsDrawerOpenAction,
} from '@/store/portfolio/portfolio.slice';
import TransactionForm from './TransactionForm';

const TransactionDrawer: React.FC = () => {
  const dispatch = useAppDispath();
  const IsDrawerOpen = useAppSelector(selectIsDrawerOpen);

  return (
    <Drawer
      title="New transaction"
      width={400}
      onClose={() => dispatch(setIsDrawerOpenAction(false))}
      open={IsDrawerOpen}
    >
      <TransactionForm />
    </Drawer>
  );
};

export default TransactionDrawer;
