import { Table, TableProps } from 'antd';
import { CryptoPair } from '@/store/coinlore/coinloreTypes';

interface MarketsProps {
  data: CryptoPair[];
}

const columns: TableProps<CryptoPair>['columns'] = [
  {
    title: 'Quote currency',
    dataIndex: ['base', 'quote'],
    key: 'quote',
    render: (_, { base, quote }) => (
      <span>
        {base}/{quote || '?'}
      </span>
    ),
    sorter: (a, b) => a.base.localeCompare(b.base),
  },
  {
    title: 'Price in Quote',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: 'Price($)',
    dataIndex: 'price_usd',
    key: 'price_usd',
    align: 'center',
  },
  {
    title: 'Volume',
    dataIndex: 'volume',
    key: 'volume',
    align: 'center',
  },
];

const CryptoPairsTable: React.FC<MarketsProps> = ({ data }) => (
  <>
    <Table<CryptoPair>
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
      bordered
      style={{ marginTop: '1rem' }}
    />
  </>
);

export default CryptoPairsTable;
