import { Button, Modal, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  selectIsSignOutModalOpen,
  selectUser,
  setIsSignOutModalOpenAction,
} from '@/store/auth/auth.slice';
import { useSignOutMutation } from '@/store/auth/auth.api';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { AuthError } from '@/store/auth/authTypes';

const SignOutModal: React.FC = () => {
  const isSignOutModalOpen = useAppSelector(selectIsSignOutModalOpen);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [signOut, { isLoading, error }] = useSignOutMutation();

  const handleCancel = () => dispatch(setIsSignOutModalOpenAction(false));

  const handleSignOut = async () => {
    const response = await signOut();
    if (!response.error) {
      dispatch(setIsSignOutModalOpenAction(false));
    }
  };

  return (
    <Modal
      title={
        <Typography.Title level={3}>
          <ExclamationCircleTwoTone style={{ marginInlineEnd: '10px' }} />
          Sign out
        </Typography.Title>
      }
      centered
      okText="Sign out"
      open={isSignOutModalOpen}
      onCancel={handleCancel}
      width={{
        xs: '90%',
        sm: '400px',
        md: '400px',
        lg: '400px',
        xl: '400px',
        xxl: '400px',
      }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="signOut"
          type="primary"
          loading={isLoading}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>,
      ]}
    >
      <p style={{ marginBlock: '1rem 0.5rem', fontSize: '16px' }}>
        Are you sure you want to sign out?
      </p>
      <p style={{ marginBlockEnd: '1.5rem', fontSize: '16px' }}>
        You are signed in with email:{' '}
        <span style={{ fontWeight: '500' }}>{user?.email}</span>.
      </p>
      {error ? (
        <p
          style={{
            color: 'red',
            marginBlock: '0 16px',
            textTransform: 'capitalize',
          }}
        >
          {(error as AuthError).message}
        </p>
      ) : (
        ''
      )}
    </Modal>
  );
};

export default SignOutModal;
