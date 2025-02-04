import { Divider, Table, TableProps, Typography } from 'antd';
import { MarketForCoin } from '@store/coinlore/coinloreDataTypes';

interface MarketsProps {
  data: MarketForCoin[];
}

const columns: TableProps<MarketForCoin>['columns'] = [
  {
    title: 'Market',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Quote currency',
    dataIndex: ['base','quote'],
    key: 'quote',
    render: (_, { base, quote }) => <span>{base}/{quote}</span>,
    sorter: (a, b) => a.quote.localeCompare(b.quote),
  },
  {
    title: 'Price in Quote',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Price($)',
    dataIndex: 'price_usd',
    key: 'price_usd',
  },
];

const Markets: React.FC<MarketsProps> = ({ data }) => (
  <>
    <Divider />
    <Typography.Title level={3} style={{ marginTop: '1rem' }}>
      Top Markets For {data[0].base}
    </Typography.Title>
    <Table<MarketForCoin>
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
      style={{ marginTop: '1rem' }}
    />
  </>
);  

export default Markets;
