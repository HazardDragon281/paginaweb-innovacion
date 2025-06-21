// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const chatForm = document.getElementById('chat-form');
const chatContainer = document.getElementById('chat-container');
const usuariosConectados = document.getElementById('usuarios-conectados');
const climaActual = document.getElementById('clima-actual');
const noticiasContainer = document.getElementById('noticias-container');
const leyesContainer = document.getElementById('leyes-container');
const filtroTipoPesca = document.getElementById('filtro-tipo-pesca');

// Simulated Data
const noticias = [
    {
        titulo: 'Nueva temporada de pesca en Iquique',
        contenido: 'Comienza la temporada de pesca con excelentes condiciones climáticas...',
        fecha: '2024-03-15',
        imagen: 'img/pescador.jpg'
    },
    {
        titulo: 'Regulaciones actualizadas para pesca deportiva',
        contenido: 'El gobierno ha actualizado las regulaciones para la pesca deportiva...',
        fecha: '2024-03-14',
        imagen: 'img/LeyPesca.jpg'
    },
    {
        titulo: 'Festival de pesca en Iquique',
        contenido: 'Gran festival de pesca se realizará este fin de semana...',
        fecha: '2024-03-13',
        imagen: 'img/DiaPescador.jpg'
    }
];

const leyesPesca = [
    {
        tipo: 'recreativa',
        titulo: 'Ley de Pesca Recreativa',
        contenido: 'Regulaciones específicas para la pesca recreativa...',
        fecha: '2024-01-01'
    },
    {
        tipo: 'comercial',
        titulo: 'Ley de Pesca Comercial',
        contenido: 'Normativas para la pesca comercial...',
        fecha: '2024-01-01'
    },
    {
        tipo: 'deportiva',
        titulo: 'Ley de Pesca Deportiva',
        contenido: 'Regulaciones para competencias de pesca...',
        fecha: '2024-01-01'
    }
];

const tipsEcologicos = [
    'No arrojar residuos al mar',
    'Respetar las tallas mínimas de pesca',
    'Usar anzuelos sin plomo',
    'Liberar peces no deseados con cuidado'
];

const tipsSeguridad = [
    'Siempre usar chaleco salvavidas',
    'Verificar el pronóstico del tiempo',
    'Llevar equipo de primeros auxilios',
    'Informar a alguien sobre tu ubicación'
];

// Fishing Spots Data
const lugaresPesca = [
    {
        nombre: 'Playa Cavancha',
        descripcion: 'Uno de los lugares más populares para la pesca recreativa en Iquique.',
        especies: [
            { nombre: 'Corvina', temporada: 'Todo el año', tipo: 'recreativa' },
            { nombre: 'Lenguado', temporada: 'Primavera', tipo: 'recreativa' },
            { nombre: 'Róbalo', temporada: 'Verano', tipo: 'recreativa' }
        ]
    },
    {
        nombre: 'Punta Gruesa',
        descripcion: 'Ideal para pesca desde rocas y embarcaciones.',
        especies: [
            { nombre: 'Sierra', temporada: 'Todo el año', tipo: 'deportiva' },
            { nombre: 'Jurel', temporada: 'Otoño', tipo: 'deportiva' },
            { nombre: 'Atún', temporada: 'Verano', tipo: 'deportiva' }
        ]
    },
    {
        nombre: 'Caleta Riquelme',
        descripcion: 'Excelente lugar para pesca desde el muelle y embarcaciones.',
        especies: [
            { nombre: 'Congrio', temporada: 'Invierno', tipo: 'comercial' },
            { nombre: 'Merluza', temporada: 'Todo el año', tipo: 'comercial' },
            { nombre: 'Reineta', temporada: 'Primavera', tipo: 'comercial' }
        ]
    },
    {
        nombre: 'Playa Brava',
        descripcion: 'Conocida por sus olas y excelente pesca deportiva.',
        especies: [
            { nombre: 'Pez Espada', temporada: 'Verano', tipo: 'deportiva' },
            { nombre: 'Albacora', temporada: 'Primavera', tipo: 'deportiva' },
            { nombre: 'Dorado', temporada: 'Otoño', tipo: 'deportiva' }
        ]
    }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarNoticias();
    cargarLeyes();
    cargarTips();
    inicializarChat();
    actualizarClima();
    cargarLugaresPesca();
    
    // Add event listeners for fishing spots filters
    const filtroTemporada = document.getElementById('filtro-temporada');
    const filtroTipoPescaLugar = document.getElementById('filtro-tipo-pesca-lugar');
    
    filtroTemporada?.addEventListener('change', () => {
        filtrarLugaresPesca(filtroTemporada.value, filtroTipoPescaLugar?.value);
    });
    
    filtroTipoPescaLugar?.addEventListener('change', () => {
        filtrarLugaresPesca(filtroTemporada?.value, filtroTipoPescaLugar.value);
    });
});

