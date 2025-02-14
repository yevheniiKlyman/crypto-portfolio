import AppContent from '@components/layout/AppContent';
import PortfolioInfo from '@/components/PortfolioInfo/PortfolioInfo';
import PortfolioSider from '@/components/PortfolioSider/PortfolioSider';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <PortfolioSider />
      <AppContent style={{ marginInlineStart: '410px', padding: '1rem 2rem' }}>
        <PortfolioInfo />
      </AppContent>
    </>
  );
};

export default PortfolioPage;
