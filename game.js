/* ==========================================================================
   🌱 LÓGICA DE JUEGO Y AUDIO SINTETIZADO: "CULTIVANDO LA VIDA"
   ========================================================================== */

// --- BASE DE DATOS DE INFORMACIÓN DIDÁCTICA ---
const STAGES_DATA = {
    1: {
        num: "Etapa 1/6",
        title: "Precontemplación: \"La Semilla Durmiente\"",
        subtitle: "Aún no se percibe la necesidad de cambio.",
        emoji: "🕳️",
        sky: "url(#sky-precontemplation)",
        description: "En esta fase, la persona que vive con diabetes no es consciente del riesgo o prefiere no pensar en ello porque le genera negación o angustia. No tiene intención de cambiar sus hábitos alimenticios o de monitoreo en los próximos 6 meses.",
        example: "\"A mí no me pasa nada por comer este pastel. Mi abuelo tuvo diabetes y vivió 90 años comiendo de todo. Esos doctores exageran.\"",
        familySupport: "No presiones, no des sermones científicos ni regañes. Escucha activamente con empatía profunda. Valida su miedo o negación y hazle sentir que estás a su lado pase lo que pase, sin obligarle a cambiar."
    },
    2: {
        num: "Etapa 2/6",
        title: "Contemplación: \"Buscando el Sol\"",
        subtitle: "Se reconoce el problema, pero abunda la ambivalencia.",
        emoji: "🌤️",
        sky: "url(#sky-contemplation)",
        description: "La persona es consciente de que mejorar sus hábitos (como el ejercicio o tomar la medicación) sería bueno para su salud y evalúa hacerlo en los próximos 6 meses. Sin embargo, ve tantos pros como contras, sintiendo pereza, frustración o miedo de fallar.",
        example: "\"Sé que debo medirme la glucosa diariamente para estar controlado, pero es molesto, duele el pinchazo y la verdad no tengo tiempo para eso.\"",
        familySupport: "Ayúdale a visualizar los beneficios del cambio. Ayúdale a balancear los pros y contras sin presionarle. Resuelvan dudas juntos y hablen sobre qué cosas facilitarían el proceso."
    },
    3: {
        num: "Etapa 3/6",
        title: "Preparación: \"Reuniendo las Herramientas\"",
        subtitle: "¡Se toma la decisión! Pequeños pasos concretos.",
        emoji: "🛠️",
        sky: "url(#sky-preparation)",
        description: "Hay una firme intención de cambiar de conducta en el próximo mes. Se empiezan a tomar pequeñas decisiones operativas y a planificar la estrategia de autocuidado.",
        example: "\"Ya busqué recetas de comida saludable en internet y fui a comprar un pastillero semanal para ordenar mis medicinas. El lunes empiezo.\"",
        familySupport: "Facilita la logística práctica. Acompáñale a comprar alimentos saludables, ayuda a programar alarmas para las tomas de medicamentos o busquen juntos un calzado cómodo para caminar."
    },
    4: {
        num: "Etapa 4/6",
        title: "Acción: \"Aparece el Primer Brote\"",
        subtitle: "Ejecución activa de los planes de salud.",
        emoji: "🌱",
        sky: "url(#sky-action)",
        description: "La persona ya implementa los nuevos hábitos de autocuidado en su rutina diaria de forma constante. Esta fase abarca los primeros 6 meses de cambio y requiere un gran esfuerzo y enfoque constante.",
        example: "\"Llevo tres semanas completas saliendo a caminar 25 minutos después de comer y midiendo mi glucosa cada mañana. Me siento con más energía.\"",
        familySupport: "¡Celebra y reconoce cada pequeño logro! Evita ser el \"policía de la diabetes\" (inspeccionando números o comida). En su lugar, elogia su esfuerzo diario y hazle saber lo orgulloso que estás."
    },
    5: {
        num: "Etapa 5/6",
        title: "Mantenimiento: \"El Árbol Da Frutos\"",
        subtitle: "Hábito integrado y consolidado en la vida diaria.",
        emoji: "🌳",
        sky: "url(#sky-maintenance)",
        description: "Los hábitos de alimentación saludable, monitoreo e hidratación ya se han sostenido por más de 6 meses. El comportamiento ahora se siente natural, requiere menos esfuerzo consciente y es parte de su estilo de vida.",
        example: "\"Ya cumplí un año desde que cambié mi alimentación y voy a mis consultas médicas cada mes. Ya no me cuesta trabajo, es parte de mi vida.\"",
        familySupport: "Mantén un entorno saludable en casa que proteja los logros alcanzados. Sigue compartiendo el estilo de vida activo y saludable en familia y hablen sobre estrategias para evitar la monotonía."
    },
    6: {
        num: "Etapa 6/6",
        title: "Recaída: \"La Lluvia de Otoño\"",
        subtitle: "Un retroceso temporal que enseña cómo renacer.",
        emoji: "🍂",
        sky: "url(#sky-relapse)",
        description: "La persona experimenta un retorno temporal a hábitos anteriores (dejar la dieta o el ejercicio). En la psicología moderna de la salud, esto NO es un fracaso, sino una parte natural del espiral de aprendizaje que ayuda a afianzar raíces.",
        example: "\"En las fiestas decembrinas me descuidé por completo, dejé de tomar el medicamento y me dio pena ir al médico por mis niveles altos.\"",
        familySupport: "Evita recriminar o decir \"te lo dije\". Trata la recaída de manera compasiva. Recuérdale que un tropezón no borra todo el camino recorrido y ayúdale a evaluar qué causó la recaída para volver a empezar más fuerte."
    }
};

