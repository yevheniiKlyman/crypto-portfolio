import { useMemo } from 'react';
import { Table, TableProps, Tooltip, Typography } from 'antd';
import { useAppSelector } from '@/store';
import { selectSelectedAsset } from '@/store/portfolio/portfolio.slice';
import { useGetPortfolio } from '@/store/hooks/useGetPortfolio';
import { Transaction } from '@/store/db/dbTypes';
import classes from './styles/AssetTransactions.module.css';

const columns: TableProps<Transaction>['columns'] = [
  {
    title: 'Buy/Sell',
    dataIndex: 'transactionType',
    key: 'transactionType',
    render: (_, { transactionType }) => (
      <Typography.Text type={transactionType === 'Buy' ? 'success' : 'danger'}>
        {transactionType}
      </Typography.Text>
    ),
    sorter: (a, b) => a.transactionType.localeCompare(b.transactionType),
  },
  {
    title: 'Price ($)',
    dataIndex: 'priceFormatted',
    key: 'priceFormatted',
    sorter: (a, b) => a.price - b.price,
    onHeaderCell: () => ({
      style: {
        whiteSpace: 'nowrap',
      },
    }),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Total ($)',
    dataIndex: 'totalFormatted',
    key: 'totalFormatted',
    sorter: (a, b) => a.total - b.total,
    onHeaderCell: () => ({
      style: {
        whiteSpace: 'nowrap',
      },
    }),
  },
  {
    title: 'Date&Time',
    dataIndex: 'dateAndTime',
    key: 'dateAndTime',
    sorter: (a, b) => a.dateAndTime.localeCompare(b.dateAndTime),
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
    onCell: () => ({
      style: {
        maxWidth: '120px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    }),
    render: (_, { comment }) => <Tooltip title={comment}>{comment}</Tooltip>,
  },
];

const AssetTransactions: React.FC = () => {
  const { portfolio } = useGetPortfolio();
  const selectedAsset = useAppSelector(selectSelectedAsset);
  const assetTransactions = useMemo(() => {
    return portfolio.assets.filter(
      (asset) => asset.id === selectedAsset?.value
    )[0].transactions;
  }, [portfolio.assets, selectedAsset]);

  if (!assetTransactions.length || !selectedAsset) {
    return null;
  }

  return (
    <>
      <Typography.Title
        level={3}
        style={{ marginTop: '1rem', textAlign: 'center' }}
      >
        {selectedAsset.label || 'Asset'} Transaction History
      </Typography.Title>
      <Table<Transaction>
        columns={columns}
        dataSource={assetTransactions}
        size="small"
        pagination={false}
        bordered
        style={{ marginTop: '1rem' }}
        className={classes.table}
      />
    </>
  );
};

export default AssetTransactions;
