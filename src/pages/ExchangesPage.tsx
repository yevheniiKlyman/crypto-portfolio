import Exchanges from '@/components/Exchanges/Exchanges';
import AppContent from '@/components/layout/AppContent';
import { Flex } from 'antd';

const ExchangesPage: React.FC = () => {
  return (
    <AppContent>
      <Flex
        style={{
          paddingInline: '1rem',
        }}
        vertical
        align="center"
      >
        <Exchanges />
      </Flex>
    </AppContent>
  );
};

export default ExchangesPage;