// --- GUIONES DE MODO HISTORIA: EL CAMINO DE DON PEPE ---
const STORY_SCENARIOS = [
    {
        stage: 1,
        title: "Etapa 1: Precontemplación",
        pepeSpeech: "Hola, mijo. Me acaban de decir en la clínica que tengo prediabetes o diabetes... pero yo me siento re bien, fuerte como un roble. Esos doctores exageran para vender medicinas, yo no tengo por qué cambiar nada de mi comida.",
        avatarClass: "pepe-neutral",
        choices: [
            {
                type: "Confrontar",
                typeClass: "negative",
                text: "¡Papá, estás loco! Si no dejas el refresco y el pan dulce de inmediato te va a dar un infarto o te van a tener que amputar un pie. ¡Tienes que entender que estás enfermo y debes hacernos caso!",
                feedback: "⚠️ <strong>Respuesta confrontativa.</strong> En la etapa de Precontemplación, asustar o agredir solo genera que Don Pepe se defienda y se cierre. Aumentas su negación.",
                correct: false
            },
            {
                type: "Ignorar",
                typeClass: "indifferent",
                text: "Pues sí, papá. Al final del día es tu cuerpo y tu salud. Si quieres seguir comiendo así de mal es tu decisión, nosotros ya te advertimos.",
                feedback: "💤 <strong>Respuesta indiferente.</strong> Dejarle solo en esta fase no le ayuda a sentirse querido ni seguro. Las personas que viven con diabetes requieren acompañamiento afectivo, no abandono.",
                correct: false
            },
            {
                type: "Empatizar",
                typeClass: "positive",
                text: "Entiendo perfectamente, papá. Debe ser muy molesto y abrumador que te digan todo esto de golpe cuando tú te sientes de maravilla. No te preocupes, no haremos cambios drásticos hoy, estoy aquí a tu lado para lo que necesites.",
                feedback: "🌱 ¡RESPUESTA COMPASIVA EXCELENTE! Al validar sus emociones sin obligarlo a cambiar de inmediato, generas un espacio de seguridad psicológica. Don Pepe siente que no lo juzgas y estará más abierto a hablar de salud contigo en el futuro.",
                correct: true
            }
        ]
    },
    {
        stage: 2,
        title: "Etapa 2: Contemplación",
        pepeSpeech: "Oye... estuve pensando en lo que me dijiste. Sí he notado que me da mucha sed y me canso rápido al caminar. Sé que debería medir mi azúcar con el aparato que me regalaron, pero... me da terror pincharme el dedo y la verdad no sé ni usarlo.",
        avatarClass: "pepe-sad",
        choices: [
            {
                type: "Confrontar",
                typeClass: "negative",
                text: "Ay, papá, ¿cómo te va a dar miedo un pinchazo tan chiquito? Eres un hombre fuerte. Déjate de cosas y hazlo ya, no es ciencia del otro mundo.",
                feedback: "⚠️ <strong>Respuesta minimizadora.</strong> Minimizar sus temores reales hace que Don Pepe se sienta incomprendido y tonto. Su miedo es válido.",
                correct: false
            },
            {
                type: "Ignorar",
                typeClass: "indifferent",
                text: "Bueno, avísame cuando decidas pincharte para ver si te puedo ayudar con el instructivo. Ahí está el aparato en la mesa.",
                feedback: "💤 <strong>Respuesta pasiva.</strong> Don Pepe tiene dudas prácticas y emocionales; dejarle la responsabilidad completa en este punto pospone la acción indefinidamente.",
                correct: false
            },
            {
                type: "Empatizar",
                typeClass: "positive",
                text: "Te entiendo, papá. A nadie le gusta pincharse el dedo y da mucho miedo al principio. ¿Qué te parece si el sábado lo abrimos juntos, aprendemos a usarlo despacito y nos pinchamos los dos para que veas que se siente muy poco?",
                feedback: "🌱 ¡RESPUESTA COMPASIVA EXCELENTE! Al ofrecerle compañía física y apoyo para resolver su barrera emocional y práctica (el miedo y la falta de conocimiento), diluyes su ambivalencia. ¡Estás impulsando el cambio con amor!",
                correct: true
            }
        ]
    },
    {
        stage: 3,
        title: "Etapa 3: Preparación",
        pepeSpeech: "¡Listo! Ya le perdimos el miedo al aparatito. Ahora sí me propuse que el próximo lunes arranco con todo. Quiero comer más verduras y tomar agua en lugar de refresco. Pero no sé cómo empezar a surtir la despensa de forma saludable.",
        avatarClass: "pepe-neutral",
        choices: [
            {
                type: "Confrontar",
                typeClass: "negative",
                text: "Pues tienes que tirar toda la comida chatarra de la casa ya mismo y comer pura pechuga con lechuga. Así es la dieta de la diabetes, papá, ni modo.",
                feedback: "⚠️ <strong>Respuesta impositiva y extrema.</strong> Prohibir todo y proponer una dieta sumamente aburrida desmotiva a cualquiera y suele causar abandonos rápidos.",
                correct: false
            },
            {
                type: "Ignorar",
                typeClass: "indifferent",
                text: "Qué bueno, papá. En internet hay miles de recetas de diabetes, búscalas y haz tu lista de compras.",
                feedback: "💤 <strong>Respuesta delegadora.</strong> Aunque tiene iniciativa, estructurar una nueva lista puede ser confuso. Un poco de ayuda práctica consolida el plan.",
                correct: false
            },
            {
                type: "Empatizar",
                typeClass: "positive",
                text: "¡Qué gran decisión, papá! Me alegra mucho. ¿Qué te parece si este fin de semana hacemos juntos una lista de verduras y comidas ricas que te gusten, y te acompaño al mercado a comprarlas para tener todo listo el lunes?",
                feedback: "🌱 ¡RESPUESTA COMPASIVA EXCELENTE! Ayudar activamente en la planificación y la logística es crucial en la etapa de Preparación. Al acompañarlo a comprar, aseguras que tenga las herramientas necesarias para comenzar con éxito.",
                correct: true
            }
        ]
    },
    {
        stage: 4,
        title: "Etapa 4: Acción",
        pepeSpeech: "¡Mijo, ya llevo cuatro semanas comiendo mis verduras a diario, tomando mi medicina a tiempo y saliendo a caminar al parque! Hoy me medí la glucosa en ayunas y salió en 115 mg/dL. ¡Hacía meses que no veía ese número!",
        avatarClass: "pepe-happy",
        choices: [
            {
                type: "Confrontar",
                typeClass: "negative",
                text: "Pues sí, 115 está bien, pero acuérdate que lo ideal es menos de 100. Todavía te falta bajarle más a las tortillas, no te confíes tanto.",
                feedback: "⚠️ <strong>Respuesta exigente.</strong> Centrarte únicamente en la meta perfecta en lugar de aplaudir el gran esfuerzo y logro desinfla el entusiasmo de Don Pepe.",
                correct: false
            },
            {
                type: "Ignorar",
                typeClass: "indifferent",
                text: "Ah, qué bien, papá. Qué bueno que esté funcionando. Sigue así.",
                feedback: "💤 <strong>Respuesta tibia.</strong> Don Pepe ha invertido una gran cantidad de energía estas semanas. Una respuesta monótona no refuerza el nuevo hábito.",
                correct: false
            },
            {
                type: "Empatizar",
                typeClass: "positive",
                text: "¡Wow, papá! ¡Qué felicidad! Ese 115 es el fruto directo de toda la constancia, las caminatas y el gran esfuerzo que has hecho estas semanas. ¡Estoy sumamente orgulloso de ti! ¿Festejamos preparando una cena saludable deliciosa?",
                feedback: "🌱 ¡RESPUESTA COMPASIVA EXCELENTE! Celebrar y validar el logro es el motor de la etapa de Acción. Al reforzar positivamente su conducta, aumentas su autoeficacia, haciendo que se sienta motivado a continuar.",
                correct: true
            }
        ]
    },
    {
        stage: 5,
        title: "Etapa 5: Mantenimiento",
        pepeSpeech: "Hola, mijo. Ya cumplí ocho meses con mis caminatas y mi alimentación saludable. Me siento muy ágil y mi médico me felicitó en la consulta. Pero a veces me aburre comer siempre lo mismo en casa y me dan ganas de mandar todo a volar.",
        avatarClass: "pepe-neutral",
        choices: [
            {
                type: "Confrontar",
                typeClass: "negative",
                text: "¡Ni se te ocurra dejarlo! Si te aburres te aguantas, papá. Tu salud está de por medio y no puedes volver a como estabas antes de ninguna manera.",
                feedback: "⚠️ <strong>Respuesta restrictiva basada en el miedo.</strong> Amenazar con recaídas o imponer rigidez genera fatiga psicológica y puede provocar un abandono rebelde.",
                correct: false
            },
            {
                type: "Ignorar",
                typeClass: "indifferent",
                text: "Bueno, comer sano a veces es aburrido, pero es lo que te toca por la diabetes. No hay de otra.",
                feedback: "💤 <strong>Respuesta resignada.</strong> No propone soluciones para mitigar la monotonía, lo que incrementa el riesgo de abandono del hábito.",
                correct: false
            },
            {
                type: "Empatizar",
                typeClass: "positive",
                text: "Es totalmente normal aburrirse después de tantos meses, papá, a todos nos pasa. ¡Eres un campeón por sostenerlo tanto tiempo! ¿Qué te parece si buscamos un taller de cocina saludable o compramos un recetario con platillos creativos y coloridos para probar sabores nuevos esta semana?",
                feedback: "🌱 ¡RESPUESTA COMPASIVA EXCELENTE! En Mantenimiento, el reto principal es combatir la monotonía y prevenir la fatiga. Ofrecer alternativas creativas y divertidas inyecta nueva energía al hábito establecido sin romper el estilo de vida.",
                correct: true
            }
        ]
    },
    {
        stage: 6,
        title: "Etapa 6: Recaída y Aprendizaje",
        pepeSpeech: "Ay, mijo... me siento muy triste y avergonzado contigo. Con las fiestas patrias y de fin de año, caí en la tentación, dejé de caminar, comí de todo y no me he tomado mis pastillas. Mi glucosa se disparó a 240 y me da pena ir a ver al doctor.",
        avatarClass: "pepe-sad",
        choices: [
            {
                type: "Confrontar",
                typeClass: "negative",
                text: "¡No puede ser, papá! Todo nuestro esfuerzo de meses a la basura por tu falta de fuerza de voluntad. Ahora atente a las consecuencias con tu médico.",
                feedback: "⚠️ <strong>Respuesta culpabilizadora.</strong> Hacerle sentir culpable genera vergüenza y aislamiento, alejándolo del tratamiento y del apoyo familiar. Aumenta el peligro médico.",
                correct: false
            },
            {
                type: "Ignorar",
                typeClass: "indifferent",
                text: "Pues sí te descuidaste feo, papá. Ve a ver qué te dice el doctor, ojalá no te regañe tanto.",
                feedback: "💤 <strong>Respuesta fría y distante.</strong> Le dejas solo ante la vergüenza clínica, lo que postergará que busque ayuda médica urgente.",
                correct: false
            },
            {
                type: "Empatizar",
                typeClass: "positive",
                text: "Papá, mírame: un tropiezo no borra todo lo maravilloso que lograste estos 8 meses. Tus raíces son fuertes. Las fiestas son difíciles y es normal resbalar. No hay nada de qué avergonzarse. Vamos juntos al doctor para reajustar el camino y yo te acompaño a retomar la caminata mañana mismo. ¡Estamos juntos en esto!",
                feedback: "🌱 ¡RESPUESTA COMPASIVA EXCELENTE! Has aplicado el principio psicológico más valioso: tratar la recaída como un proceso de aprendizaje. Quitar la culpa reduce la vergüenza, protege su salud mental y le permite reincorporarse al autocuidado con mayor rapidez y sabiduría.",
                correct: true
            }
        ]
    }
];

