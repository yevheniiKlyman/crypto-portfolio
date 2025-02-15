import TransactionDrawer from './components/TransactionDrawer';
import PortfolioGeneralInfo from './components/PortfolioGeneralInfo';

const PortfolioInfo: React.FC = () => {
  return (
    <>
      <PortfolioGeneralInfo />
      <TransactionDrawer />
    </>
  );
};

export default PortfolioInfo;
