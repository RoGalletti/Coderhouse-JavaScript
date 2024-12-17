const nombreAlumnoInput = document.getElementById("nombreAlumno");
const agregarAlumnoBtn = document.getElementById("agregarAlumno");
const notasContenedor = document.getElementById("notas-contenedor");
const notasForm = document.getElementById("notasForm");
const calcularNotasBtn = document.getElementById("calcularNotas");
const resultadoDiv = document.getElementById("resultadoDiv");
const descargarPrograma = document.getElementById("descargarPrograma");

let alumnoActual = "";

function mostrarFormularioNotas() {
  notasForm.innerHTML = `
        <input type="number" id="nota1" placeholder="Nota 1">
        <input type="number" id="nota2" placeholder="Nota 2">
        <input type="number" id="nota3" placeholder="Nota 3">
    `;
  notasContenedor.style.display = "block";
}
agregarAlumnoBtn.onclick = function () {
  const nombreAlumno = nombreAlumnoInput.value.trim();

  if (nombreAlumno) {
    alumnoActual = nombreAlumno;
    mostrarFormularioNotas();
    nombreAlumnoInput.value = "";
  } else {
    alert("Por favor, ingresa un nombre de alumno.");
  }
};

calcularNotasBtn.onclick = function () {
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);

  if (!isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3)) {
    const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);

    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    alumnos.push({ nombre: alumnoActual, promedio: promedio });
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    console.log("alumnos:", alumnos);
    mostrarResultados();

    notasContenedor.style.display = "none";
    notasForm.innerHTML = "";
  } else {
    alert("Por favor, ingresa todas las notas.");
  }
};

function mostrarResultados() {
  const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

  resultadoDiv.innerHTML = "<h2>Alumnos y sus notas finales</h2>";

  if (alumnos.length === 0) {
    resultadoDiv.innerHTML += "<p>No hay alumnos registrados.</p>";
    return;
  }

  alumnos.forEach((alumno) => {
    resultadoDiv.innerHTML += `<p>${alumno.nombre}: Nota final ${alumno.promedio}</p>`;
  });
}

descargarPrograma.onclick = function () {
  // URL del archivo a descargar (enlace de Google Drive)
  const programaURL =
    "https://drive.google.com/file/d/1jvZRxeWT-WyFrjFO8l4kbu0unMf9riK6/view?usp=drive_link";

  // Solicitud fetch para obtener el archivo
  fetch(programaURL)
    .then((response) => {
      // Verifica si la respuesta fue exitosa
      if (!response.ok) throw new Error("Error al descargar el archivo");

      // Convierte la respuesta en un archivo Blob (archivo binario)
      return response.blob();
    })
    .then((blob) => {
      // Crea una URL temporal a partir del Blob
      const urlBlob = window.URL.createObjectURL(blob);

      // Crea un elemento <a> temporal
      const link = document.createElement("a");
      link.href = urlBlob; // Asigna la URL del BLob
      link.download = "programa.pdf"; // Define el nombre del archivo a descargar

      // Agrega el enlace al DOM
      document.body.appendChild(link);
      // Simula un clic
      link.click();

      // Limpia el enlace y libera la memoria de la URL temporal
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlBlob);
    })
    .catch((error) =>
      // Maneja y muestra el error
      console.error("Error al descargar el archivo: ", error)
    );
};

document.addEventListener("DOMContentLoaded", mostrarResultados);
