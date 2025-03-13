import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Layout } from 'antd';
import MarketStatisticPage from './pages/MarketStatisticPage/MarketStatisticPage';
import PortfolioPage from './pages/PortfolioPage';
import ExchangesPage from './pages/ExchangesPage';
import AppHeader from './components/layout/AppHeader';
import { useAppDispatch } from './store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { setIsUserLoadingAction, setUserAction } from './store/auth/auth.slice';

const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  width: '100%',
  alignItems: 'center',
};

const bodyLayoutStyle: React.CSSProperties = {
  position: 'relative',
  maxWidth: '1600px',
  width: '100%',
  borderInline: '1px solid rgba(5, 5, 5, 0.06)',
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUserAction({
            email: user.email || '',
            uid: user.uid,
          })
        );
      } else {
        dispatch(setUserAction(null));
      }

      dispatch(setIsUserLoadingAction(false));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout style={layoutStyle}>
      <AppHeader />
      <Layout style={bodyLayoutStyle}>
        <Routes>
          <Route path="/" element={<MarketStatisticPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/exchanges" element={<ExchangesPage />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default App;
