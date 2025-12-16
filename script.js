// ================================================
// SISTEMA DE QUIZ JAPONÉS - FUNCIONAL
// ================================================

// 1. BASE DE DATOS DE PALABRAS JAPONESAS
const palabrasJaponesas = [
    {
        japones: "こんにちは",
        romaji: "konnichiwa",
        opciones: ["Hola", "Adiós", "Gracias", "Por favor"],
        respuesta: 0
    },
    {
        japones: "ありがとう",
        romaji: "arigatou",
        opciones: ["Lo siento", "Gracias", "De nada", "Bienvenido"],
        respuesta: 1
    },
    {
        japones: "さようなら",
        romaji: "sayounara",
        opciones: ["Hola", "Adiós", "Bienvenido", "Gracias"],
        respuesta: 1
    },
    {
        japones: "すみません",
        romaji: "sumimasen",
        opciones: ["Disculpe", "Feliz", "Triste", "Enfadado"],
        respuesta: 0
    },
    {
        japones: "おはよう",
        romaji: "ohayou",
        opciones: ["Buenas noches", "Buenas tardes", "Buenos días", "Hasta luego"],
        respuesta: 2
    },
    {
        japones: "はい",
        romaji: "hai",
        opciones: ["No", "Sí", "Tal vez", "Nunca"],
        respuesta: 1
    },
    {
        japones: "いいえ",
        romaji: "iie",
        opciones: ["Sí", "No", "Quizás", "Siempre"],
        respuesta: 1
    },
    {
        japones: "お願いします",
        romaji: "onegaishimasu",
        opciones: ["Por favor", "De nada", "Lo siento", "Estoy bien"],
        respuesta: 0
    },
    {
        japones: "ごめんなさい",
        romaji: "gomennasai",
        opciones: ["Gracias", "Lo siento", "De nada", "Por favor"],
        respuesta: 1
    },
    {
        japones: "いただきます",
        romaji: "itadakimasu",
        opciones: ["Buen provecho", "Salud", "Gracias por la comida", "Delicioso"],
        respuesta: 2
    }
];

// 2. VARIABLES DEL QUIZ
let palabraActual = 0;
let aciertos = 0;
let errores = 0;
let puntaje = 0;
let puedeResponder = true;

// 3. ELEMENTOS DEL DOM
let inicioDiv, quizDiv, resultadosDiv;
let btnEmpezar, btnSiguiente, btnVolver, btnReiniciar;
let aciertosSpan, erroresSpan, puntajeSpan, palabraActualSpan;
let palabraJaponesDiv, romajiDiv, opcionesContainer, resultadoDiv;

// 4. INICIALIZAR CUANDO CARGA LA PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎌 Quiz Japonés cargado');
    
    // Encontrar elementos
    inicioDiv = document.getElementById('inicio');
    quizDiv = document.getElementById('quiz');
    resultadosDiv = document.getElementById('resultados-finales');
    
    // Botones
    btnEmpezar = document.getElementById('btn-empezar');
    btnSiguiente = document.getElementById('btn-siguiente');
    btnVolver = document.getElementById('btn-volver');
    btnReiniciar = document.getElementById('btn-reiniciar');
    
    // Contadores
    aciertosSpan = document.getElementById('aciertos');
    erroresSpan = document.getElementById('errores');
    puntajeSpan = document.getElementById('puntaje');
    palabraActualSpan = document.getElementById('palabra-actual');
    
    // Elementos del quiz
    palabraJaponesDiv = document.getElementById('palabra-japones');
    romajiDiv = document.getElementById('romaji');
    opcionesContainer = document.getElementById('opciones-container');
    resultadoDiv = document.getElementById('resultado');
    
    // 5. CONFIGURAR EVENTOS DE BOTONES
    btnEmpezar.addEventListener('click', empezarQuiz);
    btnSiguiente.addEventListener('click', siguientePalabra);
    btnVolver.addEventListener('click', volverAlInicio);
    btnReiniciar.addEventListener('click', reiniciarQuiz);
    
    // Botón de instrucciones
    document.getElementById('btn-instrucciones').addEventListener('click', function() {
        alert('🎮 CÓMO JUGAR:\n\n1. Se muestra una palabra japonesa\n2. Elige entre 4 opciones en español\n3. ¡Acierta para ganar puntos!\n4. Completa las 10 palabras\n\n🎯 Gana más puntos por aciertos consecutivos!');
    });
    
    // Botón compartir (simulado)
    document.getElementById('btn-compartir').addEventListener('click', function() {
        alert('¡Compartiría tu resultado en redes sociales!\n(En una app real, esto abriría Twitter/Facebook)');
    });
    
    console.log('✅ Todo listo para el quiz!');
});

