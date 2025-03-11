import { Dayjs } from 'dayjs';

export interface Asset {
  id: string;
  averagePrice: number;
  totalPrice: number;
  totalAmount: number;
  key: string;
  transactions: Transaction[];
}

export interface Portfolio {
  totalPrice: number;
  assets: Asset[];
}

export interface Transaction {
  asset: { value: string; label: string };
  amount: number;
  price: number;
  dateAndTime: string;
  comment: string;
  total: number;
  transactionType: 'Buy' | 'Sell';
  priceFormatted: string;
  totalFormatted: string;
  key: string;
}

export interface TransactionRaw extends Omit<Transaction, 'dateAndTime'> {
  dateAndTime: Dayjs;
}
