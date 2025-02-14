import { useAppDispatch } from '@/store';
import {
  setIsDrawerOpenAction,
  setShowSuccessTransactionAction,
} from '@/store/portfolio/portfolio.slice';
import { Transaction } from '@/store/portfolio/portfolioDataTypes';
import { Button, Result } from 'antd';

interface TransactionSuccessProps {
  transaction: Transaction;
}

const TransactionSuccess: React.FC<TransactionSuccessProps> = ({
  transaction,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Result
      status="success"
      title="Successfully Added Transaction!"
      subTitle={`${
        transaction.transactionType === 'buy' ? 'Bought:' : 'Sold:'
      } ${transaction.amount} ${transaction.asset.label} at ${
        transaction.price
      }$. Total: ${transaction.total}$. Date & Time: ${
        transaction.dateAndTime
      }.`}
      extra={[
        <Button
          type="primary"
          key="close"
          onClick={() => {
            dispatch(setIsDrawerOpenAction(false));
            setTimeout(() => {
              dispatch(setShowSuccessTransactionAction(false));
            }, 500);
          }}
        >
          Close
        </Button>,
      ]}
    />
  );
};

export default TransactionSuccess;
