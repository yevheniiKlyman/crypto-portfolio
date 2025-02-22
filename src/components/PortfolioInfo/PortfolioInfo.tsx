import TransactionDrawer from './components/TransactionDrawer';
import PortfolioGeneralInfo from './components/PortfolioGeneralInfo';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectSelectedAsset,
  setSelectedAssetAction,
} from '@/store/portfolio/portfolio.slice';
import PortfolioAssetInfo from './components/PortfolioAssetInfo/PortfolioAssetInfo';
import { useEffect } from 'react';

const PortfolioInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedAssetId = useAppSelector(selectSelectedAsset);

  useEffect(() => {
    return () => {
      dispatch(setSelectedAssetAction(null));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {selectedAssetId ? <PortfolioAssetInfo /> : <PortfolioGeneralInfo />}
      <TransactionDrawer />
    </>
  );
};

export default PortfolioInfo;
