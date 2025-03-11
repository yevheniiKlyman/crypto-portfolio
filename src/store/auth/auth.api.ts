import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/firebase';
import { FirebaseError } from 'firebase/app';
import { AuthError, AuthArgs, User } from './authTypes';

const errorHandler = (error: unknown): { error: AuthError } => {
  if (error instanceof FirebaseError) {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }

  return {
    error: {
      code: 'unknown',
      message: 'An unknown error occurred.',
    },
  };
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUp: builder.mutation<User, AuthArgs>({
      async queryFn({ email, password }) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          return {
            data: {
              email: userCredential.user.providerData[0].email || '',
              uid: userCredential.user.providerData[0].uid,
            },
          };
        } catch (error) {
          return errorHandler(error);
        }
      },
    }),
    signIn: builder.mutation<User, AuthArgs>({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          return {
            data: {
              email: userCredential.user.providerData[0].email || '',
              uid: userCredential.user.providerData[0].uid,
            },
          };
        } catch (error) {
          return errorHandler(error);
        }
      },
    }),
    googleSignIn: builder.mutation<User, void>({
      async queryFn() {
        try {
          const userCredential = await signInWithPopup(auth, googleProvider);
          return {
            data: {
              email: userCredential.user.providerData[0].email || '',
              uid: userCredential.user.providerData[0].uid,
            },
          };
        } catch (error) {
          return { error: error };
        }
      },
    }),
    signOut: builder.mutation<void, void>({
      async queryFn() {
        try {
          await signOut(auth);
          window.location.reload();
          return { data: undefined };
        } catch (error) {
          return errorHandler(error);
        }
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGoogleSignInMutation,
  useSignOutMutation,
} = authApi;
