import { firebase } from '@firebase/app';
//require('firebase/auth')
import '@firebase/firestore';




const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCBRlDLTF-U-1LPrOQGQImOi32C3l0xQIo",
    authDomain: "timesheet-ae6e5.firebaseapp.com",
    projectId: "timesheet-ae6e5",
    storageBucket: "timesheet-ae6e5.appspot.com",
    messagingSenderId: "1016784889240",
    appId: "1:1016784889240:web:0acf6aad45a2fb418b77ed",
    measurementId: "G-HY6ML5551P"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;