import React from 'react';
import AuthContextProvider from './src/context/authContext';
import MainNavigation from './src/navigation/mainNavigation';

export default function App(): React.ReactNode {
  return (
    <AuthContextProvider>
      <MainNavigation />
    </AuthContextProvider>
  );
}
