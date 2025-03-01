import { Button } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectIsUserLoading,
  selectUser,
  setIsAuthModalOpenAction,
  setIsSignOutModalOpenAction,
} from '@/store/auth/auth.slice';
import classes from './styles/AuthButton.module.css';

const AuthButton: React.FC = () => {
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsUserLoading);
  const dispatch = useAppDispatch();

  return (
    <Button
      type="link"
      icon={user ? <UserOutlined /> : <LoginOutlined />}
      style={{ color: '#fff' }}
      className={classes.authButton}
      loading={isUserLoading}
      onClick={() => {
        if (user) {
          dispatch(setIsSignOutModalOpenAction(true));
        } else {
          dispatch(setIsAuthModalOpenAction(true));
        }
      }}
    >
      {user ? 'Sign out' : 'Sign in'}
    </Button>
  );
};

export default AuthButton;
