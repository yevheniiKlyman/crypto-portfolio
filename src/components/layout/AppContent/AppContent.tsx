import { Layout } from 'antd';
import AuthModal from '../../AuthModal/AuthModal';
import SignOutModal from '../../SignOutModal';
import classes from './styles/AppContent.module.css';

const contentStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 60px)',
  marginBlockStart: '60px',
  maxHeight: 'calc(100vh - 60px)',
  overflow: 'scroll',
  scrollbarWidth: 'thin',
  scrollbarColor: '#eaeaea transparent',
};

interface AppContentProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  withSider?: boolean;
}

const AppContent: React.FC<AppContentProps> = ({
  children,
  style = {},
  className = '',
  withSider,
}) => {
  return (
    <Layout.Content
      style={{ ...contentStyle, ...style }}
      className={`${className} ${withSider ? classes.withSider : ''}`}
    >
      {children}
      <AuthModal />
      <SignOutModal />
    </Layout.Content>
  );
};

export default AppContent;
