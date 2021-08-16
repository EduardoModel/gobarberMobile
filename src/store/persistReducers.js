// This storage can be utilized by the localstorage, async storage
// or with any storage avaiable at the fron-end
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'gobarber', // To identify the storage that is been used for the application
      storage: AsyncStorage,
      whitelist: ['auth', 'user'], // The name of the reducers that are allowed to persist data
    },
    reducers
  );

  return persistedReducers;
};
