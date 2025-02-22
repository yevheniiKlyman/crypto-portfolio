import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  GlobalCryptoInfoResponse,
  Tickers,
  MarketForCoin,
  Exchanges,
  Exchange,
  GlobalCryptoInfoItem,
  Coin,
  ExchangeInExchangesFormated,
  TickersFormated,
} from './coinloreDataTypes';
import { transformGlobalCryptoInfoResponse } from './coinloreUtils';
import { formatNumber } from '@utils/formatNumber';

export const coinloreApi = createApi({
  reducerPath: 'coinloreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coinlore.net/api/' }),
  tagTypes: ['Ticker', 'Tickers', 'GlobalStatistics'],
  endpoints: (builder) => ({
    getGlobalCryptoInfo: builder.query<GlobalCryptoInfoItem[], null>({
      query: () => 'global/',
      transformResponse: (response: GlobalCryptoInfoResponse[]) =>
        transformGlobalCryptoInfoResponse(response[0]),
      providesTags: ['GlobalStatistics'],
    }),

    getTickers: builder.query<TickersFormated, { start: number; limit: number }>({
      query: ({ start, limit }) => `tickers/?start=${start}&limit=${limit}`,
      transformResponse: (response: Tickers) => ({
        ...response,
        data: response.data.map((coin) => ({
          ...coin,
          key: coin.id,
          value: coin.id,
          label: `(${coin.symbol}) ${coin.name}`,
        })),
      }),
      providesTags: ['Tickers'],
    }),

    getTicker: builder.query<Coin[], string>({
      query: (id) => `ticker/?id=${id}`,
      transformResponse: (response: Coin[]) => [
        ...response.map((coin) => ({
          ...coin,
          key: coin.id,
        })),
      ],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Ticker' as const, id })),
              'Ticker',
            ]
          : ['Ticker'],
    }),

    getMarketsForCoin: builder.query<MarketForCoin[], string>({
      query: (id) => `coin/markets/?id=${id}`,
      transformResponse: (response: MarketForCoin[]) => [
        ...response.map((market) => ({
          ...market,
          priceFormatted: formatNumber(Number(market.price), 2),
          priceUsdFormatted: formatNumber(Number(market.price_usd), 2),
          key: market.name + market.quote,
        })),
      ],
    }),

    getAllExchanges: builder.query<ExchangeInExchangesFormated[], void>({
      query: () => 'exchanges/',
      transformResponse: (response: Exchanges) => [
        ...Object.values(response)
          .filter((exchange) => exchange.volume_usd !== 0)
          .map((exchange) => ({
            ...exchange,
            key: exchange.id,
            volume_usd_formatted: formatNumber(Number(exchange.volume_usd), 2),
          })),
      ],
    }),

    getExchange: builder.query<Exchange, string>({
      query: (id) => `exchange/?id=${id}`,
      transformResponse: (response: Exchange) => ({
        ...response,
        pairs: response?.pairs?.map((pair) => ({
          ...pair,
          key: pair.base + pair.quote + pair.price + pair.volume,
          price: formatNumber(Number(pair.price), 2),
          price_usd: formatNumber(Number(pair.price_usd), 2),
          volume: formatNumber(Number(pair.volume), 2),
        })),
      }),
    }),
  }),
});

export const {
  useGetGlobalCryptoInfoQuery,
  useGetTickersQuery,
  useGetTickerQuery,
  useGetMarketsForCoinQuery,
  useGetAllExchangesQuery,
  useGetExchangeQuery,
  useLazyGetMarketsForCoinQuery,
} = coinloreApi;