// --- BANCO DE FRASES PARA EL MINIJUEGO DE COSECHA DE HÁBITOS ---
const HARVEST_BANK = [
    { text: "\"A mí no me pasa nada por comer pasteles, la diabetes se controla sola.\"", stage: 1 },
    { text: "\"Mi médico dice que tengo la glucosa alta, pero yo me siento perfectamente bien.\"", stage: 1 },
    { text: "\"No me interesa medirme la glucosa, esos aparatos solo sirven para asustar.\"", stage: 1 },
    
    { text: "\"Sé que debería hacer ejercicio para mi diabetes, pero me da flojera y no tengo tiempo.\"", stage: 2 },
    { text: "\"Me da miedo pincharme el dedo para medirme el azúcar, aunque sé que debo hacerlo.\"", stage: 2 },
    { text: "\"A veces pienso en dejar el refresco, pero me gusta demasiado y es difícil.\"", stage: 2 },
    
    { text: "\"Ya compré mi pastillero semanal y agendé mi cita con la nutrióloga para el lunes.\"", stage: 3 },
    { text: "\"Hice una lista de las verduras que compraré este fin de semana para empezar la dieta.\"", stage: 3 },
    { text: "\"Busqué un grupo de caminata en mi colonia y compré tenis cómodos.\"", stage: 3 },
    
    { text: "\"Llevo un mes midiendo mi glucosa todas las mañanas y anotando los resultados.\"", stage: 4 },
    { text: "\"He salido a caminar 25 minutos después de comer durante las últimas 3 semanas.\"", stage: 4 },
    { text: "\"Ya cambié el refresco por agua de jamaica sin azúcar en todas mis comidas de este mes.\"", stage: 4 },
    
    { text: "\"Llevo casi un año alimentándome sanamente y mis niveles se han mantenido estables.\"", stage: 5 },
    { text: "\"Caminar por las tardes y tomar mi medicamento a tiempo ya es parte normal de mi rutina.\"", stage: 5 },
    { text: "\"Después de 8 meses, medir mi azúcar ya no me pesa, es como cepillarme los dientes.\"", stage: 5 },
    
    { text: "\"Dejé de hacer ejercicio por las fiestas y ahora me da pena regresar porque subí de peso.\"", stage: 6 },
    { text: "\"Me descuidé estas vacaciones, comí pan dulce diario y dejé de tomar la metformina.\"", stage: 6 },
    { text: "\"Tuve un problema familiar fuerte, me deprimí y abandoné mi dieta por dos semanas.\"", stage: 6 }
];

