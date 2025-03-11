import { Button } from 'antd';
import { useAppDispatch } from '@/store';
import type { ButtonProps } from 'antd/es/button';
import { setIsAuthModalOpenAction } from '@/store/auth/auth.slice';

const SignInButton: React.FC<ButtonProps> = ({
  children = 'Sign in',
  ...props
}) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      color="primary"
      type="link"
      onClick={() => dispatch(setIsAuthModalOpenAction(true))}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SignInButton;
