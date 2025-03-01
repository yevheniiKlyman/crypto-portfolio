import { useAppDispatch } from '@/store';
import { useSignInMutation } from '@/store/auth/auth.api';
import { setIsAuthModalOpenAction } from '@/store/auth/auth.slice';
import { AuthError } from '@/store/auth/authTypes';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

interface SignInFormProps {
  setShowRegistrationForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInForm: React.FC<SignInFormProps> = ({ setShowRegistrationForm }) => {
  const dispatch = useAppDispatch();
  const [signIn, { isLoading, error }] = useSignInMutation();

  const onFinish = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await signIn({ email, password });

    if (!response.error) {
      dispatch(setIsAuthModalOpenAction(false));
    }
  };

  return (
    <Form name="signin" onFinish={onFinish} layout="vertical">
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ paddingInlineEnd: '5px' }} />}
          placeholder="E-mail"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined style={{ paddingInlineEnd: '5px' }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item style={{ marginBlock: '30px 0' }}>
        <Button
          block
          type="primary"
          htmlType="submit"
          style={{ marginBlockEnd: '10px' }}
          loading={isLoading}
        >
          Sign in
        </Button>
        <span style={{ paddingBlockEnd: '1px' }}>or</span>
        <Button
          color="primary"
          type="link"
          onClick={() => setShowRegistrationForm(true)}
          style={{ paddingInlineStart: '5px' }}
        >
          Register now!
        </Button>
      </Form.Item>

      {error ? (
        <Form.Item
          style={{ marginBlock: '5px 0', textTransform: 'capitalize' }}
        >
          <span style={{ color: 'red' }}>{(error as AuthError).message}</span>
        </Form.Item>
      ) : (
        ''
      )}
    </Form>
  );
};

export default SignInForm;