// ==========================================================================
// --- MOTOR Y ESTADOS DEL JUEGO ---
// ==========================================================================
let gameState = {
    currentStage: 1,
    empathyScore: 0,
    nutrientPoints: 0,
    soundEnabled: true,
    activeTab: 'menu',
    
    // Variables Modo Historia
    storyIndex: 0, // 0 a 5 correspondiente a escenarios
    
    // Variables Modo Cosecha
    harvestTimer: 45,
    harvestScore: 0,
    harvestInterval: null,
    currentHarvestPhrase: null
};

// --- INICIALIZADOR DE AUDIO (Web Audio API) ---
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSynthesizedSound(type) {
    if (!gameState.soundEnabled) return;
    
    try {
        initAudio();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        const now = audioCtx.currentTime;
        
        if (type === 'click') {
            // Sonido de Click Suave de Madera
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.12);
        } 
        else if (type === 'success') {
            // Arpegio de Campanita Celestial (Éxito)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now); // Do5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // Mi5
            osc.frequency.setValueAtTime(783.99, now + 0.16); // Sol5
            osc.frequency.setValueAtTime(1046.50, now + 0.24); // Do6
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        } 
        else if (type === 'error') {
            // Sonido de Error Suave Retro
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.linearRampToValueAtTime(90, now + 0.25);
            gainNode.gain.setValueAtTime(0.12, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.26);
        } 
        else if (type === 'water') {
            // Sonido de Agua Burbujeante / Riego
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(900, now + 0.4);
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            osc.start(now);
            osc.stop(now + 0.4);
        }
        else if (type === 'storm') {
            // Ruido de Ráfaga de Viento (Filtrado)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(80, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.4);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.8);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
            osc.start(now);
            osc.stop(now + 0.8);
        }
    } catch (e) {
        console.warn("La Web Audio API no está soportada o requiere interacción previa.", e);
    }
}

