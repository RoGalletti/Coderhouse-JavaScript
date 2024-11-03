let alumnos = [];

document.getElementById("agregarAlumno").onclick = function() {
    let nombreAlumno = document.getElementById('nombreAlumno').value;
    if (nombreAlumno) {
        alumnos.push({ nombre: nombreAlumno, notaFinal: 0 });
        document.getElementById("nombreAlumno").value = ""; // Limpiar el input
        if (!confirm("¿Desea agregar otro alumno?")) {
            mostrarFormularioNotas();
        }
    } else {
        alert("Por favor, ingrese un nombre válido.");
    }
};

function mostrarFormularioNotas() {
    document.getElementById("notas-contenedor").style.display = "block";
    const notasForm = document.getElementById("notasForm");
    notasForm.innerHTML = " "; // Limpiar el contenedor

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

document.getElementById("calcularNotas").onclick = function() {
    const notasInputs = document.querySelectorAll(".nota");
    for (let i = 0; i < notasInputs.length; i += 3) {
        let notas = Array.from(notasInputs).slice(i, i + 3).map(input => parseFloat(input.value));
        if (notas.some(nota => isNaN(nota) || nota < 0 || nota > 10)) {
            alert(`Las notas deben estar entre 0 y 10.`);
            return;
        }
        alumnos[i / 3].notaFinal = (notas[0] + notas[1] + notas[2]) / 3;
    }
    mostrarResultados();
};

function mostrarResultados() {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h2>Resultados Finales</h2>";
    alumnos.forEach(alumno => {
        resultadoDiv.innerHTML += `<p>${alumno.nombre}: ${alumno.notaFinal.toFixed(2)}</p>`;
    });
}

