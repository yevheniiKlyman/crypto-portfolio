import { Layout } from 'antd';

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
}

const AppContent: React.FC<AppContentProps> = ({ children, style = {} }) => {
  return (
    <Layout.Content style={{ ...contentStyle, ...style }}>
      {children}
    </Layout.Content>
  );
};

export default AppContent;
