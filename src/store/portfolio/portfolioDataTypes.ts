import { Dayjs } from 'dayjs';

export interface PortfolioState {
  isDrawerOpen: boolean;
  showSuccessTransaction: boolean;
  assets: Assets;
}

export interface Assets {
  totalPrice: number;
  assets: Asset[];
}

export interface Asset {
  id: string;
  averagePrice: number;
  totalPrice: number;
  totalAmount: number;
  key: string;
  transactions: Transaction[];
}

export interface Transaction {
  asset: { value: string; label: string };
  amount: number;
  price: number;
  dateAndTime: string;
  comment: string;
  total: number;
  transactionType: 'buy' | 'sell';
}

export interface TransactionRaw extends Omit<Transaction, 'dateAndTime'> {
  dateAndTime: Dayjs;
}
