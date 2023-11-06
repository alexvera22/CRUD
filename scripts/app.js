 // Función para hacer una solicitud GET a la API Mock para listar todos los registros o uno específico.
 function listarRegistros(id) {
    let url = id ? `https://65482f3add8ebcd4ab229fd7.mockapi.io/users` : 'https://65482f3add8ebcd4ab229fd7.mockapi.io/users';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                // Si es una lista, mostrar todos los registros.
                mostrarResultados(data);
            } else {
                // Si es un solo registro, mostrarlo.
                mostrarResultado(data);
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
    let id = document.getElementById('inputGet1Id').value;
    listarRegistros(id);
});