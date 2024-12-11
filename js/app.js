import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicié la base de datos Firestore

// Referencias a los elementos del DOM
const nombreAlumnoInput = document.getElementById("nombreAlumno");
const agregarAlumnoBtn = document.getElementById("agregarAlumno");
const notasContenedor = document.getElementById("notas-contenedor");
const notasForm = document.getElementById("notasForm");
const calculadoraNotasBtn = document.getElementById("calcularNotas");
const resultadoDiv = document.getElementById("resultadoDiv");
const productosContenedor = document.getElementById("productos"); // Contenedor de productos

let alumnoActual = "";

// Función para mostrar el formulario de notas
function mostrarFormularioNotas() {
    // Crear los campos para las notas
    const nota1Input = document.createElement("input");
    nota1Input.type = "number";
    nota1Input.id = "nota1";
    nota1Input.placeholder = "Nota 1";
    
    const nota2Input = document.createElement("input");
    nota2Input.type = "number";
    nota2Input.id = "nota2";
    nota2Input.placeholder = "Nota 2";
    
    const nota3Input = document.createElement("input");
    nota3Input.type = "number";
    nota3Input.id = "nota3";
    nota3Input.placeholder = "Nota 3";
    
    // Limpiar el formulario anterior
    notasForm.innerHTML = "";
    
    // Agregar los inputs al formulario
    notasForm.appendChild(nota1Input);
    notasForm.appendChild(nota2Input);
    notasForm.appendChild(nota3Input);

    // Mostrar el contenedor de notas
    notasContenedor.style.display = "block";
}

// Función para agregar alumno y mostrar formulario de notas
agregarAlumnoBtn.onclick = function() {
    const nombreAlumno = nombreAlumnoInput.value.trim();

    if (nombreAlumno) {
        alumnoActual = nombreAlumno;
        mostrarFormularioNotas();
        nombreAlumnoInput.value = "";
    } else {
        alert("Por favor, ingresa un nombre de alumno.");
    }
};

// Función para calcular las notas y enviarlas a Firestore
calculadoraNotasBtn.onclick = async function() {
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);

    if (!isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3)) {
        const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);

        // Enviar datos del alumno a Firebase Firestore
        await enviarAlumno(alumnoActual, promedio);

        mostrarResultados();
        notasContenedor.style.display = "none";
        notasForm.innerHTML = "";
    } else {
        alert("Por favor, ingresa todas las notas.");
    }
};

// Función para enviar el alumno y su promedio a Firestore
async function enviarAlumno(nombre, promedio) {
    try {
        const docRef = await addDoc(collection(db, "alumnos"), {
            nombre: nombre,
            promedio: promedio
        });
        console.log("Alumno agregado con ID:", docRef.id);
    } catch (e) {
        console.error("Error al agregar alumno: ", e);
    }
}

// Función para mostrar los resultados desde Firestore
async function mostrarResultados() {
    try {
        const querySnapshot = await getDocs(collection(db, "alumnos"));
        
        // Limpiar el contenedor de resultados
        resultadoDiv.innerHTML = "<h2>Alumnos y sus notas finales</h2>";

        if (querySnapshot.empty) {
            resultadoDiv.innerHTML += "<p>No hay alumnos registrados.</p>";
            return;
        }

        querySnapshot.forEach(doc => {
            const alumno = doc.data();
            
            // Crear elementos dinámicamente
            const alumnoElement = document.createElement("p");
            alumnoElement.classList.add("alumno");  // Añadir clase para estilo si lo deseas
            
            // Usar innerText para insertar texto
            alumnoElement.innerText = `${alumno.nombre}: Nota final ${alumno.promedio}`;
            
            // Agregar el nuevo elemento al contenedor de resultados
            resultadoDiv.appendChild(alumnoElement);
        });
    } catch (error) {
        console.error("Error al recuperar los alumnos:", error);
        resultadoDiv.innerHTML = "<p>No se pudo cargar la lista de alumnos.</p>";
    }
}

// Función para obtener los productos de la Fake Store API
async function obtenerProductos() {
    try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos");
        }
        const productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

// Función para mostrar los productos en el HTML
function mostrarProductos(productos) {
    productosContenedor.innerHTML = ''; // Limpiar el contenedor de productos antes de mostrar nuevos
    productos.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('producto');
        productoElemento.innerHTML = `
            <h3>${producto.title}</h3>
            <img src="${producto.image}" alt="${producto.title}" width="150">
            <p>Precio: $${producto.price}</p>
            <p>${producto.description}</p>
        `;
        productosContenedor.appendChild(productoElemento);
    });
}

// Llamar a la función para obtener los productos cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    obtenerProductos();
    mostrarResultados();
});
