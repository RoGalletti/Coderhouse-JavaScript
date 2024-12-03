
//let alumnos = [];

while(true){
    let nombreAlumno = prompt ("Ingrese el nombre del alumno");

    alumnos.push ({
        nombre: nombreAlumno,
        notaFinal: 0
    })

    let opcion = prompt ("Desea agregar otro alumno? \n 1- Si \n 2- No");

    if(opcion ==2 ){
        break;
    }
};

for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i]

    let nota1 = parseFloat(prompt(`Ingrese la primera nota de ${alumno.nombre}:`));
    let nota2 = parseFloat(prompt(`Ingrese la segunda nota de ${alumno.nombre}:`));
    let nota3 = parseFloat(prompt(`Ingrese la tercera nota de ${alumno.nombre}:`));

    
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 || nota3 < 0 || nota3 > 10) {
        console.log("Las notas de ${alumnos.nombre} deben estar entre 0 y 10.");
        i--;
        continue;
    }

    let notaFinal = (nota1 + nota2 + nota3) / 3;
    alumno.notaFinal = notaFinal;

    alumnos[i]= alumnos       
        
        
}








// 

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
    localStorage.setItem('alumnos', JSON.stingify(alumnos));
}r

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

-------------------------------------------------------------




const nombreAlumnoInput = document.getElementById("nombreAlumno");
const agregarAlumnoBtn = document.getElementById("agregarAlumno");
const notasContenedor = document.getElementById("notas-contenedor");
const notasForm = document.getElementById("notasForm");
const calculadoraNotasBtn = document.getElementById("calcularNotas");
const resultadoDiv = document.getElementById ("resultadoDiv");

let alumnoActual = "";

function mostrarFormularioNotas() {
    notasForm.innerHTML = `
        <input type="number" id="nota1" placeholder="Nota 1">
        <input type="number" id="nota2" placeholder="Nota 2">
        <input type="number" id="nota3" placeholder="Nota 3">
    `;    
    notasContenedor.style.display = "block";

}
agregarAlumnoBtn.onclick = function(){
    const nombreAlumno = nombreAlumnoInput.value.trim();

    if (nombreAlumno){
        alumnoActual = nombreAlumno;
        mostrarFormularioNotas();
        nombreAlumnoInput.value = "";

    }else{
        alert("Por favor, ingresa un nombre de alumno.");
    }
};

calcularNotasBtn.onclick = function(){
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);

    if(!isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3)) {
        const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);

        const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
        alumnos.push({nombre: alumnoActual, promedio: promedio});
        localStorage.setItem("alumnos", JSON.stringify(alumnos));

        mostrarResultados();

        notasContenedor.style.display = "none";
        notasForm.innerHTML = "";
    }else{
        alert("Por favor, ingresa todas las notas.");
    }

};

function mostrarResultados (){
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    
    resultadoDiv.innerHTML = "<h2>Alumnos y sus notas finales</h2>";

    if (alumnos.length === 0) {
        resultadoDiv.innerHTML += "<p>No hay alumnos registrados.</p>";
        return;
    }

    alumnos.forEach(alumno => {
        resultadoDiv.innerHTML += `<p>${alumno.nombre}: Nota final ${alumno.promedio}</p>`;
        
    });
}

document.addEventListener("DOMContentLoaded", mostrarResultados);