// ==========================================================================
// --- CONTROLADOR DE VISTA DEL JARDÍN (SVG DINÁMICO) ---
// ==========================================================================
function updateGardenVisuals(stage) {
    const skyBg = document.getElementById('sky-bg');
    const ray = document.getElementById('contemplation-ray');
    const cloud = document.getElementById('storm-cloud');
    const weather = document.getElementById('weather-effect');
    
    // Desactivar todas las capas del jardín
    const gardenElements = [
        'element-seed', 'element-rooting', 'element-tools', 
        'element-sprout', 'element-tree', 'element-autumn', 
        'element-empowerment'
    ];
    
    gardenElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.8)';
            el.classList.remove('watering-active');
        }
    });

    // Reset de efectos climáticos
    weather.className = 'weather-normal';
    cloud.style.opacity = '0';
    cloud.style.transform = 'translateY(-50px)';
    ray.style.opacity = '0';
    stopAutumnLeaves();

    // Actualizar Banner
    const bannerNum = document.getElementById('current-stage-num');
    const bannerTitle = document.getElementById('current-stage-title');
    
    if (stage === 7) {
        bannerNum.textContent = "🏆 ¡LOGRO FINAL!";
        bannerTitle.textContent = "Empoderamiento del Paciente y la Familia";
        skyBg.setAttribute('fill', 'url(#sky-empowerment)');
        
        const el = document.getElementById('element-empowerment');
        if (el) {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        }
        return;
    }

    const data = STAGES_DATA[stage];
    if (!data) return;

    bannerNum.textContent = data.num;
    bannerTitle.textContent = data.title;
    skyBg.setAttribute('fill', data.sky);

    // Activar capa específica del jardín con animaciones y transiciones elegantes
    switch(stage) {
        case 1: // Precontemplación
            toggleElement('element-seed', true);
            break;
            
        case 2: // Contemplación
            toggleElement('element-rooting', true);
            ray.style.opacity = '0.75';
            break;
            
        case 3: // Preparación
            toggleElement('element-seed', true, 0.4);
            toggleElement('element-tools', true);
            break;
            
        case 4: // Acción
            toggleElement('element-sprout', true);
            toggleElement('element-tools', true, 0.5);
            // Activar animación de riego
            const sprout = document.getElementById('element-sprout');
            if (sprout) sprout.classList.add('watering-active');
            break;
            
        case 5: // Mantenimiento
            toggleElement('element-tree', true);
            break;
            
        case 6: // Recaída / Aprendizaje
            toggleElement('element-autumn', true);
            cloud.style.opacity = '1';
            cloud.style.transform = 'translateY(0)';
            weather.className = 'weather-rain';
            startAutumnLeaves();
            playSynthesizedSound('storm');
            break;
    }
}

function toggleElement(id, show, opacity = 1) {
    const el = document.getElementById(id);
    if (el) {
        el.style.opacity = show ? opacity.toString() : '0';
        el.style.transform = show ? 'scale(1)' : 'scale(0.8)';
    }
}

// --- EFECTOS AMBIENTALES DE HOJAS CAYENDO ---
let leafTimer = null;
function startAutumnLeaves() {
    stopAutumnLeaves();
    const container = document.getElementById('wind-leaves-container');
    if (!container) return;

    leafTimer = setInterval(() => {
        const leaf = document.createElement('div');
        leaf.className = 'weather-leaf';
        leaf.style.left = Math.random() * 90 + '%';
        leaf.style.top = '-20px';
        
        // Colores otoñales aleatorios
        const colors = ['#ea580c', '#d97706', '#b45309', '#eab308'];
        leaf.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const size = Math.random() * 12 + 8;
        leaf.style.width = size + 'px';
        leaf.style.height = size * 1.5 + 'px';
        
        leaf.style.animationDuration = Math.random() * 3 + 3 + 's';
        container.appendChild(leaf);
        
        // Remover después de terminar animación
        setTimeout(() => leaf.remove(), 6000);
    }, 600);
}

function stopAutumnLeaves() {
    if (leafTimer) {
        clearInterval(leafTimer);
        leafTimer = null;
    }
    const container = document.getElementById('wind-leaves-container');
    if (container) container.innerHTML = '';
}

// --- CREACIÓN DE PARTÍCULAS FLOTANTES DE FONDO ---
function createAmbientParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 100 + 40;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.animation = `bounce ${Math.random() * 6 + 6}s infinite ease-in-out`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(p);
    }
}

