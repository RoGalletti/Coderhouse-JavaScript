// Función para obtener elementos por ID
function getById(id) {
    return document.getElementById(id);
}

// Cargar alumnos desde localStorage
function cargarAlumnos() {
    const alumnosJSON = localStorage.getItem('alumnos');
    return alumnosJSON ? JSON.parse(alumnosJSON) : [];
}

// Guardar alumnos en localStorage
function guardarAlumnos(alumnos) {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

// Mostrar alumnos en el formulario de notas
function mostrarAlumnos() {
    const alumnos = cargarAlumnos();
    const notasForm = getById('notasForm');
    notasForm.innerHTML = ''; // Limpiar formulario

    alumnos.forEach((alumno, index) => {
        notasForm.innerHTML += `
            <div>
                <label>${alumno.nombre}</label><br>
                <input type="number" min="0" max="10" placeholder="Nota 1" class="nota" data-index="${index}">
                <input type="number" min="0" max="10" placeholder="Nota 2" class="nota" data-index="${index}">
                <input type="number" min="0" max="10" placeholder="Nota 3" class="nota" data-index="${index}">
            </div>
        `;
    });
}

// Agregar alumno
getById('agregarAlumno').onclick = function() {
    const nombreAlumno = getById('nombreAlumno').value;
    if (nombreAlumno) {
        const alumnos = cargarAlumnos();
        alumnos.push({ nombre: nombreAlumno, notaFinal: 0 });
        guardarAlumnos(alumnos);
        getById('nombreAlumno').value = ''; // Limpiar campo
        mostrarAlumnos(); // Mostrar formulario de notas
        getById('notas-contenedor').style.display = 'block'; // Mostrar contenedor de notas
    } else {
        alert('Por favor, ingrese un nombre válido.');
    }
};

// Calcular notas
getById('calcularNotas').onclick = function() {
    const alumnos = cargarAlumnos();
    const notasInputs = document.querySelectorAll('.nota');
    const resultados = [];

    for (let i = 0; i < notasInputs.length; i += 3) {
        const index = notasInputs[i].dataset.index;
        const notas = [
            parseFloat(notasInputs[i].value),
            parseFloat(notasInputs[i + 1].value),
            parseFloat(notasInputs[i + 2].value)
        ];

        // Validar notas
        if (notas.some(nota => isNaN(nota) || nota < 0 || nota > 10)) {
            alert(`Las notas del alumno ${alumnos[index].nombre} deben estar entre 0 y 10.`);
            return;
        }

        const notaFinal = (notas[0] + notas[1] + notas[2]) / 3;
        alumnos[index].notaFinal = notaFinal; // Guardar nota final
        resultados.push(`${alumnos[index].nombre}: ${notaFinal.toFixed(2)}`); // Formatear resultado
    }

    guardarAlumnos(alumnos); // Actualizar almacenamiento
    mostrarResultados(resultados); // Mostrar resultados
};

// Mostrar resultados
function mostrarResultados(resultados) {
    const resultadoDiv = getById('resultado');
    resultadoDiv.innerHTML = '<h2>Resultados Finales</h2>';
    resultados.forEach(resultado => {
        resultadoDiv.innerHTML += `<p>${resultado}</p>`;
    });
}

// Cargar alumnos al iniciar
document.addEventListener('DOMContentLoaded', mostrarAlumnos);
