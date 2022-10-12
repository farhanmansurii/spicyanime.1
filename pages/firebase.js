import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import React from 'react'
import firebaseConfig from "./config/firebaseConfig"
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export const firebase = () => {
  return (
    <div>hi</div>
  )
}

export { auth, db }

