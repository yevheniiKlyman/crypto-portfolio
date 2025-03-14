import Exchanges from '@components/Exchanges/Exchanges';
import AppContent from '@components/layout/AppContent/AppContent';
import { Flex } from 'antd';

const ExchangesPage: React.FC = () => {
  return (
    <AppContent>
      <Flex
        style={{
          paddingInline: '5px',
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
