
    // Función para hacer una solicitud GET a la API Mock para listar registros.
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

    // Función para mostrar una lista de registros en el elemento con ID "results".
    function mostrarResultados(registros) {
        let resultsElement = document.getElementById('results');
        resultsElement.innerHTML = '';

        registros.forEach(registro => {
            let listItem = document.createElement('li');
            listItem.textContent = `ID: ${registro.id}, Nombre: ${registro.name}, Apellido: ${registro.lastname}`;
            resultsElement.appendChild(listItem);
        });
    }

    // Función para mostrar un solo registro en el elemento con ID "results".
    function mostrarResultado(registro) {
        let resultsElement = document.getElementById('results');
        resultsElement.innerHTML = `ID: ${registro.id}, Nombre: ${registro.name}, Apellido: ${registro.lastname}`;
    }

    // Función para mostrar un mensaje de error en el elemento con ID "alert-error".
    function mostrarError(mensaje) {
        let alertError = document.getElementById('alert-error');
        alertError.textContent = mensaje;
        alertError.classList.remove('fade');
    }

    // Event listener para el botón "Buscar".
    document.getElementById('btnGet1').addEventListener('click', () => {
        listarRegistros();
    });