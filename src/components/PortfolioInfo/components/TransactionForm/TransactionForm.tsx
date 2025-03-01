import { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@/store';
import {
  addTransactionAction,
  selectAssets,
  selectIsDrawerOpen,
  selectSelectedAsset,
  selectShowSuccessTransaction,
  setShowSuccessTransactionAction,
} from '@/store/portfolio/portfolio.slice';
import {
  Asset,
  Transaction,
  TransactionRaw,
} from '@/store/portfolio/portfolioTypes';
import TransactionSuccess from '../TransactionSuccess';
import classes from './styles/TransactionForm.module.css';

const { Option } = Select;

const TransactionForm: React.FC = () => {
  const [form] = Form.useForm<TransactionRaw>();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [maxAmount, setMaxAmount] = useState(0);
  const [isSellDisabled, setIsSellDisabled] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const showSuccessTransaction = useAppSelector(selectShowSuccessTransaction);
  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const assets = useAppSelector(selectAssets);
  const assetSelectedInPortfolio = useAppSelector(selectSelectedAsset);
  const { data, error, isLoading } = useGetTickersQuery({
    start: 0,
    limit: 100,
  });

  const transactionTypeSelector = (
    <Form.Item name="transactionType" noStyle>
      <Select
        style={{ width: 70 }}
        onChange={(val) => {
          setMaxAmount(val === 'Buy' ? 0 : selectedAsset?.totalAmount || 0);
        }}
      >
        <Option value="Buy">Buy</Option>
        <Option value="Sell" disabled={isSellDisabled}>
          Sell
        </Option>
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

  const onSelect = (value: { value: string; label: string }) => {
    const selectedTicker = data?.data.find((item) => item.id === value.value);
    const selectedAsset = assets.assets.find(
      (asset) => asset.id === value.value
    );
    setSelectedAsset(selectedAsset);

    form.resetFields([
      'amount',
      'total',
      'comment',
      'dateAndTime',
      'transactionType',
    ]);

    if (selectedTicker) {
      form.setFieldsValue({
        price: Number(selectedTicker.price_usd),
        transactionType: 'Buy',
      });

      setIsSellDisabled(!selectedAsset?.totalAmount);
    }
  };

  const onFinish = (values: TransactionRaw) => {
    const transactionData = {
      ...values,
      dateAndTime: values.dateAndTime.format('YYYY-MM-DD HH:mm'),
    };

    dispatch(addTransactionAction(transactionData));
    form.resetFields();
    setTransaction(transactionData);
    dispatch(setShowSuccessTransactionAction(true));
  };

  useEffect(() => {
    if (assetSelectedInPortfolio) {
      form.setFieldsValue({
        asset: assetSelectedInPortfolio,
      });

      onSelect(assetSelectedInPortfolio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetSelectedInPortfolio]);

  useEffect(() => {
    if (!isDrawerOpen) {
      form.resetFields();
      setMaxAmount(0);
      setIsSellDisabled(true);
      setSelectedAsset(undefined);
    }
  }, [isDrawerOpen, form]);

  if (isLoading) {
    return (
      <Flex justify="center" style={{ paddingTop: '2rem' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    <Alert
      message="Something went wrong. Please try again later..."
      type="error"
    />;
  }

  if (transaction && showSuccessTransaction) {
    return <TransactionSuccess transaction={transaction} />;
  }

  return (
    data?.data && (
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{ transactionType: 'Buy' }}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="asset"
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
            labelInValue
          />
        </Form.Item>

        <Form.Item className={classes.amountItem}>
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
              {...(maxAmount > 0 && { max: maxAmount })}
            />
          </Form.Item>
          {maxAmount ? (
            <Button
              style={{ marginInlineStart: '2px' }}
              onClick={() => form.setFieldsValue({ amount: maxAmount })}
            >
              Max
            </Button>
          ) : (
            ''
          )}
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
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Form.Item name="comment" label="Comment" rules={[{ required: false }]}>
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
    )
  );
};

export default TransactionForm;
