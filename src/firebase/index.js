// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyA8comE3SNr3WqLkipD3T9GEV1uMmvZg0I",

  authDomain: "sneakercop-f5ba6.firebaseapp.com",

  projectId: "sneakercop-f5ba6",

  storageBucket: "sneakercop-f5ba6.appspot.com",

  messagingSenderId: "879984979553",

  appId: "1:879984979553:web:008a63a067642a19f08420",

  measurementId: "G-6P0Z5H7HN5"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const database = getStorage(app);

export const module = database;
