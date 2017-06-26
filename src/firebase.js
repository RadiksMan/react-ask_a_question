import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDAChj3goQefD4aB2u6l2rWoOx3-8-2jK0",
    authDomain: "ask-a-question-react-test.firebaseapp.com",
    databaseURL: "https://ask-a-question-react-test.firebaseio.com",
    projectId: "ask-a-question-react-test",
    storageBucket: "",
    messagingSenderId: "37893605604"
};


export const firebaseApp = firebase.initializeApp(config);
export const userQ = firebase.database().ref('userQ');