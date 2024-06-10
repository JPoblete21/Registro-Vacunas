// se importa la función para guardar los datos
import { getData, getDocumento, remove, save, update } from './firestore.js'

// id para guardar el id del documento
let id = 0

// addEventListener permite activar el elemento según un evento(click)
document.getElementById('btnSave').addEventListener('click', (event) => {
    event.preventDefault()
    
    // validamos que los campos no sean vacíos
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const persona = {
            run: document.getElementById('run').value,
            nombre: document.getElementById('nombre').value,
            edad: document.getElementById('edad').value,
            sexo: document.querySelector('input[name="sexo"]:checked').value,
            fecha_vacunacion: document.getElementById('fecha_vacunacion').value,
            tipo_vacuna: document.getElementById('tipo_vacuna').value,
            centro_salud: document.getElementById('centro_salud').value
        }
        
        if (id == 0) {
            // función que permite el guardado de datos
            save(persona)
            Swal.fire('Guardado', '', 'success')
        } else {
            // permite editar los datos si el id es diferente de 0
            update(id, persona)
            Swal.fire('Actualizado', '', 'success')
        }
        
        id = 0
        limpiar()
    }
})

// DOMContentLoaded es un evento que se ejecuta cuando se recarga la página
window.addEventListener('DOMContentLoaded', () => {
    // getData función que trae la colección
    getData((datos) => {
        let tabla = ''
        // recorremos la colección y creamos el objeto persona que trae cada documento
        datos.forEach((persona) => {
            // persona.data() trae los datos de cada documento
            const item = persona.data()
            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nombre}</td>
                <td>${item.edad}</td>
                <td>${item.sexo}</td>
                <td>${item.fecha_vacunacion}</td>
                <td>${item.tipo_vacuna}</td>
                <td>${item.centro_salud}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${persona.id}">Editar</button>
                    <button class="btn btn-danger" id="${persona.id}">Eliminar</button>
                </td>
            </tr>`
        })
        
        document.getElementById('contenido').innerHTML = tabla
        
        // eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            // verificamos cual es el botón presionado
            btn.addEventListener('click', () => {
                // sweetalert que permite confirmación
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    // presiono el botón eliminar
                    if (result.isConfirmed) {
                        // función eliminar
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        
        // seleccionar
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                // invocar función que permite buscar el documento por id
                const doc = await getDocumento(btn.id)
                // asignar los valores del documento
                const persona = doc.data()

                document.getElementById('run').value = persona.run
                document.getElementById('nombre').value = persona.nombre
                document.getElementById('edad').value = persona.edad
                document.querySelector(`input[name="sexo"][value="${persona.sexo}"]`).checked = true
                document.getElementById('fecha_vacunacion').value = persona.fecha_vacunacion
                document.getElementById('tipo_vacuna').value = persona.tipo_vacuna
                document.getElementById('centro_salud').value = persona.centro_salud

                // asignamos el id del documento a la variable
                id = doc.id
                
                // run solo lectura
                document.getElementById('run').readOnly = true
                // btn cambie el valor a editar
                document.getElementById('btnSave').value = 'Editar'
            })
        })

    })
})

