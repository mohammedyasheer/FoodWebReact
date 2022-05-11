// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0efi3-v3O3dG6EFKm1LUKXKbMmJtTbnU",
  authDomain: "foodweb-b0617.firebaseapp.com",
  projectId: "foodweb-b0617",
  storageBucket: "foodweb-b0617.appspot.com",
  messagingSenderId: "686289057907",
  appId: "1:686289057907:web:cd53c2e805bf4127759206"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
export const db = getFirestore()