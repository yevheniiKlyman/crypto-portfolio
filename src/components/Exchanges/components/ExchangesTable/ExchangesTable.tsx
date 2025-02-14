import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { ExchangeInExchanges } from '@store/coinlore/coinloreDataTypes';
import { useAppDispatch } from '@/store';
import { setExchangeIdAction } from '@store/coinlore/coinlore.slice';
import classes from './styles/ExchangesTable.module.css';

interface ExchangesTableProps {
  data: ExchangeInExchanges[];
}

const columns: TableProps<ExchangeInExchanges>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (name) => <span style={{ fontWeight: '500' }}>{name}</span>,
  },
  {
    title: 'Total trading volume ($)',
    dataIndex: 'volume_usd_formatted',
    key: 'volume_usd_formatted',
    align: 'center',
    sorter: (a, b) => a.volume_usd - b.volume_usd,
  },
  {
    title: 'Total crypto pairs',
    dataIndex: 'active_pairs',
    key: 'active_pairs',
    align: 'center',
    sorter: (a, b) => a.active_pairs - b.active_pairs,
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    sorter: (a, b) => a.country.localeCompare(b.country),
  },
];

const ExchangesTable: React.FC<ExchangesTableProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  return (
    <Table<ExchangeInExchanges>
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
      className={classes.ExchangesTable}
      bordered
      onRow={(record) => ({
        onClick: () => dispatch(setExchangeIdAction(record.id)),
      })}
    />
  );
};

export default ExchangesTable;
