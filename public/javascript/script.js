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
                <a href="https://api.whatsapp.com/send?phone=59894090711&text=Hola,%20estoy%20interesado%20en%20comprar%20${encodeURIComponent(libro.titulo)}%20de%20${encodeURIComponent(libro.autor)}." target="_blank">Pedir</a>
            `;
            container.appendChild(resultado);
        });
    }
}


// Cargar la base de datos y configurar la funcionalidad
cargarBaseDeDatos();
// BUSCADOR







document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closeBtn');
  
    closeBtn.addEventListener('click', function () {
      overlay.style.display = 'none';
    });
  
    // Mostrar la ventana emergente después de un tiempo determinado (por ejemplo, 3 segundos)
    setTimeout(function () {
      overlay.style.display = 'flex';
    }, 0);
  });






  document.addEventListener('DOMContentLoaded', function() {
    let contador = localStorage.getItem('visitas');
  
    if (contador === null) {
      contador = 0;
    } else {
      contador = parseInt(contador);
    }
  
    document.getElementById('contador').textContent = contador;
  
    contador++;
  
    localStorage.setItem('visitas', contador.toString());
  });
  














