import { Layout } from 'antd';
import AuthModal from '../AuthModal/AuthModal';
import SignOutModal from '../SignOutModal';
import SiderOverlay from './AppSider/components/SiderOverlay';

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
}

const AppContent: React.FC<AppContentProps> = ({
  children,
  style = {},
  className = '',
}) => {
  return (
    <Layout.Content style={{ ...contentStyle, ...style }} className={className}>
      {children}
      <AuthModal />
      <SignOutModal />
      <SiderOverlay />
    </Layout.Content>
  );
};

export default AppContent;
