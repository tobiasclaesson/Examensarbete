import React from 'react';
import AuthContextProvider from './src/context/authContext';
import DBContextProvider from './src/context/dbContext';
import MainNavigation from './src/navigation/mainNavigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './src/store';

export const store = createStore(allReducers);

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Calling getNode()']);
LogBox.ignoreLogs(['Setting a timer']);

export default function App(): React.ReactNode {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <DBContextProvider>
          <MainNavigation />
        </DBContextProvider>
      </AuthContextProvider>
    </Provider>
  );
}
