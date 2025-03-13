import { useEffect, useState } from 'react';
import { Layout, Grid } from 'antd';
import FoldButton from './components/FoldButton/FoldButton';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectIsSiderCollapsed,
  setIsSiderCollapsedAction,
} from '@/store/layout/layout.slice';
import classes from './styles/AppSider.module.css';

interface AppSiderProps {
  children: React.ReactNode;
}

const AppSider: React.FC<AppSiderProps> = ({ children }) => {
  const isSiderCollapsed = useAppSelector(selectIsSiderCollapsed);
  const screens = Grid.useBreakpoint();
  const dispatch = useAppDispatch();
  const [isSiderInited, setIsSiderInited] = useState(screens.md);

  useEffect(() => {
    dispatch(setIsSiderCollapsedAction(!screens.md));
  }, [dispatch, screens]);

  useEffect(() => {
    setIsSiderInited(true);
  }, []);

  return (
    <Layout.Sider
      width={screens.lg ? '410px' : '350px'}
      className={`${classes.AppSider} ${isSiderInited ? '' : classes.hidden}`}
      collapsed={isSiderCollapsed}
      collapsedWidth="0"
      theme="light"
    >
      {!screens.md && <FoldButton />}
      {children}
    </Layout.Sider>
  );
};

export default AppSider;
