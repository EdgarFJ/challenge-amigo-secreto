// Declarar un array para almacenar los nombres de los amigos
let amigos = [];

// Declarar una función para agregar un amigo al array
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim();
    
    if (nombre && !amigos.includes(nombre)) {
        amigos.push(nombre);
        console.log(`${nombre} ha sido agregado a la lista.`);
        input.value = "";
    } else {
        console.log("El nombre está vacío o ya está en la lista.");
    }
}