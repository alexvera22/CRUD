
    // Función para hacer una solicitud GET a la API Mock para listar registros
    function listarRegistros() {
        let id = document.getElementById('inputGet1Id').value;

        let url = id ? `https://65482f3add8ebcd4ab229fd7.mockapi.io/users/${id}` : 'https://65482f3add8ebcd4ab229fd7.mockapi.io/users';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    mostrarResultados(data);
                } else if (data.id) {
                    mostrarResultado(data);
                } else {
                    mostrarError('Registro no encontrado.');
                }
            })
            .catch(error => {
                mostrarError('Ocurrió un error al realizar la solicitud.');
            });
    }

    // Función para mostrar una lista de registros en el elemento con ID "results"
    function mostrarResultados(registros) {
        let resultsElement = document.getElementById('results');
        resultsElement.innerHTML = '';

        registros.forEach(registro => {
            let listItem = document.createElement('li');
            listItem.textContent = `ID: ${registro.id}, Nombre: ${registro.name}, Apellido: ${registro.lastname}`;
            resultsElement.appendChild(listItem);
        });
    }

    // Función para mostrar un solo registro en el elemento con ID "results"
    function mostrarResultado(registro) {
        let resultsElement = document.getElementById('results');
        resultsElement.innerHTML = `ID: ${registro.id}, Nombre: ${registro.name}, Apellido: ${registro.lastname}`;
    }
    function agregarRegistro() {
        const nombre = document.getElementById('inputPostNombre').value;
        const apellido = document.getElementById('inputPostApellido').value;
    
        if (nombre && apellido) {
            const nuevoRegistro = {
                name: nombre,
                lastname: apellido
            };
    
            fetch('https://65482f3add8ebcd4ab229fd7.mockapi.io/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoRegistro)
            })
            .then(response => response.json())
            .then(data => {
                listarRegistros(); // Actualiza la lista después de agregar un registro
            })
            .catch(error => {
                mostrarError('Ocurrió un error al agregar el registro.');
            });
        } else {
            mostrarError('Por favor, complete los campos de nombre y apellido.');
        }
    }
    function habilitarBotonAgregar() {
        const nombre = document.getElementById('inputPostNombre').value;
        const apellido = document.getElementById('inputPostApellido').value;
        const btnPost = document.getElementById('btnPost');
        btnPost.disabled = !(nombre && apellido);
    }
    // Función para mostrar un mensaje de error en el elemento con ID "alert-error"
    function mostrarError(mensaje) {
        let alertError = document.getElementById('alert-error');
        alertError.textContent = mensaje;
        alertError.classList.remove('fade');
    }

    // Evento para el botón "Buscar"
    document.getElementById('btnGet1').addEventListener('click', () => {
        listarRegistros();
    });

    // Event listener para habilitar/deshabilitar el botón "Agregar" cuando se ingresan datos
    document.getElementById('inputPostNombre').addEventListener('input', habilitarBotonAgregar);
    document.getElementById('inputPostApellido').addEventListener('input', habilitarBotonAgregar);

    //Evento para el botón "Agregar"
    document.getElementById('btnPost').addEventListener('click', () =>{
     agregarRegistro();
    });

// Evento para el botón "Modificar" para que funcione al darle click
document.getElementById('btnPut').addEventListener('click', () => {
    // Obtenemos el ID del registro a modificar
    const id = document.getElementById('inputPutId').value;

    // Realiza una solicitud a la API Mock para obtener los datos del registro
    fetch(`https://65482f3add8ebcd4ab229fd7.mockapi.io/users/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                // Rellenamos los campos del modal con los valores del registro
                document.getElementById('inputPutNombre').value = data.name;
                document.getElementById('inputPutApellido').value = data.lastname;

                // Habilitamos el botón "Guardar Cambios" para que queda activo para guardar
                document.getElementById('btnSendChanges').removeAttribute('disabled');

                // Muestra el modal de Bootstrap que ya esta incluido en el html
                const dataModal = new bootstrap.Modal(document.getElementById('dataModal'));
                dataModal.show();
            } else {
                mostrarError('Registro no encontrado.');
            }
        })
        .catch(error => {
            mostrarError('Ocurrió un error al obtener el registro.');
        });
});

// Event listener para habilitar/deshabilitar el botón "Modificar" cuando se ingresa un ID esto va a hacer que el boton modificar quede habilitado
document.getElementById('inputPutId').addEventListener('input', habilitarBotonModificar);

function habilitarBotonModificar() {
    const id = document.getElementById('inputPutId').value;
    const btnModificar = document.getElementById('btnPut');
    btnModificar.disabled = id === '';
}
// Llama a la función para habilitar o deshabilitar el botón "Modificar" al cargar la página
habilitarBotonModificar();

//Acá hacemos un event listener para el botón guardar que al darle click envíe los datos actualizados a la api
document.getElementById('btnSendChanges').addEventListener('click', () => {
    // Obtiene el ID del registro a modificar
    const id = document.getElementById('inputPutId').value;

    // Obtiene los nuevos valores de "Nombre" y "Apellido" del modal
    const nuevoNombre = document.getElementById('inputPutNombre').value;
    const nuevoApellido = document.getElementById('inputPutApellido').value;

    // Realiza la solicitud PUT para actualizar el registro
    fetch(`https://65482f3add8ebcd4ab229fd7.mockapi.io/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nuevoNombre, lastname: nuevoApellido })
    })
    .then(response => response.json())
    .then(data => {
        // Actualiza la lista de registros
        listarRegistros();

        // Cierra el modal para que se pueda seguir interactuando con la pagina
        const modalElement = document.getElementById('dataModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    })
    .catch(error => {
        mostrarError('Ocurrió un error al guardar los cambios.');
    });
});

//lo mismo para el botón "Borrar"
document.getElementById('btnDelete').addEventListener('click', () => {
    
    const id = document.getElementById('inputDelete').value;
    // Realiza la solicitud DELETE para eliminar el registro
    fetch(`https://65482f3add8ebcd4ab229fd7.mockapi.io/users/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 200) {
            // Actualiza la lista de registros después de eliminar
            listarRegistros();
        } else {
            mostrarError('Ocurrió un error al eliminar el registro.');
        }
    })
    .catch(error => {
        mostrarError('Ocurrió un error al eliminar el registro.');
    });
});

//Acá hacemos lo mismo que con el botón de modificar para que se habilite cuando ingresamos una
document.getElementById('inputDelete').addEventListener('input', habilitarBotonBorrar);

function habilitarBotonBorrar() {
    const id = document.getElementById('inputDelete').value;
    const btnBorrar = document.getElementById('btnDelete');
    btnBorrar.disabled = id === '';
}

