import React from 'react';
import AuthContextProvider from './src/context/authContext';
import DBContextProvider from './src/context/dbContext';
import MainNavigation from './src/navigation/mainNavigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './src/store';

export const store = createStore(allReducers);

import { Dimensions, LogBox, Platform, View } from 'react-native';
Platform.OS !== 'web' && LogBox.ignoreLogs(['Calling getNode()']);
Platform.OS !== 'web' && LogBox.ignoreLogs(['Setting a timer']);

export default function App(): React.ReactNode {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <DBContextProvider>
          <View
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
          >
            <MainNavigation />
          </View>
        </DBContextProvider>
      </AuthContextProvider>
    </Provider>
  );
}
