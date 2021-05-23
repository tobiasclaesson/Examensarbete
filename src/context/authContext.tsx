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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: (email: string, password: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signUp: (email: string, password: string) => {},
};

export const AuthContext = createContext(initialState);

const AuthContextProvider: FC<IProps> = (props: IProps) => {
  const { children } = props;

  const [user, setUser] = useState<firebase.User | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setIsLoading(true);
        setUser(user);
        if (user) {
          checkUserRole();
        }
        setIsLoading(false);
      },
      (error) => {
        console.log('error: authChange ', error);
      }
    );

    return unsubscribe;
  }, []);

  const checkUserRole = async () => {
    try {
      const snapshot = await db.collection('admins').get();

      if (snapshot) {
        snapshot.forEach((doc) => {
          if (doc.data().email === auth.currentUser?.email) {
            setUserIsAdmin(true);
          } else {
            setUserIsAdmin(false);
          }
        });
      }
    } catch (error) {
      console.log('error: userRoleCheck ', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log('error: signOut ', error);
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