// 6. FUNCIÓN PARA EMPEZAR EL QUIZ
function empezarQuiz() {
    console.log('🚀 Empezando quiz...');
    
    // Resetear variables
    palabraActual = 0;
    aciertos = 0;
    errores = 0;
    puntaje = 0;
    puedeResponder = true;
    
    // Actualizar contadores
    actualizarContadores();
    
    // Cambiar pantallas
    inicioDiv.style.display = 'none';
    quizDiv.style.display = 'block';
    resultadosDiv.style.display = 'none';
    
    // Mostrar primera palabra
    mostrarPalabra();
}

// 7. FUNCIÓN PARA MOSTRAR UNA PALABRA
function mostrarPalabra() {
    const palabra = palabrasJaponesas[palabraActual];
    
    // Mostrar palabra japonesa y romaji
    palabraJaponesDiv.textContent = palabra.japones;
    romajiDiv.textContent = `(${palabra.romaji})`;
    
    // Actualizar contador de palabra actual
    palabraActualSpan.textContent = `${palabraActual + 1}/${palabrasJaponesas.length}`;
    
    // Limpiar resultado anterior
    resultadoDiv.style.display = 'none';
    resultadoDiv.innerHTML = '';
    
    // Ocultar botón siguiente
    btnSiguiente.style.display = 'none';
    
    // Preparar opciones
    prepararOpciones(palabra);
    
    // Permitir responder
    puedeResponder = true;
}

// 8. FUNCIÓN PARA PREPARAR OPCIONES (MEZCLARLAS)
function prepararOpciones(palabra) {
    // Limpiar contenedor
    opcionesContainer.innerHTML = '';
    
    // Crear copia de opciones y mezclar
    let opcionesMezcladas = [...palabra.opciones];
    
    // Algoritmo de mezcla (Fisher-Yates)
    for (let i = opcionesMezcladas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [opcionesMezcladas[i], opcionesMezcladas[j]] = [opcionesMezcladas[j], opcionesMezcladas[i]];
    }
    
    // Encontrar nueva posición de respuesta correcta
    const nuevaPosicionCorrecta = opcionesMezcladas.indexOf(palabra.opciones[palabra.respuesta]);
    
    // Crear botones de opciones
    opcionesMezcladas.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.className = 'opcion-btn';
        boton.textContent = opcion;
        
        // Asignar evento click
        boton.addEventListener('click', function() {
            verificarRespuesta(index, nuevaPosicionCorrecta);
        });
        
        opcionesContainer.appendChild(boton);
    });
}

// 9. FUNCIÓN PARA VERIFICAR RESPUESTA
function verificarRespuesta(opcionSeleccionada, posicionCorrecta) {
    if (!puedeResponder) return;
    
    const palabra = palabrasJaponesas[palabraActual];
    const botonesOpciones = document.querySelectorAll('.opcion-btn');
    const esCorrecta = (opcionSeleccionada === posicionCorrecta);
    
    // Marcar opciones correctas/incorrectas
    botonesOpciones.forEach((boton, index) => {
        boton.disabled = true;
        
        if (index === posicionCorrecta) {
            boton.classList.add('correcta');
        } else if (index === opcionSeleccionada && !esCorrecta) {
            boton.classList.add('incorrecta');
        }
    });
    
    // Mostrar resultado
    resultadoDiv.style.display = 'block';
    
    if (esCorrecta) {
        // ¡CORRECTO!
        resultadoDiv.innerHTML = `
            <div style="color: #4CAF50; font-weight: bold; font-size: 1.5rem;">
                ✅ ¡CORRECTO!
            </div>
            <div style="margin-top: 10px;">
                <strong>${palabra.japones}</strong> (${palabra.romaji}) significa:<br>
                <strong style="color: #4CAF50;">"${palabra.opciones[palabra.respuesta]}"</strong>
            </div>
        `;
        
        // Actualizar estadísticas
        aciertos++;
        puntaje += 100; // 100 puntos por acierto
        
        // Bonus por aciertos consecutivos
        if (aciertos > 1) {
            puntaje += 50; // Bonus extra
        }
        
    } else {
        // INCORRECTO
        resultadoDiv.innerHTML = `
            <div style="color: #f44336; font-weight: bold; font-size: 1.5rem;">
                ❌ INCORRECTO
            </div>
            <div style="margin-top: 10px;">
                <strong>${palabra.japones}</strong> (${palabra.romaji}) significa:<br>
                <strong style="color: #4CAF50;">"${palabra.opciones[palabra.respuesta]}"</strong>
            </div>
            <div style="margin-top: 10px; color: #666;">
                ¡No te preocupes! Sigue intentando 💪
            </div>
        `;
        
        errores++;
        puntaje += 10; // 10 puntos de consuelo
    }
    
    // Actualizar contadores
    actualizarContadores();
    
    // Bloquear más respuestas
    puedeResponder = false;
    
    // Mostrar botón siguiente
    btnSiguiente.style.display = 'block';
}

