import React from 'react';
import { Routes, Route } from 'react-router';
import { Layout } from 'antd';
import MarketStatisticPage from './pages/MarketStatisticPage';
import PortfolioPage from './pages/PortfolioPage';
import ExchangesPage from './pages/ExchangesPage';
import AppHeader from './components/layout/AppHeader';

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  alignItems: 'center',
};

const bodyLayoutStyle = {
  maxWidth: '1600px',
  width: '100%',
  borderInline: '1px solid rgba(5, 5, 5, 0.06)',
};

const App: React.FC = () => (
  <Layout style={layoutStyle}>
    <AppHeader />
    <Layout style={bodyLayoutStyle}>
      <Routes>
        <Route path="/" element={<MarketStatisticPage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
        <Route path='/exchanges' element={<ExchangesPage />} />
      </Routes>
    </Layout>
  </Layout>
);

export default App;
