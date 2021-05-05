import React from 'react';
import AuthContextProvider from './src/context/authContext';
import DBContextProvider from './src/context/dbContext';
import MainNavigation from './src/navigation/mainNavigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './src/store';

export const store = createStore(allReducers);

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
