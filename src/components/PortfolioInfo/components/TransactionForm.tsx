import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Alert,
  Flex,
  Spin,
} from 'antd';
import { Decimal } from 'decimal.js';
import { useGetTickersQuery } from '@/store/coinlore/coinlore.api';
import { useAppDispath } from '@/store';
import { addTransactionAction } from '@/store/portfolio/portfolio.slice';
import { TransactionRaw } from '@/store/portfolio/portfolioDataTypes';

const { Option } = Select;

const TransactionForm: React.FC = () => {
  const [form] = Form.useForm<TransactionRaw>();
  const dispatch = useAppDispath();
  const { data, error, isLoading } = useGetTickersQuery({
    start: 0,
    limit: 100,
  });

  const transactionTypeSelector = (
    <Form.Item name="transactionType" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="buy">Buy</Option>
        <Option value="sell">Sell</Option>
      </Select>
    </Form.Item>
  );

  const calculateTotal = () => {
    const amount = form.getFieldValue('amount');
    const price = form.getFieldValue('price');

    if (amount && price) {
      const total = new Decimal(amount).mul(price).toNumber();
      form.setFieldsValue({ total });
    }
  };

  const onSelect = (value: string) => {
    const selectedCoin = data?.data.find((item) => item.id === value);

    form.resetFields([
      'amount',
      'total',
      'comment',
      'dateAndTime',
      'transactionType',
    ]);

    if (selectedCoin) {
      form.setFieldsValue({
        price: Number(selectedCoin.price_usd),
        transactionType: 'buy',
      });
    }
  };

  const onFinish = (values: TransactionRaw) => {
    dispatch(
      addTransactionAction({
        ...values,
        dateAndTime: values.dateAndTime.format('YYYY-MM-DD HH:mm'),
      })
    );
    form.resetFields();
  };

  return (
    <>
      {data?.data && (
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ transactionType: 'buy' }}
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item
            name="assetId"
            label="Asset"
            rules={[{ required: true, message: 'Please select an asset' }]}
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Search to Select"
              optionFilterProp="label"
              options={data.data}
              onChange={onSelect}
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              { required: true, message: 'Please enter the number of coins' },
            ]}
          >
            <InputNumber
              addonAfter={transactionTypeSelector}
              placeholder="Enter amount"
              style={{ width: '100%' }}
              onChange={calculateTotal}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Enter price"
              onChange={calculateTotal}
            />
          </Form.Item>

          <Form.Item
            name="dateAndTime"
            label="Date & Time"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: false }]}
          >
            <Input.TextArea
              showCount
              maxLength={100}
              placeholder="Type comment"
            />
          </Form.Item>

          <Form.Item label="Total ($)" name="total" initialValue={0}>
            <InputNumber disabled style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add transaction
            </Button>
          </Form.Item>
        </Form>
      )}

      {isLoading && (
        <Flex justify="center" style={{ paddingTop: '2rem' }}>
          <Spin size="large" />
        </Flex>
      )}

      {error && (
        <Alert
          message="Something went wrong. Please try again later..."
          type="error"
        />
      )}
    </>
  );
};

export default TransactionForm;
