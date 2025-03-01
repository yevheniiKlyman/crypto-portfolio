import { useAppDispatch } from '@/store';
import { useSignUpMutation } from '@/store/auth/auth.api';
import { setIsAuthModalOpenAction } from '@/store/auth/auth.slice';
import { AuthError } from '@/store/auth/authTypes';
import { Button, Form, Input } from 'antd';

interface RegistrationFormProps {
  setShowRegistrationForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setShowRegistrationForm,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const onFinish = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await signUp({ email, password });

    if (!response.error) {
      dispatch(setIsAuthModalOpenAction(false));
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      layout="vertical"
    >
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
        <Input placeholder="E-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          { min: 6, message: 'Password should be at least 6 characters!' },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item style={{ marginBlockEnd: '0' }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', marginBlockEnd: '12px' }}
          loading={isLoading}
        >
          Register
        </Button>
        <br />
        <span style={{ paddingBlockEnd: '1px' }}>Already have an account?</span>
        <Button
          color="primary"
          type="link"
          onClick={() => setShowRegistrationForm(false)}
          style={{ paddingInlineStart: '8px' }}
        >
          Sign in!
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

export default RegistrationForm;