// ==========================================================================
// --- CONTROLADOR DE PESTAÑAS (TAB SYSTEM) ---
// ==========================================================================
function switchTab(tabId) {
    playSynthesizedSound('click');
    gameState.activeTab = tabId;

    // Cambiar Botones del Nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Cambiar Pantallas
    document.querySelectorAll('.game-screen').forEach(screen => {
        if (screen.id === `screen-${tabId}`) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });

    // Inicializar lógica de pantalla si es necesario
    if (tabId === 'learn') {
        initEncyclopedia();
    } else if (tabId === 'story') {
        initStoryMode();
    } else if (tabId === 'harvest') {
        resetHarvestMode();
    } else if (tabId === 'menu') {
        // En el menú restauramos el jardín al nivel actual del jugador
        updateGardenVisuals(gameState.currentStage);
    }
}

// ==========================================================================
// --- PANTALLA 2: LÓGICA DE LA ENCICLOPEDIA ---
// ==========================================================================
function initEncyclopedia() {
    // Buscar la pestaña de etapa activa de la enciclopedia
    const activeTab = document.querySelector('.stage-tab.active');
    const stage = activeTab ? parseInt(activeTab.getAttribute('data-stage')) : 1;
    selectEncyclopediaStage(stage);
}

function selectEncyclopediaStage(stage) {
    playSynthesizedSound('click');
    
    // Cambiar clase activa en botones
    document.querySelectorAll('.stage-tab').forEach(tab => {
        if (parseInt(tab.getAttribute('data-stage')) === stage) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Cambiar el jardín de fondo en tiempo real
    updateGardenVisuals(stage);

    // Llenar información de la enciclopedia
    const data = STAGES_DATA[stage];
    if (!data) return;

    document.getElementById('learn-emoji').textContent = data.emoji;
    document.getElementById('learn-title').innerHTML = `${stage}. ${data.title.split(': ')[0]}: <span style="color: var(--color-lime)">${data.title.split(': ')[1]}</span>`;
    document.getElementById('learn-subtitle').textContent = data.subtitle;
    document.getElementById('learn-description').textContent = data.description;
    document.getElementById('learn-example').textContent = data.example;
    document.getElementById('learn-family-support').textContent = data.familySupport;
}

// ==========================================================================
// --- PANTALLA 3: LÓGICA DEL MODO HISTORIA (DON PEPE) ---
// ==========================================================================
function initStoryMode() {
    gameState.storyIndex = 0;
    loadStoryScenario(gameState.storyIndex);
}

function loadStoryScenario(index) {
    const scenario = STORY_SCENARIOS[index];
    if (!scenario) {
        // Fin de la historia
        showEmpowermentEnding();
        return;
    }

    // Actualizar Jardín
    updateGardenVisuals(scenario.stage);

    // Indicadores e Información
    document.getElementById('story-stage-indicator').textContent = scenario.title;
    
    // Actualizar Barra de Progreso
    const progressPercent = (index / 6) * 100;
    document.getElementById('story-progress-bar').style.width = `${progressPercent}%`;

    // Avatar de Don Pepe
    const avatar = document.getElementById('pepe-avatar');
    avatar.className = scenario.avatarClass;
    
    // Ajustar expresión bucal de Don Pepe por SVG
    const mouth = document.getElementById('pepe-mouth');
    if (scenario.avatarClass === 'pepe-sad') {
        mouth.setAttribute('d', 'M 45,67 Q 50,57 55,67'); // Triste boca invertida
    } else if (scenario.avatarClass === 'pepe-happy') {
        mouth.setAttribute('d', 'M 43,60 Q 50,75 57,60'); // Sonrisa feliz
    } else {
        mouth.setAttribute('d', 'M 45,65 Q 50,65 55,65'); // Línea plana neutral
    }

    // Discurso y Opciones
    document.getElementById('pepe-dialogue').textContent = scenario.pepeSpeech;
    
    const choicesGrid = document.getElementById('story-choices-grid');
    choicesGrid.innerHTML = '';
    
    scenario.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-card';
        btn.setAttribute('data-index', idx);
        btn.innerHTML = `
            <span class="choice-type ${choice.typeClass}">
                ${choice.type === 'Confrontar' ? '⚠️ Confrontar' : choice.type === 'Ignorar' ? '💤 Ignorar' : '🌱 Empatizar'}
            </span>
            <p>${choice.text}</p>
        `;
        btn.addEventListener('click', () => handleStoryChoice(index, idx));
        choicesGrid.appendChild(btn);
    });

    // Ocultar retroalimentación
    document.getElementById('story-feedback').classList.add('hide');
}

