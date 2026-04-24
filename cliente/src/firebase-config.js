import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// AQUÍ PEGA TUS DATOS REALES
const firebaseConfig = {
    apiKey: "AIzaSyCRKPgOcigKoABrUYdbmeKvYRQaqGc23pg",
    authDomain: "dawidawe-7ca36.firebaseapp.com",
    projectId: "dawidawe-7ca36",
    storageBucket: "dawidawe-7ca36.firebasestorage.app",
    messagingSenderId: "163285358778",
    appId: "1:163285358778:web:a25982c438093751a38a83",
    measurementId: "G-R9Y9ZT8D6J"
};

// Inicializamos Firebase y el servicio de Autenticación
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);