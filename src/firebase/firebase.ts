import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAKyuRY2pBXn0BoIlkH5EV2t_Oe6F28d7A',
  authDomain: 'prioritization-app.firebaseapp.com',
  projectId: 'prioritization-app',
  storageBucket: 'prioritization-app.appspot.com',
  messagingSenderId: '376121967400',
  appId: '1:376121967400:web:74070126c24282d576061d',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

export const auth = firebase.auth();

export const db = firebase.firestore();
