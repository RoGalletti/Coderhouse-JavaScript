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