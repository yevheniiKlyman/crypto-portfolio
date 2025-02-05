import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  GlobalCryptoInfoResponse,
  Tickers,
  MarketForCoin,
  Exchanges,
  Exchange,
  GlobalCryptoInfoItem,
  Coin,
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

    getTickers: builder.query<Tickers, number | void>({
      query: (start = 0) => `tickers/?start=${start}&limit=50`,
      transformResponse: (response: Tickers) => ({
        ...response,
        data: response.data.map((coin) => ({
          ...coin,
          key: coin.id,
        })),
      }),
      providesTags: ['Tickers'],
    }),

    getTicker: builder.query<Coin, string>({
      query: (id) => `ticker/?id=${id}`,
      transformResponse: (response: Coin[]) => response[0],
      providesTags: (result) =>
        result
          ? [{ type: 'Ticker' as const, id: result.id }, 'Ticker']
          : ['Ticker'],
    }),

    getMarketsForCoin: builder.query<MarketForCoin[], string>({
      query: (id) => `coin/markets/?id=${id}`,
      transformResponse: (response: MarketForCoin[]) => ([
        ... response.map((market) => ({
          ...market,
          price: formatNumber(Number(market.price), 2),
          price_usd: formatNumber(Number(market.price_usd), 2),
          key: market.name + market.quote,
        }))
      ]),
}),

    getAllExchanges: builder.query<Exchanges, void>({
      query: () => 'exchanges/',
    }),

    getExchange: builder.query<Exchange, number>({
      query: (id) => `exchange/?id=${id}`,
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
