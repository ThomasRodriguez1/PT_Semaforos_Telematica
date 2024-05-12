document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'http://localhost:3000/getCiclosSemaforos';  
    //setInterval(() => fetchData(apiUrl), 1000); // Llama a fetchData cada segundo
});


let nCiclo = 0; // Inicia el contador de ciclos
let valorConstante = 0; // Inicia el valor constante
let valorVariable = 0; // Inicia el valor variable

// Función para calcular el tiempo en el ciclo actual y los ciclos pasados
function calcularTiempoCiclo(timestampApi, cicloMilisegundos) {
    const ahora = new Date();
    const inicioCiclo = new Date(timestampApi);
    const diferencia = ahora.getTime() - inicioCiclo.getTime();
    const ciclosPasados = Math.floor(diferencia / cicloMilisegundos);
    const tiempoEnCicloActual = diferencia % cicloMilisegundos;

    document.getElementById('nCiclo').innerText = `Número de Ciclo: ${ciclosPasados}`;
    document.getElementById('nTiempo').innerText = `Número de tiempo_actual: ${tiempoEnCicloActual}`;
    return tiempoEnCicloActual;
}

// Función para actualizar las variables y la UI
function actualizarValores(cicloMilisegundos, tiempoEnCicloActual) {
    const SEGUNDOS_PARA_ACTUALIZAR = 25000; // 25 segundos

    if (tiempoEnCicloActual <= SEGUNDOS_PARA_ACTUALIZAR) {
        valorConstante = cicloMilisegundos;
    }
    valorVariable = cicloMilisegundos;

    document.getElementById('valorConstante').innerText = `Valor Constante: ${valorConstante}`;
    document.getElementById('valorVariable').innerText = `Valor Variable: ${valorVariable}`;
}

// Función para hacer la solicitud a la API y manejar la respuesta
async function fetchData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    document.getElementById('timestamp').innerText = `Timestamp: ${data.timestamp}`;
    document.getElementById('cycle').innerText = `Ciclo: ${data.cicloMilisegundos}`;
    const tiempoEnCicloActual = calcularTiempoCiclo(data.timestamp, data.cicloMilisegundos);
    actualizarValores(data.cicloMilisegundos, tiempoEnCicloActual);
    //updateTrafficLights(data.cicloMilisegundos, tiempoEnCicloActual);
}

function updateTrafficLights(cicloMilisegundos, tiempoEnCicloActual) {
    updateTrafficLight(cicloMilisegundos, tiempoEnCicloActual, 'SV2-1', 'info-SV2-1');
    updateFourLightTrafficLight(cicloMilisegundos, tiempoEnCicloActual, 'SV4-1', 'info-SV4-1');
    updatePedestrianLight(cicloMilisegundos, tiempoEnCicloActual, 'SP1', 'info-SP1');
}

function updateTrafficLight(cicloMilisegundos, tiempoEnCicloActual, semaforoId, estadoId) {
    const verdeDuracion = cicloMilisegundos * 0.50; // 50% del ciclo
    const rojoDuracion = cicloMilisegundos * 0.30; // 30% del ciclo
    const amarilloDuracion = cicloMilisegundos * 0.20; // 20% del ciclo

    const semaforo = document.getElementById(semaforoId);
    const redLight = semaforo.querySelector('.red');
    const yellowLight = semaforo.querySelector('.yellow');
    const greenLight = semaforo.querySelector('.green');
    const estadoSemaforo = document.getElementById(estadoId);

    if (tiempoEnCicloActual <= verdeDuracion) {
        greenLight.style.backgroundColor = '#2ECC40'; // Verde
        redLight.style.backgroundColor = '#ddd';
        yellowLight.style.backgroundColor = '#ddd';
        estadoSemaforo.innerText = 'Estado Actual: Verde';
    } else if (tiempoEnCicloActual <= verdeDuracion + rojoDuracion) {
        redLight.style.backgroundColor = '#FF4136'; // Rojo
        greenLight.style.backgroundColor = '#ddd';
        yellowLight.style.backgroundColor = '#ddd';
        estadoSemaforo.innerText = 'Estado Actual: Rojo';
    } else {
        yellowLight.style.backgroundColor = '#FFDC00'; // Amarillo
        redLight.style.backgroundColor = '#ddd';
        greenLight.style.backgroundColor = '#ddd';
        estadoSemaforo.innerText = 'Estado Actual: Amarillo';
    }
}

function updateFourLightTrafficLight(cicloMilisegundos, tiempoEnCicloActual, semaforoId, estadoId) {
    const verdeDuracion = cicloMilisegundos * 0.50; // 50% del ciclo
    const rojoDuracion = cicloMilisegundos * 0.30; // 30% del ciclo
    const amarilloDuracion = cicloMilisegundos * 0.20; // 20% del ciclo

    const semaforo = document.getElementById(semaforoId);
    const redLight = semaforo.querySelector('.red');
    const yellowLights = semaforo.querySelectorAll('.yellow');
    const greenLights = semaforo.querySelectorAll('.green');
    const estadoSemaforo = document.getElementById(estadoId);

    if (tiempoEnCicloActual <= verdeDuracion) {
        greenLights.forEach(light => light.style.backgroundColor = '#2ECC40'); // Verde
        redLight.style.backgroundColor = '#ddd';
        yellowLights.forEach(light => light.style.backgroundColor = '#ddd');
        estadoSemaforo.innerText = 'Estado Actual: Verde';
    } else if (tiempoEnCicloActual <= verdeDuracion + rojoDuracion) {
        redLight.style.backgroundColor = '#FF4136'; // Rojo
        greenLights.forEach(light => light.style.backgroundColor = '#ddd');
        yellowLights.forEach(light => light.style.backgroundColor = '#ddd');
        estadoSemaforo.innerText = 'Estado Actual: Rojo';
    } else {
        yellowLights.forEach(light => light.style.backgroundColor = '#FFDC00'); // Amarillo
        redLight.style.backgroundColor = '#ddd';
        greenLights.forEach(light => light.style.backgroundColor = '#ddd');
        estadoSemaforo.innerText = 'Estado Actual: Amarillo';
    }
}

function updatePedestrianLight(cicloMilisegundos, tiempoEnCicloActual, semaforoId, estadoId) {
    const verdeDuracion = cicloMilisegundos * 0.50; // Verde 50% del ciclo
    const rojoDuracion = cicloMilisegundos - verdeDuracion; // Rojo el resto del ciclo

    const semaforo = document.getElementById(semaforoId);
    const redLight = semaforo.querySelector('.red');
    const greenLight = semaforo.querySelector('.green');
    const estadoSemaforo = document.getElementById(estadoId);

    if (tiempoEnCicloActual <= verdeDuracion) {
        greenLight.style.backgroundColor = '#2ECC40'; // Verde
        redLight.style.backgroundColor = '#ddd';
        estadoSemaforo.innerText = 'Estado Actual: Caminar';
    } else {
        redLight.style.backgroundColor = '#FF4136'; // Rojo
        greenLight.style.backgroundColor = '#ddd';
        estadoSemaforo.innerText = 'Estado Actual: Detenerse';
    }
}



