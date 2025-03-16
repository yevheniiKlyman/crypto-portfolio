import { Coin } from '@/store/coinlore/coinloreTypes';
import { Assets } from '@/store/db/dbTypes';
import Decimal from 'decimal.js';

export const calculatePortfolioCurrentData = (
  assets: Assets,
  tickers: Coin[] | undefined
): {
  totalPrice: number;
  priceDiffUsd: number;
  priceDiffPrecentage: string;
  chartData: {
    label: string;
    exploded?: boolean;
    y: number;
  }[];
} => {
  if (!assets.totalPrice) {
    return {
      totalPrice: 0,
      priceDiffUsd: 0,
      priceDiffPrecentage: '0',
      chartData: [],
    };
  }

  const currentAssetsTotalPrices = [];

  for (const asset of assets.assets.filter((asset) => asset.totalAmount > 0)) {
    const ticker = tickers?.find((item) => item.id === asset.id);

    if (!ticker) continue;

    currentAssetsTotalPrices.push({
      label: `(${ticker.symbol}) ${ticker.name}`,
      price: new Decimal(ticker.price_usd).mul(asset.totalAmount).toNumber(),
    });
  }

  const portfolioCurrentTotalPrice = currentAssetsTotalPrices.reduce(
    (acc, asset) => {
      return new Decimal(acc).add(asset.price).toNumber();
    },
    0
  );

  const priceDiffUsd = new Decimal(portfolioCurrentTotalPrice)
    .sub(assets.totalPrice)
    .toNumber();

  return {
    totalPrice: portfolioCurrentTotalPrice,
    priceDiffUsd,
    priceDiffPrecentage: new Decimal(priceDiffUsd)
      .div(assets.totalPrice)
      .mul(100)
      .toFixed(2),
    chartData: currentAssetsTotalPrices.map((item) => ({
      label: item.label,
      exploded: assets.assets.length > 1,
      y: Number(
        new Decimal(item.price)
          .div(portfolioCurrentTotalPrice)
          .mul(100)
          .toFixed(2)
      ),
    })),
  };
};
