import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAnFMvaPdJbceYzjo4651Ccc_K8BwiXGEY",
    authDomain: "my-39433.firebaseapp.com",
    databaseURL: "https://my-39433.firebaseio.com",
    projectId: "my-39433",
    storageBucket: "my-39433.appspot.com",
    messagingSenderId: "507056990122",
    appId: "1:507056990122:web:62f4865df741c11b4dedd3",
    measurementId: "G-WTLEE0LX3P"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};