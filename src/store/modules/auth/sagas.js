import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFalure } from './actions';

export function* signIn({ payload }) {
  try {
    // Retrieve the informed values to sent to the server
    const { email, password } = payload;

    // Make a call to the api
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    // Retrieve the recieved api data
    const { token, user } = response.data;

    // Verify if the user is a provider, to block his auth process
    if (user.provider) {
      Alert.alert('Login Error', 'The user can not be a provider');
      // throw new Error('User is not a provider');
      yield put(signFalure());
      return;
    }

    // Set the token inside the header to be allways utilized for the requests
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // Save the user data inside the redux store
    yield put(signInSuccess(token, user));

    // Redirect the user to the dashboard
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Authentication Error',
      'Faliure at login, please verify your email and password'
    );

    yield put(signFalure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Registration Error',
      'Fail on registration, please verify your data'
    );

    yield put(signFalure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }
  const { token } = payload.auth;

  if (token) {
    // Set the token inside the header to be allways utilized for the requests
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
