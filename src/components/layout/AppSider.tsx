import { Layout } from 'antd';

const siderStyle: React.CSSProperties = {
  backgroundColor: '#F5F5F5',
  // borderInlineEnd: '1px solid rgba(5, 5, 5, 0.06)',
  maxHeight: 'calc(100vh - 60px)',
  overflow: 'scroll',
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
  scrollbarColor: '#eaeaea transparent',
  position: 'absolute',
  top: '60px',
  bottom: '0',
  left: '0',
};

interface AppSiderProps {
  children: React.ReactNode;
}

const AppSider: React.FC<AppSiderProps> = ({ children }) => {
  return (
    <Layout.Sider width="410px" style={siderStyle}>
      {children}
    </Layout.Sider>
  );
};

export default AppSider;
