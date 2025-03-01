import React, { useState } from 'react';
import { Modal, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  selectIsAuthModalOpen,
  setIsAuthModalOpenAction,
} from '@/store/auth/auth.slice';
import RegistrationForm from './components/RegistrationForm';
import SignInForm from './components/SignInForm';

const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthModalOpen = useAppSelector(selectIsAuthModalOpen);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  return (
    <Modal
      title={
        <Typography.Title level={3} style={{ marginBlockEnd: '1rem' }}>
          {showRegistrationForm ? 'Registration' : 'Account'}
        </Typography.Title>
      }
      centered
      destroyOnClose
      footer={null}
      open={isAuthModalOpen}
      onCancel={() => {
        dispatch(setIsAuthModalOpenAction(false));
        setShowRegistrationForm(false);
      }}
      width={{
        xs: '90%',
        sm: '400px',
        md: '400px',
        lg: '400px',
        xl: '400px',
        xxl: '400px',
      }}
    >
      {showRegistrationForm ? (
        <RegistrationForm setShowRegistrationForm={setShowRegistrationForm} />
      ) : (
        <SignInForm setShowRegistrationForm={setShowRegistrationForm} />
      )}
    </Modal>
  );
};

export default AuthModal;
