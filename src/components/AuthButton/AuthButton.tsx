import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth/user.slice';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classes from './styles/AuthButton.module.css';

const AuthButton: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <Button
      color="default"
      variant="link"
      icon={user ? <UserOutlined /> : <LoginOutlined />}
      style={{ color: '#fff' }}
      className={classes.authButton}
    >
      {user ? 'Sign out' : 'Sign in'}
    </Button>
  );
};

export default AuthButton;
