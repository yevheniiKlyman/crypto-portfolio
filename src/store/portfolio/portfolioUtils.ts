import { Decimal } from 'decimal.js';
import storage from '@/utils/storage';
import { PayloadAction } from '@reduxjs/toolkit';
import { Asset, PortfolioState, Transaction } from './portfolioDataTypes';

export const LS_PORTFOLIO_KEY = 'pf_assets';

const calculateTotal = (
  currentTotal: number,
  transactionValue: number,
  transactionType: 'buy' | 'sell',
): number => {
  let total = 0;

  if (transactionType === 'buy') {
    total = new Decimal(currentTotal).add(transactionValue).toNumber();
  } else {
    total = new Decimal(currentTotal).sub(transactionValue).toNumber();
  }

  if (total < 0) {
    total = 0;
  }

  return total;
};

const calculateAssetAveragePrice = (
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
  if (!state.assets.assets.find((asset) => asset.id === action.payload.asset.value)) {
    state.assets.assets.push({
      id: action.payload.asset.value,
      key: action.payload.asset.value,
      averagePrice: 0,
      totalPrice: 0,
      totalAmount: 0,
      transactions: [],
    });
  }

  state.assets = {
    ...state.assets,
    totalPrice: calculateTotal(state.assets.totalPrice, action.payload.total, action.payload.transactionType),
    assets: state.assets.assets.map((asset) => {
      if (asset.id === action.payload.asset.value) {
        const totalAmount = calculateTotal(asset.totalAmount, action.payload.amount, action.payload.transactionType);
        const averagePrice = calculateAssetAveragePrice(asset, action.payload);
  
        return {
          ...asset,
          totalAmount,
          averagePrice,
          totalPrice: new Decimal(totalAmount).mul(averagePrice).toNumber(),
          transactions: [...asset.transactions, action.payload],
        };
      }
      return asset;
    }),
  };

  storage.set(LS_PORTFOLIO_KEY, state.assets);
};
