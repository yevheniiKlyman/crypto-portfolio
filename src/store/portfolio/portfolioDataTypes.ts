import { Dayjs } from 'dayjs';

export interface PortfolioState {
  isDrawerOpen: boolean;
  showSuccessTransaction: boolean;
  assets: Asset[];
}

export interface Transaction {
  asset: { value: string; label: string };
  amount: number;
  price: number;
  dateAndTime: string;
  comment: string;
  total: number;
  transactionType: string;
}

export interface TransactionRaw extends Omit<Transaction, 'dateAndTime'> {
  dateAndTime: Dayjs;
}

export interface Asset {
  id: string;
  averagePrice: number;
  totalPrice: number;
  totalAmount: number;
  key: string;
  transactions: Transaction[];
}
