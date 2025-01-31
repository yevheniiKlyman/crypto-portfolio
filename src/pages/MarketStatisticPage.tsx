import AppSider from '../components/layout/AppSider';
import AppContent from '../components/layout/AppContent';
import GlobalCryptoInfo from '../components/GlobalCryptoInfo';
import Tickers from '../components/Tickers/Tickers';

const MarketStatisticPage: React.FC =() => {
  return (
    <>
      <AppSider>
        <Tickers />
      </AppSider>
      <AppContent>
        <GlobalCryptoInfo />
      </AppContent>
    </>
  );
};

export default MarketStatisticPage;
