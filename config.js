import firebase from 'firebase'
require("@firebase/firestore")


var firebaseConfig = {
    apiKey: "AIzaSyDUB6gYoK-fs-xzMTPLAJoLOGx2GiqDHWE",
    authDomain: "booksanta-d628b.firebaseapp.com",
    projectId: "booksanta-d628b",
    storageBucket: "booksanta-d628b.appspot.com",
    messagingSenderId: "180618661235",
    appId: "1:180618661235:web:806038a96b57abe170c906"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()
  