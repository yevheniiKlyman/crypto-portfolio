import React from 'react';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  padding: '10px 20px',
  backgroundColor: '#14161a',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#1e2226',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#191b1f',
};

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
};

const App: React.FC = () => (
  <Layout style={layoutStyle}>
    <Header style={headerStyle}>Header</Header>
    <Layout>
      <Sider width="25%" style={siderStyle}>
        Sider
      </Sider>
      <Content style={contentStyle}>Content</Content>
    </Layout>
  </Layout>
);

export default App;
