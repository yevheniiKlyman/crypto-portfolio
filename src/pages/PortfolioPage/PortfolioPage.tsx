import AppContent from '@components/layout/AppContent';
import PortfolioInfo from '@/components/PortfolioInfo/PortfolioInfo';
import PortfolioSider from '@/components/PortfolioSider/PortfolioSider';
import classes from './styles/PortfolioPage.module.css';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <PortfolioSider />
      <AppContent className={classes.portfolioPage}>
        <PortfolioInfo />
      </AppContent>
    </>
  );
};

export default PortfolioPage;
