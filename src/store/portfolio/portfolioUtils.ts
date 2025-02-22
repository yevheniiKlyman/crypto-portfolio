import { Decimal } from 'decimal.js';
import storage from '@/utils/storage';
import { PayloadAction } from '@reduxjs/toolkit';
import { Asset, PortfolioState, Transaction } from './portfolioDataTypes';
import { formatNumber } from '@/utils/formatNumber';

export const LS_PORTFOLIO_KEY = 'pf_assets';

const calculateTotalAmount = (
  currentTotal: number,
  transaction: Transaction,
): number => {
  let total = 0;

  if (transaction.transactionType === 'Buy') {
    total = new Decimal(currentTotal).add(transaction.amount).toNumber();
  } else {
    total = new Decimal(currentTotal).sub(transaction.amount).toNumber();
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
  if (transaction.transactionType === 'Buy') {
    return new Decimal(asset.totalAmount)
      .times(asset.averagePrice)
      .plus(transaction.total)
      .div(new Decimal(asset.totalAmount).plus(transaction.amount))
      .toNumber();
  }

  return asset.averagePrice;
};

const calculatePortfolioTotalPrice = (assets: Asset[]): number => {
  return assets.reduce((total, asset) => {
    return new Decimal(total).add(asset.totalPrice).toNumber();
  }, 0);
};

export const addTransaction = (
  state: PortfolioState,
  { payload }: PayloadAction<Transaction>
) => {
  if (!state.assets.assets.find((asset) => asset.id === payload.asset.value)) {
    state.assets.assets.push({
      id: payload.asset.value,
      key: payload.asset.value,
      averagePrice: 0,
      totalPrice: 0,
      totalAmount: 0,
      transactions: [],
    });
  }

  const assets = state.assets.assets.map((asset) => {
    if (asset.id === payload.asset.value) {
      const transactionData = {
        ...payload,
        priceFormatted: formatNumber(payload.price),
        totalFormatted: formatNumber(payload.total),
        key: payload.dateAndTime + payload.amount,
      };
      const totalAmount = calculateTotalAmount(asset.totalAmount, transactionData);
      const averagePrice = calculateAssetAveragePrice(asset, transactionData);

      return {
        ...asset,
        totalAmount,
        averagePrice,
        totalPrice: new Decimal(totalAmount).mul(averagePrice).toNumber(),
        transactions: [...asset.transactions, transactionData],
      };
    }
    return asset;
  });

  state.assets = {
    ...state.assets,
    totalPrice: calculatePortfolioTotalPrice(assets),
    assets,
  };

  storage.set(LS_PORTFOLIO_KEY, state.assets);
};