loginForm?.addEventListener('submit', handleLogin);
registerForm?.addEventListener('submit', handleRegister);
chatForm?.addEventListener('submit', handleChatMessage);
filtroTipoPesca?.addEventListener('change', filtrarLeyes);

// Functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulated login
    console.log('Login attempt:', { email, password });
    alert('Inicio de sesión exitoso');
    $('#loginModal').modal('hide');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const whatsapp = document.getElementById('register-whatsapp').value;
    const password = document.getElementById('register-password').value;
    
    // Simulated registration
    console.log('Registration:', { name, email, phone, whatsapp, password });
    alert('Registro exitoso');
    $('#registerModal').modal('hide');
}

function cargarNoticias() {
    if (!noticiasContainer) return;
    
    noticiasContainer.innerHTML = noticias.map(noticia => `
        <div class="col-md-4 mb-4">
            <div class="card news-card fade-in">
                <img src="${noticia.imagen}" class="card-img-top" alt="${noticia.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${noticia.titulo}</h5>
                    <p class="card-text">${noticia.contenido}</p>
                    <p class="card-text"><small class="text-muted">${noticia.fecha}</small></p>
                </div>
            </div>
        </div>
    `).join('');
}

function cargarLeyes() {
    if (!leyesContainer) return;
    
    leyesContainer.innerHTML = leyesPesca.map(ley => `
        <div class="card mb-3 fade-in" data-tipo="${ley.tipo}">
            <div class="card-body">
                <h5 class="card-title">${ley.titulo}</h5>
                <p class="card-text">${ley.contenido}</p>
                <p class="card-text"><small class="text-muted">Actualizado: ${ley.fecha}</small></p>
            </div>
        </div>
    `).join('');
}

function filtrarLeyes() {
    const tipo = filtroTipoPesca.value;
    const leyes = document.querySelectorAll('#leyes-container .card');
    
    leyes.forEach(ley => {
        if (!tipo || ley.dataset.tipo === tipo) {
            ley.style.display = 'block';
        } else {
            ley.style.display = 'none';
        }
    });
}

function cargarTips() {
    const tipsEcologicosContainer = document.getElementById('tips-ecologicos');
    const tipsSeguridadContainer = document.getElementById('tips-seguridad');
    
    if (tipsEcologicosContainer) {
        tipsEcologicosContainer.innerHTML = tipsEcologicos.map(tip => `
            <div class="tip-item fade-in">
                <i class="fas fa-leaf text-success me-2"></i>
                ${tip}
            </div>
        `).join('');
    }
    
    if (tipsSeguridadContainer) {
        tipsSeguridadContainer.innerHTML = tipsSeguridad.map(tip => `
            <div class="tip-item fade-in">
                <i class="fas fa-shield-alt text-primary me-2"></i>
                ${tip}
            </div>
        `).join('');
    }
}

function inicializarChat() {
    if (!chatContainer) return;
    
    // Simulated connected users
    const usuarios = ['Juan Pérez', 'María González', 'Carlos Rodríguez'];
    usuariosConectados.innerHTML = usuarios.map(usuario => `
        <li class="list-group-item">
            <i class="fas fa-circle text-success me-2"></i>
            ${usuario}
        </li>
    `).join('');
}

