import React, { useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Flex, Layout, Spin } from 'antd';
import { onAuthStateChanged } from 'firebase/auth';
import AppHeader from './components/layout/AppHeader';
import { useAppDispatch } from './store';
import { auth } from './firebase/firebase';
import { setIsUserLoadingAction, setUserAction } from './store/auth/auth.slice';

const MarketStatisticPage = React.lazy(
  () => import('./pages/MarketStatisticPage')
);
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));
const ExchangesPage = React.lazy(() => import('./pages/ExchangesPage'));

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
        <Suspense
          fallback={
            <Flex justify="center" style={{ marginTop: '2rem' }}>
              <Spin size="large" />
            </Flex>
          }
        >
          <Routes>
            <Route path="/" element={<MarketStatisticPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/exchanges" element={<ExchangesPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Layout>
  );
};

export default App;
