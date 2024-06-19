// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Documentación
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvF04hOEA9uprmoQ3iooGfLhIquSaN6lg",
    authDomain: "registro-de-vacunas-l-a.firebaseapp.com",
    projectId: "registro-de-vacunas-l-a",
    storageBucket: "registro-de-vacunas-l-a.appspot.com",
    messagingSenderId: "436459590807",
    appId: "1:436459590807:web:549f5faeaef1381f1845d2",
    measurementId: "G-WZ9P85YQJD"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Función de firestore que permite retornar la base de datos para su utilización
const db = getFirestore(app)

// Función para guardar los datos en firestore
export const save = (persona) => {
    // addDoc es la función de firestore que permite añadir un nuevo documento
    // collection es la función de firestore que permite traer la colección de la db
    addDoc(collection(db, 'Vacunados'), persona)
}

// Función que permite obtener la colección 
export const getData = (data) => {
    // onSnapshot permite retornar la colección y asignarla a la variable data 
    onSnapshot(collection(db, 'Vacunados'), data)
}

// Función remove, permite eliminar un registro según su id
export const remove = (id) => {
    // deleteDoc es una función de firestore que permite quitar un documento de la colección
    // doc es una función de firestore que permite buscar un documento por su id
    deleteDoc(doc(db, 'Vacunados', id))
}

// Función getDocumento nos permite obtener un documento según su id 
// getDoc permite traer un documento según su id y acceder a sus valores
export const getDocumento = (id) => getDoc(doc(db, 'Vacunados', id))

// Función update permite editar un documento
export const update = (id, persona) => {
    // updateDoc es una función de firestore que permite modificar un documento
    updateDoc(doc(db, 'Vacunados', id), persona)
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
