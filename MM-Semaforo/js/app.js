document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'http://localhost:3000/getCiclosSemaforos';
    setInterval(() => fetchData(apiUrl), 1000); // Llama a fetchData cada segundo
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
    updateTrafficLights(data.cicloMilisegundos, tiempoEnCicloActual);
}

function updateTrafficLights(cicloMilisegundos, tiempoEnCicloActual) {
    
    var semaforoId=['SP1','SP3','SP4','SP5','SP7','SP8']; 
    semaforoId.forEach(function(id) {
        comportamiento_1(cicloMilisegundos, tiempoEnCicloActual, id);
    });

    comportamiento_2(cicloMilisegundos, tiempoEnCicloActual, 'SP2');
    comportamiento_3(cicloMilisegundos, tiempoEnCicloActual, 'SP6');

    var semaforoVId=['SV3','SV4']; 
    semaforoVId.forEach(function(id2) {
        comportamiento_4(cicloMilisegundos, tiempoEnCicloActual, id2);
    });

    comportamiento_5(cicloMilisegundos, tiempoEnCicloActual, 'SV1');
    comportamiento_6(cicloMilisegundos, tiempoEnCicloActual, 'SV2');
}


function comportamiento_1(cicloMilisegundos, tiempoEnCicloActual, semaforoId) {
    const verdeDuracion = cicloMilisegundos * 0.83; // saque el porcentaje de duracion en rojo
    const rojoDuracion = cicloMilisegundos - verdeDuracion; // Rojo el resto del ciclo

    //const semaforo = document.getElementById(semaforoId);
    const semaforo = document.querySelectorAll('#'+ semaforoId);

    semaforo.forEach(function(semaforo) {
        const redLight = semaforo.querySelector('.red');
        const greenLight = semaforo.querySelector('.green');

        if (tiempoEnCicloActual <= verdeDuracion) {
            redLight.style.backgroundColor = '#FF4136'; // Rojo
            greenLight.style.backgroundColor = '#ddd';
        } else {
            greenLight.style.backgroundColor = '#2ECC40'; // Verde
            redLight.style.backgroundColor = '#ddd';
        }
    });
}

function comportamiento_2(cicloMilisegundos, tiempoEnCicloActual, SP2Id) {
    const verdeDuracion = cicloMilisegundos * 0.29;
    const rojoDuracion = cicloMilisegundos - verdeDuracion; // Rojo el resto del ciclo

    const semaforo = document.getElementById(SP2Id);
    const redLight = semaforo.querySelector('.red');
    const greenLight = semaforo.querySelector('.green');

    if (tiempoEnCicloActual <= verdeDuracion) {
        redLight.style.backgroundColor = '#FF4136'; // Rojo
        greenLight.style.backgroundColor = '#ddd';
    } else {
        greenLight.style.backgroundColor = '#2ECC40'; // Verde
        redLight.style.backgroundColor = '#ddd';
    }
}

function comportamiento_3(cicloMilisegundos, tiempoEnCicloActual, SP6Id) {
    const verdeDuracion = cicloMilisegundos * 0.41;
    const rojoDuracion = cicloMilisegundos - verdeDuracion; // Rojo el resto del ciclo

    const semaforo = document.getElementById(SP6Id);
    const redLight = semaforo.querySelector('.red');
    const greenLight = semaforo.querySelector('.green');

    if (tiempoEnCicloActual <= verdeDuracion) {
        redLight.style.backgroundColor = '#FF4136'; // Rojo
        greenLight.style.backgroundColor = '#ddd';
    } else {
        greenLight.style.backgroundColor = '#2ECC40'; // Verde
        redLight.style.backgroundColor = '#ddd';
    }
}


function comportamiento_4(cicloMilisegundos, tiempoEnCicloActual, semaforoVId) {
    const verdeDuracion = cicloMilisegundos * 0.40; // 50% del ciclo
    const rojoDuracion = cicloMilisegundos * 0.41; // 30% del ciclo
    const amarilloDuracion = cicloMilisegundos * 0.016; // 20% del ciclo

    //const semaforo = document.getElementById(semaforoId);
    const semaforo = document.querySelectorAll('#'+ semaforoVId);

    semaforo.forEach(function(semaforo) {
        const redLight = semaforo.querySelector('.red');
        const yellowLight = semaforo.querySelector('.yellow');
        const greenLight = semaforo.querySelector('.green');

        if (tiempoEnCicloActual <= rojoDuracion) {
            redLight.style.backgroundColor = '#FF4136'; // Rojo
            greenLight.style.backgroundColor = '#ddd';
            yellowLight.style.backgroundColor = '#ddd';
            //estadoSemaforo.innerText = 'Estado Actual: Rojo';
        } else if (tiempoEnCicloActual <= rojoDuracion + verdeDuracion && tiempoEnCicloActual>= rojoDuracion) {
            greenLight.style.backgroundColor = '#2ECC40'; // Verde
            redLight.style.backgroundColor = '#ddd';
            yellowLight.style.backgroundColor = '#ddd';
            //estadoSemaforo.innerText = 'Estado Actual: Verde';
        } else if (tiempoEnCicloActual <= rojoDuracion+verdeDuracion + amarilloDuracion && tiempoEnCicloActual>= rojoDuracion+verdeDuracion){
            yellowLight.style.backgroundColor = '#FFDC00'; // Amarillo
            redLight.style.backgroundColor = '#ddd';
            greenLight.style.backgroundColor = '#ddd';
            //estadoSemaforo.innerText = 'Estado Actual: Amarillo';
        }else{
            redLight.style.backgroundColor = '#FF4136'; // Rojo
            greenLight.style.backgroundColor = '#ddd';
            yellowLight.style.backgroundColor = '#ddd';
            //estadoSemaforo.innerText = 'Estado Actual: Rojo';
        }
    });

}

