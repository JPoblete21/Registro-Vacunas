import { save, checkNameExists } from './firestore.js';

document.getElementById('btnSave').addEventListener('click', async (e) => {
    e.preventDefault();
    
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
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre ya está registrado.'
        });
    } else {
        const persona = {
            run,
            nombre,
            edad,
            sexo,
            fecha_vacunacion,
            tipo_vacuna,
            centro_salud
        };

        save(persona);

        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Registro guardado correctamente.'
        });

        // Limpiar el formulario después de guardar
        document.querySelector('form').reset();
    }
});

