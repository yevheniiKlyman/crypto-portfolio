import { Decimal } from 'decimal.js';
import { Asset, Portfolio, Transaction } from './dbTypes';
import { formatNumber } from '@/utils/formatNumber';

export const LS_PORTFOLIO_KEY = 'pf_assets';

const calculateTotalAmount = (
  currentTotal: number,
  transaction: Transaction
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
  portfolio: Portfolio,
  transaction: Transaction
): Portfolio => {
  const portfolioUpdated: Portfolio = JSON.parse(JSON.stringify(portfolio));

  if (!portfolioUpdated.assets.find((asset) => asset.id === transaction.asset.value)) {
    portfolioUpdated.assets.push({
      id: transaction.asset.value,
      key: transaction.asset.value,
      averagePrice: 0,
      totalPrice: 0,
      totalAmount: 0,
      transactions: [],
    });
  }

  const assets = portfolioUpdated.assets.map((asset) => {
    if (asset.id === transaction.asset.value) {
      const transactionData = {
        ...transaction,
        priceFormatted: formatNumber(transaction.price),
        totalFormatted: formatNumber(transaction.total),
        key: transaction.dateAndTime + transaction.amount,
      };
      const totalAmount = calculateTotalAmount(
        asset.totalAmount,
        transactionData
      );
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

  return {
    totalPrice: calculatePortfolioTotalPrice(assets),
    assets,
  };
};
