import { Dayjs } from 'dayjs';

export interface PortfolioState {
  isDrawerOpen: boolean;
  assets: Asset[];
}

export interface Transaction {
  assetId: string;
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
  totalAmount: number;
  averagePrice: number;
  key: string;
  transactions: Transaction[];
}
