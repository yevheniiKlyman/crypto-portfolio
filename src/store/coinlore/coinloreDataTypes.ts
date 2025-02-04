export interface GlobalCryptoInfoResponse {
  coins_count: number;
  active_markets: number;
  total_mcap: number;
  total_volume: number;
  btc_d: string;
  eth_d: string;
  mcap_change: string;
  volume_change: string;
  avg_change_percent: string;
  volume_ath: number;
  mcap_ath: number;
}

export interface GlobalCryptoInfoItem {
  key: number;
  label: string;
  children: string | number;
  tag?: boolean;
}

export interface Tickers {
  data: Coin[];
  info: {
    coins_num: number;
    time: number;
  };
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

export interface MarketForCoin {
  name: string;
  base: string;
  quote: string;
  price: number | string;
  price_usd: number | string;
  volume: number;
  volume_usd: number;
  time: number;
}

export interface ExchangeInExchanges {
  id: string;
  name: string;
  name_id: string;
  volume_usd: number;
  active_pairs: number;
  url: string;
  country: string;
}

export interface Exchanges {
  [key: string]: ExchangeInExchanges;
}

export interface CryptoPair {
  base: string;
  quote: string;
  volume: number;
  price: number;
  price_usd: number;
  time: number;
}

export interface Exchange {
  '0': {
    name: string;
    url: string;
  };
  pairs: CryptoPair[];
}
