const API_BASE = 'http://localhost:3000';
let currentToken = localStorage.getItem('blogToken');

// Elementos del DOM
const authSection = document.getElementById('auth-section');
const postsSection = document.getElementById('posts-section');
const authStatus = document.getElementById('auth-status');
const healthStatus = document.getElementById('health-status');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    checkAuthenticationStatus();
    setupEventListeners();
    checkHealth();
});

function setupEventListeners() {
    // Formulario de registro
    document.getElementById('register-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleRegister();
    });

    // Formulario de login
    document.getElementById('login-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleLogin();
    });

    // Formulario de creación de posts
    document.getElementById('create-post-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleCreatePost();
    });
}

async function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentToken = data.data.token;
            localStorage.setItem('blogToken', currentToken);
            showAuthStatus('✅ Registro exitoso!', 'success');
            checkAuthenticationStatus();
            document.getElementById('register-form').reset();
        } else {
            showAuthStatus(`❌ Error: ${data.message}`, 'error');
        }
    } catch (error) {
        showAuthStatus('❌ Error de conexión', 'error');
    }
}

async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            currentToken = data.data.token;
            localStorage.setItem('blogToken', currentToken);
            showAuthStatus('✅ Login exitoso!', 'success');
            checkAuthenticationStatus();
            document.getElementById('login-form').reset();
        } else {
            showAuthStatus(`❌ Error: ${data.message}`, 'error');
        }
    } catch (error) {
        showAuthStatus('❌ Error de conexión', 'error');
    }
}

async function handleCreatePost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    try {
        const response = await fetch(`${API_BASE}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();

        if (response.ok) {
            showAuthStatus('✅ Post creado exitosamente!', 'success');
            document.getElementById('create-post-form').reset();
            loadPosts();
        } else {
            showAuthStatus(`❌ Error: ${data.message}`, 'error');
        }
    } catch (error) {
        showAuthStatus('❌ Error de conexión', 'error');
    }
}

async function loadPosts() {
    try {
        const response = await fetch(`${API_BASE}/posts`);
        const data = await response.json();

        if (response.ok) {
            displayPosts(data.data);
        }
    } catch (error) {
        console.error('Error cargando posts:', error);
    }
}

function displayPosts(posts) {
    const postsList = document.getElementById('posts-list');
    
    if (posts.length === 0) {
        postsList.innerHTML = '<p>No hay posts disponibles.</p>';
        return;
    }

    postsList.innerHTML = posts.map(post => `
        <div class="post">
            <h3>${escapeHtml(post.title)}</h3>
            <div class="post-meta">
                <strong>Autor:</strong> ${escapeHtml(post.author)} | 
                <strong>Fecha:</strong> ${new Date(post.createdAt).toLocaleDateString()}
            </div>
            <p>${escapeHtml(post.content)}</p>
        </div>
    `).join('');
}

function checkAuthenticationStatus() {
    if (currentToken) {
        authSection.style.display = 'none';
        postsSection.style.display = 'block';
        loadPosts();
    } else {
        authSection.style.display = 'block';
        postsSection.style.display = 'none';
    }
}

async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE}/health`);
        const data = await response.json();
        
        if (response.ok) {
            healthStatus.innerHTML = `
                <div class="status success">
                    <strong>✅ Servidor funcionando</strong><br>
                    ${data.message}<br>
                    Base de datos: ${data.database}
                </div>
            `;
        } else {
            healthStatus.innerHTML = '<div class="status error">❌ Servidor no disponible</div>';
        }
    } catch (error) {
        healthStatus.innerHTML = '<div class="status error">❌ Error conectando al servidor</div>';
    }
}

function showAuthStatus(message, type) {
    authStatus.innerHTML = `<div class="status ${type}">${message}</div>`;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Función para logout (puedes agregar un botón después)
function logout() {
    localStorage.removeItem('blogToken');
    currentToken = null;
    checkAuthenticationStatus();
    showAuthStatus('👋 Sesión cerrada', 'info');
}