function handleChatMessage(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const mensaje = input.value.trim();
    
    if (mensaje) {
        const mensajeHTML = `
            <div class="chat-message mb-2">
                <strong>Tú:</strong> ${mensaje}
            </div>
        `;
        chatContainer.innerHTML += mensajeHTML;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        input.value = '';
    }
}

async function actualizarClima() {
    if (!climaActual) return;
    
    try {
        const API_KEY = 'd73f018b58d0ffe9d1ca6bf39665427b';
        const CIUDAD = 'Iquique,CL';
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&appid=${API_KEY}&units=metric&lang=es`;

        const response = await fetch(URL);
        const data = await response.json();

        if (data.cod === 200) {
            const temperatura = Math.round(data.main.temp);
            const descripcion = data.weather[0].description;
            const humedad = data.main.humidity;
            const viento = Math.round(data.wind.speed * 3.6); // Convertir m/s a km/h
            const icono = data.weather[0].icon;
            
            climaActual.innerHTML = `
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="${descripcion}">
                </div>
                <h3>${temperatura}°C</h3>
                <p class="text-capitalize">${descripcion}</p>
                <div class="row mt-3">
                    <div class="col-6">
                        <p><i class="fas fa-tint"></i> Humedad: ${humedad}%</p>
                    </div>
                    <div class="col-6">
                        <p><i class="fas fa-wind"></i> Viento: ${viento} km/h</p>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-6">
                        <p><i class="fas fa-temperature-high"></i> Máx: ${Math.round(data.main.temp_max)}°C</p>
                    </div>
                    <div class="col-6">
                        <p><i class="fas fa-temperature-low"></i> Mín: ${Math.round(data.main.temp_min)}°C</p>
                    </div>
                </div>
                <p class="text-muted mt-3"><small>Última actualización: ${new Date().toLocaleTimeString()}</small></p>
            `;
        } else {
            throw new Error('Error al obtener datos del clima');
        }
    } catch (error) {
        console.error('Error al obtener el clima:', error);
        climaActual.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle"></i>
                No se pudo cargar la información del clima
            </div>
        `;
    }
}

// Actualizar el clima cada 30 minutos
setInterval(actualizarClima, 30 * 60 * 1000);

// Call map initialization
// function initMap() { ... }

// Add new function for loading fishing spots
function cargarLugaresPesca() {
    const lugaresContainer = document.getElementById('lugares-pesca');
    if (!lugaresContainer) return;

    const lugaresHTML = lugaresPesca.map(lugar => `
        <div class="col-md-6 mb-4">
            <div class="card h-100 fade-in">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="fas fa-map-marked-alt text-primary"></i> ${lugar.nombre}
                    </h5>
                    <p class="card-text">${lugar.descripcion}</p>
                    <h6 class="mt-3">Especies comunes:</h6>
                    <ul class="list-group list-group-flush">
                        ${lugar.especies.map(especie => `
                            <li class="list-group-item" data-temporada="${especie.temporada}" data-tipo="${especie.tipo}">
                                <i class="fas fa-fish text-info"></i> ${especie.nombre}
                                <span class="badge bg-info float-end">${especie.temporada}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `).join('');

    lugaresContainer.querySelector('.row').innerHTML = lugaresHTML;
}

// Add filter functionality
function filtrarLugaresPesca(temporada, tipo) {
    const especies = document.querySelectorAll('#lugares-pesca .list-group-item');
    
    especies.forEach(especie => {
        const especieTemporada = especie.dataset.temporada;
        const especieTipo = especie.dataset.tipo;
        
        const cumpleTemporada = !temporada || especieTemporada === temporada;
        const cumpleTipo = !tipo || especieTipo === tipo;
        
        especie.style.display = cumpleTemporada && cumpleTipo ? 'block' : 'none';
    });
} 