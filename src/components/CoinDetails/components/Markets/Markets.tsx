import { Divider, Table, TableProps, Typography } from 'antd';
import { MarketForCoin } from '@store/coinlore/coinloreTypes';
import classes from './styles/Markets.module.css';

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
    dataIndex: ['base', 'quote'],
    key: 'quote',
    align: 'center',
    render: (_, { base, quote }) => (
      <span>
        {base}/{quote}
      </span>
    ),
    sorter: (a, b) => a.quote.localeCompare(b.quote),
  },
  {
    title: 'Price in Quote',
    dataIndex: 'priceFormatted',
    key: 'priceFormatted',
    align: 'center',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Price($)',
    dataIndex: 'priceUsdFormatted',
    key: 'priceUsdFormatted',
    align: 'center',
    sorter: (a, b) => a.price_usd - b.price_usd,
  },
];

const Markets: React.FC<MarketsProps> = ({ data }) => (
  <>
    <Divider />
    <Typography.Title level={3} style={{ marginTop: '1rem' }}>
      Top Markets For {data[0].base}
    </Typography.Title>
    <Table<MarketForCoin>
      className={classes.table}
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
      bordered
      style={{ marginTop: '1rem', overflowX: 'scroll' }}
    />
  </>
);

export default Markets;
