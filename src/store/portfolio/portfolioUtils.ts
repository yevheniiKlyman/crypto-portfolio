import { Decimal } from 'decimal.js';
import storage from '@/utils/storage';
import { PayloadAction } from '@reduxjs/toolkit';
import { Asset, PortfolioState, Transaction } from './portfolioDataTypes';

export const LS_PORTFOLIO_KEY = 'pf_assets';

const calculateTotalAmount = (
  currentTotal: number,
  transaction: Transaction
): number => {
  let total = 0;

  if (transaction.transactionType === 'buy') {
    total = new Decimal(currentTotal).add(transaction.amount).toNumber();
  } else {
    total = new Decimal(currentTotal).sub(transaction.amount).toNumber();
  }

  if (total < 0) {
    total = 0;
  }

  return total;
};

const calculateAveragePrice = (
  asset: Asset,
  transaction: Transaction
): number => {
  if (transaction.transactionType === 'buy') {
    return new Decimal(asset.totalAmount)
      .times(asset.averagePrice)
      .plus(transaction.total)
      .div(new Decimal(asset.totalAmount).plus(transaction.amount))
      .toNumber();
  }

  return asset.averagePrice;
};

export const addTransaction = (
  state: PortfolioState,
  action: PayloadAction<Transaction>
) => {
  if (!state.assets.find((asset) => asset.id === action.payload.assetId)) {
    state.assets.push({
      id: action.payload.assetId,
      key: action.payload.assetId,
      totalAmount: 0,
      averagePrice: 0,
      transactions: [],
    });
  }

  state.assets = state.assets.map((asset) => {
    if (asset.id === action.payload.assetId) {
      return {
        ...asset,
        totalAmount: calculateTotalAmount(asset.totalAmount, action.payload),
        averagePrice: calculateAveragePrice(asset, action.payload),
        transactions: [...asset.transactions, action.payload],
      };
    }
    return asset;
  });

  storage.set(LS_PORTFOLIO_KEY, state.assets);
};
