import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  GlobalCryptoInfoResponse,
  Tickers,
  MarketForCoin,
  Exchanges,
  Exchange,
  GlobalCryptoInfoItem,
} from './coinloreDataTypes';
import { transformGlobalCryptoInfoResponse } from './utils';

export const coinloreApi = createApi({
  reducerPath: 'coinloreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coinlore.net/api/' }),
  endpoints: (builder) => ({
    getGlobalCryptoInfo: builder.query<GlobalCryptoInfoItem[], null>({
      query: () => 'global/',
      transformResponse: (response: GlobalCryptoInfoResponse[]) =>
        transformGlobalCryptoInfoResponse(response[0]),
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
    }),

    getMarketsForCoin: builder.query<MarketForCoin[], number>({
      query: (id) => `coin/markets/?id=${id}`,
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
  useGetMarketsForCoinQuery,
  useGetAllExchangesQuery,
  useGetExchangeQuery,
} = coinloreApi;
