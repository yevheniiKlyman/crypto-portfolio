import React from 'react';
import { Table, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import { Coin } from '../../../store/coinlore/coinloreDataTypes';
import { useAppDispath } from '../../../store';
import { setCoinIdAction } from '../../../store/coinlore/coinlore.slice';

interface TickersTableProps {
  data: Coin[];
  coinsNum: number;
  onPaginationPageChange: (page: number) => void;
}

const columns: TableProps<Coin>['columns'] = [
  {
    title: 'Coin',
    dataIndex: 'symbol',
    key: 'symbol',
    render: (text) => <Typography.Text strong>{text}</Typography.Text>,
  },
  {
    title: 'Price($)',
    dataIndex: 'price_usd',
    key: 'price_usd',
  },
  {
    title: '1h',
    dataIndex: 'percent_change_1h',
    key: 'percent_change_1h',
    render: (percent_change_1h) => (
      <Tag color={percent_change_1h >= 0 ? 'success' : 'error'}>
        {`${percent_change_1h}%`}
      </Tag>
    ),
  },
  {
    title: '24h',
    dataIndex: 'percent_change_24h',
    key: 'percent_change_24h',
    render: (percent_change_24h) => (
      <Tag color={percent_change_24h >= 0 ? 'success' : 'error'}>
        {`${percent_change_24h}%`}
      </Tag>
    ),
  },
];

const TickersTable: React.FC<TickersTableProps> = ({ data, coinsNum, onPaginationPageChange }) => {
  const dispatch = useAppDispath();

  return (
    <Table<Coin>
    columns={columns}
    dataSource={data}
    size="small"
    pagination={{
      defaultCurrent: 1,
      pageSize: 50,
      total: coinsNum,
      showSizeChanger: false,
      onChange: onPaginationPageChange,
    }}
    onRow={(record) => ({
      onClick: () => {
        dispatch(setCoinIdAction(record.id));
      },
    })}
  />
  );
};

export default TickersTable;
