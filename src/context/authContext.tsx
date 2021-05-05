import React, { createContext, useState, useEffect, FC } from 'react';
import { auth, db } from '../firebase/firebase';
import firebase from 'firebase';

interface IProps {
  children?: React.ReactNode;
}

const initialState = {
  user: auth.currentUser,
  userIsAdmin: false,
  isLoading: true,
  signIn: (email: string, password: string) => {},
  signOut: () => {},
  signUp: (email: string, password: string) => {},
};

export const AuthContext = createContext(initialState);

const AuthContextProvider: FC<IProps> = (props) => {
  const { children } = props;

  const [user, setUser] = useState<firebase.User | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      checkUserRole();
    });

    return unsubscribe;
  }, []);

  const checkUserRole = async () => {
    const snapshot = await db.collection('Admins').get();

    if (snapshot) {
      snapshot.forEach((doc) => {
        if (doc.data().email === auth.currentUser?.email) {
          setUserIsAdmin(true);
        } else {
          setUserIsAdmin(false);
        }
      });
    }
    setIsLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const signOut = async () => {
    console.log(`Signing out ${user?.email}`);

    try {
      await auth.signOut();
    } catch (error) {
      console.log('error:', error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, user, userIsAdmin, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
