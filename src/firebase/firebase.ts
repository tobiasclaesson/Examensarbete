import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDvi85c9Skk3SRmdJzk1NSF9ExbW7SPwb8',
  authDomain: 'prioritization-app-ace78.firebaseapp.com',
  projectId: 'prioritization-app-ace78',
  storageBucket: 'prioritization-app-ace78.appspot.com',
  messagingSenderId: '197053760890',
  appId: '1:197053760890:web:6c10c27fb09a7cddedc2c3',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

export const auth = firebase.auth();

export const db = firebase.firestore();