// 10. FUNCIÓN PARA ACTUALIZAR CONTADORES
function actualizarContadores() {
    aciertosSpan.textContent = aciertos;
    erroresSpan.textContent = errores;
    puntajeSpan.textContent = puntaje;
}

// 11. FUNCIÓN PARA SIGUIENTE PALABRA
function siguientePalabra() {
    palabraActual++;
    
    if (palabraActual < palabrasJaponesas.length) {
        mostrarPalabra();
    } else {
        terminarQuiz();
    }
}

// 12. FUNCIÓN PARA TERMINAR QUIZ
function terminarQuiz() {
    console.log('🏁 Quiz terminado!');
    
    const porcentaje = Math.round((aciertos / palabrasJaponesas.length) * 100);
    
    // Actualizar estadísticas finales
    document.getElementById('final-aciertos').textContent = aciertos;
    document.getElementById('final-errores').textContent = errores;
    document.getElementById('final-porcentaje').textContent = `${porcentaje}%`;
    document.getElementById('final-puntaje').textContent = puntaje;
    
    // Determinar mensaje final
    let mensajeFinal = '';
    let emoji = '';
    
    if (porcentaje === 100) {
        mensajeFinal = '🏆 ¡PERFECTO! Eres un maestro del japonés!';
        emoji = '👑';
    } else if (porcentaje >= 80) {
        mensajeFinal = '🌟 ¡Excelente trabajo! Casi perfecto.';
        emoji = '✨';
    } else if (porcentaje >= 60) {
        mensajeFinal = '👍 ¡Muy bien! Vas por buen camino.';
        emoji = '😊';
    } else if (porcentaje >= 40) {
        mensajeFinal = '💪 ¡Buen intento! Sigue practicando.';
        emoji = '🚀';
    } else {
        mensajeFinal = '😊 ¡Sigue aprendiendo! La práctica hace al maestro.';
        emoji = '📚';
    }
    
    document.getElementById('mensaje-final').innerHTML = `
        <div style="font-size: 1.5rem; margin-bottom: 15px;">
            ${emoji} ${mensajeFinal} ${emoji}
        </div>
        <div style="color: #666;">
            Has completado ${palabrasJaponesas.length} palabras japonesas<br>
            Tu porcentaje de aciertos es del ${porcentaje}%
        </div>
    `;
    
    // Cambiar a pantalla de resultados
    quizDiv.style.display = 'none';
    resultadosDiv.style.display = 'block';
}

// 13. FUNCIÓN PARA VOLVER AL INICIO
function volverAlInicio() {
    if (palabraActual > 0 && palabraActual < palabrasJaponesas.length) {
        if (!confirm('⚠️ ¿Seguro que quieres volver? Se perderá el progreso actual.')) {
            return;
        }
    }
    
    quizDiv.style.display = 'none';
    inicioDiv.style.display = 'block';
}

// 14. FUNCIÓN PARA REINICIAR QUIZ
function reiniciarQuiz() {
    resultadosDiv.style.display = 'none';
    empezarQuiz();
}

// 15. FUNCIÓN PARA TECLA ESC (VOLVER)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        volverAlInicio();
    }
    
    // Atajos de teclado para opciones (1-4)
    if (quizDiv.style.display === 'block' && puedeResponder) {
        const tecla = parseInt(event.key);
        if (tecla >= 1 && tecla <= 4) {
            const botones = document.querySelectorAll('.opcion-btn');
            if (botones[tecla - 1]) {
                botones[tecla - 1].click();
            }
        }
    }
});
