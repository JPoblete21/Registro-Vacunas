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

    try {
        // Verificar si el nombre ya existe
        const nameExists = await checkNameExists(nombre);

        if (nameExists) {
            throw new Error('El nombre ya está registrado.');
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

            await save(persona);

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Registro guardado correctamente.'
            });

            // Limpiar el formulario después de guardar
            document.querySelector('form').reset();
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        });
    }
});

const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('run').readOnly = false
    document.getElementById('btnSave').value = 'Guardar'
}

const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        
        if (id == 'run') {
            if (!validaRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        }
        
        // Resto de las validaciones (email, fecha, teléfono) permanecen igual según tu implementación original
    }
}

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true
    return false
}

const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    if (!formato.test(email))
        return false
    return true
}

const calcularFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}
