
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