import { Layout } from 'antd';

const contentStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 60px)',
  padding: '1rem 2rem',
  marginBlockStart: '60px',
  marginInlineStart: '410px',
  maxHeight: 'calc(100vh - 60px)',
  overflow: 'scroll',
  scrollbarWidth: 'thin',
  scrollbarColor: '#eaeaea transparent',
};

interface AppContentProps {
  children: React.ReactNode;
}

const AppContent: React.FC<AppContentProps> =({ children }) => {
  return (
    <Layout.Content style={contentStyle}>
      {children}
    </Layout.Content>
  );
};

export default AppContent;