function handleStoryChoice(scenarioIdx, choiceIdx) {
    const scenario = STORY_SCENARIOS[scenarioIdx];
    const choice = scenario.choices[choiceIdx];
    
    const feedbackPanel = document.getElementById('story-feedback');
    const fIcon = document.getElementById('feedback-icon');
    const fTitle = document.getElementById('feedback-title');
    const fText = document.getElementById('feedback-text');
    const btnNext = document.getElementById('btn-next-story');

    if (choice.correct) {
        // Respuesta Correcta
        playSynthesizedSound('success');
        fIcon.textContent = '🌱';
        fTitle.textContent = '¡Excelente Decisión!';
        fTitle.style.color = 'var(--color-lime)';
        fText.innerHTML = choice.feedback;
        
        // Cambiar Don Pepe a feliz
        const avatar = document.getElementById('pepe-avatar');
        avatar.className = 'pepe-happy';
        const mouth = document.getElementById('pepe-mouth');
        mouth.setAttribute('d', 'M 43,60 Q 50,75 57,60');

        // Sumar puntos
        gameState.empathyScore += 10;
        document.getElementById('stat-empathy').textContent = gameState.empathyScore;
        
        // Guardar progreso global de etapas si es mayor
        if (scenario.stage >= gameState.currentStage) {
            gameState.currentStage = scenario.stage + 1; // Desbloquea siguiente
        }

        btnNext.textContent = scenarioIdx === 5 ? 'Ver Resultado Final 🏆' : 'Avanzar en el Camino →';
        btnNext.onclick = () => {
            gameState.storyIndex++;
            loadStoryScenario(gameState.storyIndex);
        };
    } else {
        // Respuesta Incorrecta (Psicológicamente no recomendada)
        playSynthesizedSound('error');
        fIcon.textContent = '⚠️';
        fTitle.textContent = 'Respuesta no Recomendada';
        fTitle.style.color = 'var(--color-autumn-orange)';
        fText.innerHTML = choice.feedback + "<br><br><em>¡Inténtalo de nuevo con un enfoque más compasivo!</em>";
        
        // Cambiar Don Pepe a triste
        const avatar = document.getElementById('pepe-avatar');
        avatar.className = 'pepe-sad';
        const mouth = document.getElementById('pepe-mouth');
        mouth.setAttribute('d', 'M 45,67 Q 50,57 55,67');

        btnNext.textContent = 'Intentar de Nuevo 🔄';
        btnNext.onclick = () => {
            feedbackPanel.classList.add('hide');
            // Restaurar cara de Don Pepe al estado original del escenario
            avatar.className = scenario.avatarClass;
            loadStoryScenario(scenarioIdx);
        };
    }

    feedbackPanel.classList.remove('hide');
}

function showEmpowermentEnding() {
    // Carga la etapa final 7 en el jardín
    updateGardenVisuals(7);
    
    // Actualizar barra al 100%
    document.getElementById('story-progress-bar').style.width = '100%';
    document.getElementById('story-stage-indicator').textContent = "¡Empoderamiento Completo!";

    const choicesGrid = document.getElementById('story-choices-grid');
    choicesGrid.innerHTML = '';

    // Diálogo final de Don Pepe agradeciendo
    document.getElementById('pepe-dialogue').innerHTML = 
        "¡Gracias, de verdad! Gracias a tu paciencia, a tus palabras de aliento y a que nunca me juzgaste cuando tuve recaídas, hoy controlo mi diabetes plenamente. ¡Hicimos florecer este jardín familiar juntos! ❤️";

    const divEnding = document.createElement('div');
    divEnding.className = 'glass';
    divEnding.style.padding = '20px';
    divEnding.style.textAlign = 'center';
    divEnding.innerHTML = `
        <h3 style="color: var(--color-lime); font-size: 1.3rem; margin-bottom: 10px;">🏆 ¡Felicidades! Completaste la Historia</h3>
        <p style="font-size: 0.9rem; margin-bottom: 15px;">
            Has aprendido a identificar las 6 etapas del cambio de comportamiento y a ofrecer el soporte familiar empático adecuado para cada una. Has demostrado que un entorno compasivo es la clave para la salud.
        </p>
        <button id="btn-restart-story" class="btn btn-primary">Volver a Jugar la Historia</button>
    `;
    choicesGrid.appendChild(divEnding);

    document.getElementById('btn-restart-story').addEventListener('click', () => {
        initStoryMode();
    });
}

// ==========================================================================
// --- PANTALLA 4: LÓGICA DEL JUEGO ARCADE COSECHA DE HÁBITOS ---
// ==========================================================================
let currentHarvestList = [];

function resetHarvestMode() {
    // Detener timers anteriores si existen
    if (gameState.harvestInterval) {
        clearInterval(gameState.harvestInterval);
    }
    
    // Mostrar Pantalla de Inicio del minijuego
    document.getElementById('harvest-start-screen').classList.add('active');
    document.getElementById('harvest-active-game').style.display = 'none';
    document.getElementById('harvest-gameover-screen').classList.remove('active');
    
    // Restaurar jardín del jugador
    updateGardenVisuals(gameState.currentStage);
}

function startHarvestGame() {
    playSynthesizedSound('success');
    
    // Configuración inicial de juego
    gameState.harvestTimer = 45;
    gameState.harvestScore = 0;
    currentHarvestList = [...HARVEST_BANK]; // Copiar banco de frases
    shuffleArray(currentHarvestList); // Aleatorizar

    document.getElementById('harvest-start-screen').classList.remove('active');
    document.getElementById('harvest-active-game').style.display = 'flex';
    document.getElementById('harvest-gameover-screen').classList.remove('active');

    document.getElementById('harvest-timer').textContent = gameState.harvestTimer;
    document.getElementById('harvest-score').textContent = gameState.harvestScore;

    nextHarvestTurn();

    // Iniciar Cuenta Regresiva
    gameState.harvestInterval = setInterval(() => {
        gameState.harvestTimer--;
        document.getElementById('harvest-timer').textContent = gameState.harvestTimer;

        if (gameState.harvestTimer <= 0) {
            endHarvestGame();
        }
    }, 1000);
}

