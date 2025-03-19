export type PortfolioCurrentData = {
  totalPrice: number;
  priceDiffUsd: number;
  priceDiffPrecentage: string;
  chartData: ChartDataItem[];
};

export type ChartDataItem = {
  name: string;
  label: string;
  value: number;
}
