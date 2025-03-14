import AppContent from '@/components/layout/AppContent/AppContent';
import PortfolioInfo from '@components/PortfolioInfo/PortfolioInfo';
import PortfolioSider from '@components/PortfolioSider/PortfolioSider';
import SiderOverlay from '@components/layout/AppSider/components/SiderOverlay';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <PortfolioSider />
      <AppContent withSider>
        <PortfolioInfo />
        <SiderOverlay />
      </AppContent>
    </>
  );
};

export default PortfolioPage;
