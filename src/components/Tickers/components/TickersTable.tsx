import React from 'react';
import { Grid, Table, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import { Coin } from '@/store/coinlore/coinloreTypes';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectCoinId, setCoinIdAction } from '@store/coinlore/coinlore.slice';
import { coinloreApi } from '@store/coinlore/coinlore.api';
import { setIsSiderCollapsedAction } from '@/store/layout/layout.slice';

interface TickersTableProps {
  data: Coin[];
  pagination?: TableProps<Coin>['pagination'];
}

const columns: TableProps<Coin>['columns'] = [
  {
    title: 'Coin',
    dataIndex: 'symbol',
    key: 'symbol',
    render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    sorter: (a, b) => a.symbol.localeCompare(b.symbol),
  },
  {
    title: 'Price($)',
    dataIndex: 'price_usd',
    key: 'price_usd',
    align: 'center',
    sorter: (a, b) => Number(a.price_usd) - Number(b.price_usd),
  },
  {
    title: '1h',
    dataIndex: 'percent_change_1h',
    key: 'percent_change_1h',
    align: 'center',
    render: (percent_change_1h) => (
      <Tag color={percent_change_1h >= 0 ? 'success' : 'error'}>
        {`${percent_change_1h}%`}
      </Tag>
    ),
    sorter: (a, b) => Number(a.percent_change_1h) - Number(b.percent_change_1h),
  },
  {
    title: '24h',
    dataIndex: 'percent_change_24h',
    key: 'percent_change_24h',
    align: 'center',
    render: (percent_change_24h) => (
      <Tag color={percent_change_24h >= 0 ? 'success' : 'error'}>
        {`${percent_change_24h}%`}
      </Tag>
    ),
    sorter: (a, b) =>
      Number(a.percent_change_24h) - Number(b.percent_change_24h),
  },
];

const TickersTable: React.FC<TickersTableProps> = ({ data, pagination }) => {
  const dispatch = useAppDispatch();
  const coinId = useAppSelector(selectCoinId);
  const screens = Grid.useBreakpoint();

  return (
    <Table<Coin>
      columns={columns}
      dataSource={data}
      size="small"
      bordered
      pagination={pagination}
      onRow={(record) => ({
        onClick: () => {
          dispatch(setCoinIdAction(record.id));
          if (!screens.md) {
            dispatch(setIsSiderCollapsedAction(true));
          }
          setTimeout(() => {
            dispatch(
              coinloreApi.util.invalidateTags([{ type: 'Ticker', id: coinId }])
            );
          });
        },
      })}
    />
  );
};

export default TickersTable;