function comportamiento_5(cicloMilisegundos, tiempoEnCicloActual, SV1Id) {
    const verdeDuracion = cicloMilisegundos * 0.27; // 50% del ciclo
    const rojoDuracion = cicloMilisegundos * 0.70; // 30% del ciclo
    const amarilloDuracion = cicloMilisegundos * 0.016; // 20% del ciclo

    const semaforo = document.getElementById(SV1Id);
    const redLight = semaforo.querySelector('.red');
    const yellowLight = semaforo.querySelector('.yellow');
    const greenLight = semaforo.querySelector('.green');

    if (tiempoEnCicloActual <= verdeDuracion) {
        greenLight.style.backgroundColor = '#2ECC40'; // Verde
        redLight.style.backgroundColor = '#ddd';
        yellowLight.style.backgroundColor = '#ddd';
        //estadoSemaforo.innerText = 'Estado Actual: Verde';
    } else if (tiempoEnCicloActual <= verdeDuracion + amarilloDuracion && tiempoEnCicloActual >= verdeDuracion) {
        yellowLight.style.backgroundColor = '#FFDC00'; // Amarillo
        redLight.style.backgroundColor = '#ddd';
        greenLight.style.backgroundColor = '#ddd';
        //estadoSemaforo.innerText = 'Estado Actual: Amarillo';
    } else {
        redLight.style.backgroundColor = '#FF4136'; // Rojo
        greenLight.style.backgroundColor = '#ddd';
        yellowLight.style.backgroundColor = '#ddd';
        //estadoSemaforo.innerText = 'Estado Actual: Rojo';
    }
}

function comportamiento_6(cicloMilisegundos, tiempoEnCicloActual, semaforoId) {
    
       
    const verdeDuracion = cicloMilisegundos * 0.375; // 50% del ciclo
    const initverde2=cicloMilisegundos*0.2916;
    const amarilloDuracion = cicloMilisegundos * 0.01666; // 20% del ciclo
    const rojoDuracion = cicloMilisegundos * 0.58333; // 30% del ciclo
    

    const semaforo = document.getElementById(semaforoId);
    const redLight = semaforo.querySelector('.red');
    const yellowLights = semaforo.querySelectorAll('.yellow');
    const greenLight = semaforo.querySelectorAll('.green');
    const greenLight2=semaforo.querySelectorAll('.green-2');
    //const estadoSemaforo = document.getElementById(estadoId);


    if(tiempoEnCicloActual<initverde2){
        greenLight.style.backgroundColor='#2ECC40';
        redLight.style.backgroundColor='#ddd';
        yellowLights.style.backgroundColor='#ddd';
        greenLight2.style.backgroundColor='#ddd';

    }else if(tiempoEnCicloActual>=initverde2 && tiempoEnCicloActual<= verdeDuracion){


    }


    if (tiempoEnCicloActual <= verdeDuracion) {
        greenLight.forEach(light => light.style.backgroundColor = '#2ECC40'); // Verde
        redLight.style.backgroundColor = '#ddd';
        yellowLights.forEach(light => light.style.backgroundColor = '#ddd');
        //estadoSemaforo.innerText = 'Estado Actual: Verde';
    } else if (tiempoEnCicloActual <= verdeDuracion + rojoDuracion) {
        redLight.style.backgroundColor = '#FF4136'; // Rojo
        greenLight.forEach(light => light.style.backgroundColor = '#ddd');
        yellowLights.forEach(light => light.style.backgroundColor = '#ddd');
        //estadoSemaforo.innerText = 'Estado Actual: Rojo';
    } else {
        yellowLights.forEach(light => light.style.backgroundColor = '#FFDC00'); // Amarillo
        redLight.style.backgroundColor = '#ddd';
        greenLight.forEach(light => light.style.backgroundColor = '#ddd');
        //estadoSemaforo.innerText = 'Estado Actual: Amarillo';
    }
}

/*
function comportamiento_6(cicloMilisegundos, tiempoEnCicloActual, SV2Id) {
    const verdeDuracion = cicloMilisegundos * 0.40; // 50% del ciclo
    const rojoDuracion = cicloMilisegundos * 0.58; // 30% del ciclo
    const amarilloDuracion = cicloMilisegundos * 0.016; // 20% del ciclo

    const semaforo = document.getElementById(SV2Id);
    const redLight = semaforo.querySelector('.red');
    const yellowLight = semaforo.querySelector('.yellow');
    const greenLight = semaforo.querySelector('.green');
    const greenLight1 = semaforo.querySelector('.green-2');

    if (tiempoEnCicloActual <= verdeDuracion) {
        greenLight.style.backgroundColor = '#2ECC40'; // Verde 1
        greenLight1.style.backgroundColor = '#ddd'; // Verde 2
        redLight.style.backgroundColor = '#ddd';
        yellowLight.style.backgroundColor = '#ddd';

    } else if (tiempoEnCicloActual <= verdeDuracion + rojoDuracion) {
        redLight.style.backgroundColor = '#FF4136'; // Rojo
        greenLight.style.backgroundColor = '#ddd'; // Verde 1
        greenLight1.style.backgroundColor = '#ddd'; // Verde 2
        yellowLight.style.backgroundColor = '#ddd';
    } else {
        yellowLight.style.backgroundColor = '#FFDC00'; // Amarillo
        greenLight.style.backgroundColor = '#ddd'; // Verde 1
        greenLight1.style.backgroundColor = '#ddd'; // Verde 2
        redLight.style.backgroundColor = '#ddd';
    }
}*/



