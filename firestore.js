// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "Tu-api-key",
    authDomain: "registro-de-vacunas-l-a.firebaseapp.com",
    projectId: "registro-de-vacunas-l-a",
    storageBucket: "registro-de-vacunas-l-a.appspot.com",
    messagingSenderId: "436459590807",
    appId: "1:436459590807:web:549f5faeaef1381f1845d2",
    measurementId: "G-WZ9P85YQJD"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Función para guardar los datos en firestore
export const save = async (persona) => {
    // Verificar si el nombre ya existe
    const nameExists = await checkNameExists(persona.nombre);

    if (nameExists) {
        throw new Error('El nombre ya está registrado.');
    } else {
        // addDoc es la función de firestore que permite añadir un nuevo documento
        // collection es la función de firestore que permite traer la colección de la db
        await addDoc(collection(db, 'Vacunados'), persona);
    }
}

// Función para verificar si un nombre ya existe en la colección
export const checkNameExists = async (nombre) => {
    const querySnapshot = await getDocs(collection(db, 'Vacunados'));
    let exists = false;
    querySnapshot.forEach((doc) => {
        if (doc.data().nombre === nombre) {
            exists = true;
        }
    });
    return exists;
};

// Otras funciones como getData, remove, getDocumento, update siguen siendo las mismas

