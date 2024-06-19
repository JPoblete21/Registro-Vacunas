// Importamos las funciones necesarias desde firestore.js
import { save, checkNameExists } from './firestore.js';

// Función para validar el formulario y guardar los datos en Firestore
const guardarRegistro = async () => {
    const nombre = document.getElementById('nombre').value;
    const run = document.getElementById('run').value;
    const edad = document.getElementById('edad').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const fecha_vacunacion = document.getElementById('fecha_vacunacion').value;
    const tipo_vacuna = document.getElementById('tipo_vacuna').value;
    const centro_salud = document.getElementById('centro_salud').value;

    // Verificar si el nombre ya existe
    const nameExists = await checkNameExists(nombre);

    if (nameExists) {
        // Si el nombre ya existe, mostramos un mensaje de error con SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre ya está registrado.'
        });
    } else {
        // Si el nombre no existe, creamos el objeto persona con los datos del formulario
        const persona = {
            run,
            nombre,
            edad,
            sexo,
            fecha_vacunacion,
            tipo_vacuna,
            centro_salud
        };

        // Guardamos los datos en Firestore llamando a la función save de firestore.js
        save(persona);

        // Mostramos un mensaje de éxito con SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Registro guardado correctamente.'
        });

        // Limpiamos el formulario después de guardar
        document.querySelector('form').reset();
    }
};

// Escuchamos el evento 'click' del botón Guardar
document.getElementById('btnSave').addEventListener('click', async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    await guardarRegistro();
});
