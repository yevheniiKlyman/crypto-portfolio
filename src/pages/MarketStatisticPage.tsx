import AppSider from '../components/layout/AppSider';
import AppContent from '../components/layout/AppContent';
import GlobalCryptoInfo from '../components/GlobalCryptoInfo';
import Tickers from '../components/Tickers/Tickers';
import CoinDetails from '../components/CoinDetails/CoinDetails';
import { useAppSelector } from '../store';
import { selectCoinId } from '../store/coinlore/coinlore.slice';

const MarketStatisticPage: React.FC =() => {
  const coinId = useAppSelector(selectCoinId);

  return (
    <>
      <AppSider>
        <Tickers />
      </AppSider>
      <AppContent>
        {!coinId && <GlobalCryptoInfo />}
        {coinId && <CoinDetails />}
      </AppContent>
    </>
  );
};

export default MarketStatisticPage;
