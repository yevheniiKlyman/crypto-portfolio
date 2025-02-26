import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/firebase';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUp: builder.mutation<User, { email: string; password: string }>({
      async queryFn({ email, password }) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          return { data: userCredential.user };
        } catch (error) {
          return { error: error };
        }
      },
    }),
    signIn: builder.mutation<User, { email: string; password: string }>({
      async queryFn({ email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return { data: userCredential.user };
        } catch (error) {
          return { error: error };
        }
      },
    }),
    googleSignIn: builder.mutation<User, void>({
      async queryFn() {
        try {
          const userCredential = await signInWithPopup(auth, googleProvider);
          return { data: userCredential.user };
        } catch (error) {
          return { error: error };
        }
      },
    }),
    signOut: builder.mutation<void, void>({
      async queryFn() {
        try {
          await signOut(auth);
          return { data: undefined };
        } catch (error) {
          return { error: error };
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
