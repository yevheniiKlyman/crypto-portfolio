import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  PieChartOutlined,
  FundOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import classes from './styles/Navigation.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Global crypto statistics',
    key: '/',
    icon: <GlobalOutlined />,
  },
  {
    label: 'Exchanges',
    key: '/exchanges',
    icon: <FundOutlined />,
  },
  {
    label: 'Portfolio',
    key: '/portfolio',
    icon: <PieChartOutlined />,
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('main');
  const navigate = useNavigate();
  const location = useLocation();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    setCurrent(key);
  };

  useEffect(() => {
    setCurrent(location.pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      theme="dark"
      style={{
        backgroundColor: 'transparent',
        width: '100%',
      }}
      className={classes.navigation}
    />
  );
};

export default Navigation;
