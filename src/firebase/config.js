// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDOy67jsxW6NOPmpfPWWq2jzb5xMsIKc0g',
	authDomain: 'greenblog-a7f56.firebaseapp.com',
	projectId: 'greenblog-a7f56',
	storageBucket: 'greenblog-a7f56.appspot.com',
	messagingSenderId: '761744569727',
	appId: '1:761744569727:web:8b83da12e531b54911564a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
