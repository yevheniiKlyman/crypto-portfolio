import { Layout, Flex } from 'antd';
import Navigation from '../Navigation/Navigation';

const headerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  color: '#fff',
  height: 60,
  padding: 0, 
  backgroundColor: '#14161a',
  background: 'linear-gradient(135deg, rgb(33 175 72) 0%, rgb(32 97 188) 100%)',
};

const AppHeader: React.FC = () => {
  return <Layout.Header style={headerStyle}>
    <Flex align="center" justify="left" style={{ width: '100%', maxWidth: '1600px', paddingInline: '1rem' }}><Navigation /></Flex>
  </Layout.Header>;
};

export default AppHeader;
