// ENCABEZADO
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});
// ENCABEZADO

// BUSCADOR
function cargarBaseDeDatos() {
    fetch('./json/data.json')
        .then(response => response.json())
        .then(data => {
            const searchInput = document.getElementById('search-input');
            const resultsContainer = document.querySelector('.results');
            let libros = data.libros; // Mantener un registro de los libros

            // Almacena el contenido original de .results
            const originalContent = resultsContainer.innerHTML;

            // Escuchar el evento 'input' en el campo de búsqueda
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                mostrarResultados(libros, query, resultsContainer, originalContent);
            });
        })
        .catch(error => {
            console.error('Error al cargar la base de datos:', error);
        });
}

// Función para mostrar los resultados de la búsqueda
function mostrarResultados(libros, query, container, originalContent) {
    if (query.trim() === '') {
        // Si la casilla de búsqueda está vacía, restaura el contenido original
        container.innerHTML = originalContent;
        return;
    }

    container.innerHTML = ''; // Limpiar resultados anteriores

    const resultadosFiltrados = libros.filter(libro => {
        const titulo = libro.titulo.toLowerCase();
        const autor = libro.autor.toLowerCase();
        const isbn = libro.isbn.toLowerCase();
        return titulo.includes(query) || autor.includes(query) || isbn.includes(query);
    });

    if (resultadosFiltrados.length === 0) {
        // Si no hay resultados, mostrar un mensaje indicando que no se encontraron libros
        container.innerHTML = '<p>No se encontraron libros.</p>';
    } else {
        resultadosFiltrados.forEach(libro => {
            const resultado = document.createElement('div');
            resultado.classList.add('resultado');
            resultado.innerHTML = `
                <h3>${libro.titulo}</h3>
                <img src="${libro.imagen}" alt="Portada del libro">
                <p class="autor">Autor: ${libro.autor}</p>
                <p class="isbn">ISBN: ${libro.isbn}</p>
                <a href="${libro.detalleUrl}"">Ver Más</a>
            `;
            container.appendChild(resultado);
        });
    }
}


// Cargar la base de datos y configurar la funcionalidad
cargarBaseDeDatos();
// BUSCADOR








