import { useEffect } from 'react';
import AppSider from '@components/layout/AppSider';
import AppContent from '@components/layout/AppContent';
import GlobalCryptoInfo from '@components/GlobalCryptoInfo';
import Tickers from '@components/Tickers/Tickers';
import CoinDetails from '@components/CoinDetails/CoinDetails';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectCoinId, setCoinIdAction } from '@store/coinlore/coinlore.slice';
import { coinloreApi } from '@/store/coinlore/coinlore.api';

const MarketStatisticPage: React.FC = () => {
  const coinId = useAppSelector(selectCoinId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setTimeout(() => {
        dispatch(setCoinIdAction(''));
        dispatch(
          coinloreApi.util.invalidateTags([
            'Ticker',
            'Tickers',
            'GlobalStatistics',
          ])
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppSider>
        <Tickers />
      </AppSider>
      <AppContent
        style={{ marginInlineStart: '410px', padding: '1rem 1rem 1rem 2rem' }}
      >
        {!coinId && <GlobalCryptoInfo />}
        {coinId && <CoinDetails />}
      </AppContent>
    </>
  );
};

export default MarketStatisticPage;