function nextHarvestTurn() {
    if (currentHarvestList.length === 0) {
        // Si se acaban las frases del banco, volvemos a rellenarlo
        currentHarvestList = [...HARVEST_BANK];
        shuffleArray(currentHarvestList);
    }

    gameState.currentHarvestPhrase = currentHarvestList.pop();
    document.getElementById('harvest-phrase').textContent = gameState.currentHarvestPhrase.text;

    // Animación pop-up en la tarjeta de frase
    const card = document.querySelector('.habit-card');
    card.style.animation = 'none';
    card.offsetHeight; // Truco de reflujo para reiniciar animación
    card.style.animation = 'popUp 0.4s var(--transition-smooth)';
}

function handleHarvestChoice(chosenStage) {
    if (gameState.harvestTimer <= 0) return;

    const correctStage = gameState.currentHarvestPhrase.stage;

    if (chosenStage === correctStage) {
        // Acierto
        playSynthesizedSound('water');
        gameState.harvestScore += 10;
        document.getElementById('harvest-score').textContent = gameState.harvestScore;
        
        // Mostrar animación de agua de riego en el panel de jardín
        triggerWateringAnimation();
        
        // Destello rápido verde en la tarjeta
        flashCardEffect('success');
    } else {
        // Fallo
        playSynthesizedSound('error');
        flashCardEffect('error');
        
        // Mostrar tip didáctico emergente de la psicóloga
        const data = STAGES_DATA[correctStage];
        alert(`💡 Tip Didáctico:\nEsa frase pertenece a: ${data.title.split(': ')[0]}.\nCaracterística: ${data.subtitle}`);
    }

    nextHarvestTurn();
}

function triggerWateringAnimation() {
    const sprout = document.getElementById('element-sprout');
    if (sprout) {
        sprout.classList.add('watering-active');
        setTimeout(() => {
            // Quitar animación de riego si no estamos en la etapa 4 de forma fija
            if (gameState.currentStage !== 4) {
                sprout.classList.remove('watering-active');
            }
        }, 1200);
    }
}

function flashCardEffect(type) {
    const card = document.querySelector('.habit-card');
    const borderPrev = card.style.borderColor;
    card.style.borderColor = type === 'success' ? 'var(--color-emerald)' : 'var(--color-autumn-orange)';
    setTimeout(() => {
        card.style.borderColor = borderPrev;
    }, 400);
}

function endHarvestGame() {
    clearInterval(gameState.harvestInterval);
    playSynthesizedSound('success');

    // Ocultar activa y mostrar fin de juego
    document.getElementById('harvest-active-game').style.display = 'none';
    const gameover = document.getElementById('harvest-gameover-screen');
    gameover.classList.add('active');

    // Calcular nutrientes ganados (1 nutriente por cada 10 puntos)
    const earnedNutrients = Math.floor(gameState.harvestScore / 10);
    
    document.getElementById('res-score').textContent = gameState.harvestScore;
    document.getElementById('res-nutrients').textContent = `+${earnedNutrients}`;

    // Actualizar botones de acción final
    const btnApply = document.getElementById('btn-apply-nutrients');
    btnApply.onclick = () => {
        playSynthesizedSound('water');
        gameState.nutrientPoints += earnedNutrients;
        document.getElementById('stat-nutrients').textContent = gameState.nutrientPoints;
        
        // Animación de riego
        triggerWateringAnimation();
        
        alert(`💦 ¡Has regado tu jardín!\nAgregaste ${earnedNutrients} nutrientes al suelo. Tu jardín se ve más radiante y con vida.`);
        
        resetHarvestMode();
    };
}

// --- UTILERÍAS ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ==========================================================================
// --- BINDING DE EVENTOS DOM (EVENT LISTENERS) ---
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Partículas ambientales
    createAmbientParticles();

    // 2. Navegación principal de pestañas
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = e.currentTarget.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // 3. Tarjetas del menú principal de inicio
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.getAttribute('data-target');
            switchTab(targetTab);
        });
    });

    // 4. Enciclopedia: clic en etapas
    document.querySelectorAll('.stage-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const stage = parseInt(e.currentTarget.getAttribute('data-stage'));
            selectEncyclopediaStage(stage);
        });
    });

    // 5. Cosecha de Hábitos: Clics de clasificación
    document.querySelectorAll('.btn-stage-choice').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chosenStage = parseInt(e.currentTarget.getAttribute('data-stage'));
            handleHarvestChoice(chosenStage);
        });
    });

    // Clics para iniciar minijuego
    document.getElementById('btn-start-harvest').addEventListener('click', startHarvestGame);
    document.getElementById('btn-replay-harvest').addEventListener('click', startHarvestGame);
    
    // Clics para volver al menú
    document.querySelectorAll('.back-to-menu').forEach(btn => {
        btn.addEventListener('click', () => switchTab('menu'));
    });

    // 6. Botón de silencio de sonido
    document.getElementById('btn-toggle-sound').addEventListener('click', (e) => {
        gameState.soundEnabled = !gameState.soundEnabled;
        e.currentTarget.textContent = gameState.soundEnabled ? "🔊 Sound: ON" : "🔇 Sound: OFF";
        playSynthesizedSound('click');
    });

    // Inicializar visualizaciones del jardín en la Etapa 1
    updateGardenVisuals(1);
});
