// Declarar un array para almacenar los nombres de los amigos
let amigos = [];
let amigosSorteados = new Set();

let input = document.querySelector('#amigo');
let listaAmigos = document.querySelector('#listaAmigos');
let buttonDraw = document.querySelector('.button-draw');
let buttonReset = document.querySelector('.button-reset');
let resultado = document.querySelector('#resultado');

let regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+){0,4}$/;

// Agrega un amigo a la lista si cumple con las validaciones
function agregarAmigo() {
    let nombre = input.value.trim();

    if (!regex.test(nombre)) {
        alert('Por favor, inserte un nombre válido');
        return;
    }

    if (amigos.includes(nombre)) {
        alert('El nombre ya se encuentra en la lista');
        return;
    }

    amigos.push(nombre);
    limpiarCaja();
    actualizarListaAmigos();
    habilitarBotones();
}

// Habilita los botones de sorteo y reinicio
function habilitarBotones() {
    buttonDraw.removeAttribute('disabled');
    buttonReset.removeAttribute('disabled');
}

// Deshabilita los botones de sorteo y reinicio
function deshabilitarBotones() {
    buttonDraw.setAttribute('disabled', true);
    buttonReset.setAttribute('disabled', true);
}

deshabilitarBotones();

// Limpia el campo de entrada
function limpiarCaja() {
    input.value = '';
}

// Actualiza la lista de amigos en la interfaz
function actualizarListaAmigos() {
    listaAmigos.innerHTML = '';
    let fragmento = document.createDocumentFragment();

    amigos.forEach((nombre, index) => {
        let li = document.createElement('li');
        li.textContent = nombre;
        li.classList.add(amigosSorteados.has(index) ? 'elegido' : 'elegible');
        fragmento.appendChild(li);
    });

    listaAmigos.appendChild(fragmento);
}

// Sortea un amigo al azar de la lista de amigos no sorteados
function sortearAmigo() {
    resultado.innerHTML = '';

    if (amigos.length === 0) {
        alert('Lista de amigos vacía');
        return;
    }

    if (amigosSorteados.size === amigos.length) {
        buttonDraw.setAttribute('disabled', true);
        alert('Todos los nombres fueron sorteados');
        return;
    }

    let index;
    do {
        index = Math.floor(Math.random() * amigos.length);
    } while (amigosSorteados.has(index));

    amigosSorteados.add(index);
    actualizarListaAmigos();
    resultado.innerHTML = `<li>El amigo secreto sorteado es: <span>${amigos[index]}</span></li>`;
}

// Reinicia la lista de amigos y el estado de la aplicación
function reset() {
    amigos = [];
    amigosSorteados = new Set();
    listaAmigos.innerHTML = '';
    resultado.innerHTML = '';
    deshabilitarBotones();
}