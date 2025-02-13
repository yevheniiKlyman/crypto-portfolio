import AppSider from '@components/layout/AppSider';
import AppContent from '@components/layout/AppContent';
import PortfolioInfo from '@/components/PortfolioInfo/PortfolioInfo';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <AppSider>Portfolio sider</AppSider>
      <AppContent style={{ marginInlineStart: '410px', padding: '1rem 2rem' }}>
        <PortfolioInfo />
      </AppContent>
    </>
  );
};

export default PortfolioPage;
