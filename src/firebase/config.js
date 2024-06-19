import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVZ-GBYAw6RSggzS_0T6bKA9Aul3oBO6w",
  authDomain: "frontend-openai.firebaseapp.com",
  projectId: "frontend-openai",
  storageBucket: "frontend-openai.appspot.com",
  messagingSenderId: "603425524265",
  appId: "1:603425524265:web:0943d00469ce65edc76a38",
  measurementId: "G-TSJ0GN9S94"
}

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }
