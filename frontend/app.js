const API_BASE = 'http://localhost:3000';
let currentToken = localStorage.getItem('blogToken');
let currentUser = null;

// Elementos del DOM
const authSection = document.getElementById('auth-section');
const postsSection = document.getElementById('posts-section');
const authStatus = document.getElementById('auth-status');
const healthStatus = document.getElementById('health-status');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación iniciada');
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    await checkHealth();
    await checkAuthenticationStatus();
}

function setupEventListeners() {
    document.getElementById('register-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleRegister();
    });

    document.getElementById('login-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleLogin();
    });

    document.getElementById('create-post-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleCreatePost();
    });

    document.getElementById('edit-post-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleEditPost(e);
    });
}

// AUTENTICACIÓN - FLUJO CORREGIDO
async function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    showAuthStatus('⏳ Registrando usuario...', 'info');

    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        console.log('🔐 Respuesta registro:', data);

        if (response.ok && data.success) {
            currentToken = data.data.token;
            localStorage.setItem('blogToken', currentToken);
            showAuthStatus('✅ ¡Registro exitoso!', 'success');
            
            // Guardar información del usuario
            currentUser = data.data.user;
            localStorage.setItem('blogUser', JSON.stringify(currentUser));
            
            // Redirigir a la sección de posts
            showPostsSection();
            
        } else {
            showAuthStatus(`❌ Error: ${data.message || 'Error en el registro'}`, 'error');
        }
    } catch (error) {
        console.error('Error en registro:', error);
        showAuthStatus('❌ Error de conexión con el servidor', 'error');
    }
}

async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    showAuthStatus('⏳ Iniciando sesión...', 'info');

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('🔐 Respuesta login:', data);

        if (response.ok && data.success) {
            currentToken = data.data.token;
            localStorage.setItem('blogToken', currentToken);
            showAuthStatus('✅ ¡Login exitoso!', 'success');
            
            // Guardar información del usuario
            currentUser = data.data.user;
            localStorage.setItem('blogUser', JSON.stringify(currentUser));
            
            // Redirigir a la sección de posts
            showPostsSection();
            
        } else {
            showAuthStatus(`❌ Error: ${data.message || 'Credenciales incorrectas'}`, 'error');
        }
    } catch (error) {
        console.error('Error en login:', error);
        showAuthStatus('❌ Error de conexión con el servidor', 'error');
    }
}

// GESTIÓN DE SECCIONES
function showAuthSection() {
    authSection.style.display = 'block';
    postsSection.style.display = 'none';
    console.log('🔐 Mostrando sección de autenticación');
}

function showPostsSection() {
    authSection.style.display = 'none';
    postsSection.style.display = 'block';
    console.log('📄 Mostrando sección de posts');
    
    // Cargar datos
    loadPosts();
}

async function checkAuthenticationStatus() {
    console.log('🔍 Verificando autenticación...');
    
    if (currentToken) {
        console.log('✅ Token encontrado en localStorage');
        
        // Intentar cargar el perfil para verificar el token
        try {
            const userData = localStorage.getItem('blogUser');
            if (userData) {
                currentUser = JSON.parse(userData);
                console.log('👤 Usuario cargado desde localStorage:', currentUser);
            }
            
            // Verificar el token con el servidor
            await verifyToken();
            showPostsSection();
            return;
        } catch (error) {
            console.log('❌ Token inválido:', error);
        }
    }
    
    // Si no hay token o es inválido, mostrar auth
    console.log('❌ No hay token válido, mostrando login');
    showAuthSection();
}

// VERIFICAR TOKEN CON SERVIDOR
async function verifyToken() {
    if (!currentToken) {
        throw new Error('No hay token');
    }

    try {
        console.log('🔐 Verificando token con servidor...');
        const response = await fetch(`${API_BASE}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Token válido, perfil:', data.data);
            return true;
        } else {
            console.error('❌ Token inválido, respuesta:', response.status);
            // Token inválido, limpiar
            localStorage.removeItem('blogToken');
            localStorage.removeItem('blogUser');
            currentToken = null;
            currentUser = null;
            throw new Error('Token inválido');
        }
    } catch (error) {
        console.error('❌ Error verificando token:', error);
        throw error;
    }
}

// GESTIÓN DE POSTS
async function handleCreatePost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    if (!title || !content) {
        showAuthStatus('❌ Título y contenido son requeridos', 'error');
        return;
    }

    try {
        showAuthStatus('⏳ Creando post...', 'info');
        
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
            showAuthStatus('✅ ¡Post creado exitosamente!', 'success');
            document.getElementById('create-post-form').reset();
            await loadPosts();
        } else {
            showAuthStatus(`❌ Error: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Error creando post:', error);
        showAuthStatus('❌ Error de conexión', 'error');
    }
}

async function loadPosts() {
    try {
        console.log('📥 Cargando posts...');
        const response = await fetch(`${API_BASE}/posts`);
        const data = await response.json();

        if (response.ok) {
            console.log(`📚 Se cargaron ${data.data.length} posts`);
            displayPosts(data.data);
        } else {
            console.error('Error en respuesta de posts:', data);
        }
    } catch (error) {
        console.error('Error cargando posts:', error);
    }
}

function displayPosts(posts) {
    const postsList = document.getElementById('posts-list');
    
    if (!posts || posts.length === 0) {
        postsList.innerHTML = '<p>No hay posts disponibles. ¡Sé el primero en crear uno!</p>';
        return;
    }

    postsList.innerHTML = posts.map(post => {
        const isOwner = currentUser && post.userId === currentUser.id;
        
        return `
        <div class="post" data-post-id="${post.id}">
            <h3>${escapeHtml(post.title)}</h3>
            <div class="post-meta">
                <strong>Autor:</strong> ${escapeHtml(post.author)} 
                ${isOwner ? '<span class="owner-badge">(Tú)</span>' : ''} | 
                <strong>Fecha:</strong> ${new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div class="post-content">${post.content}</div>
            
            ${isOwner ? `
            <div class="post-actions">
                <button onclick="startEditPost(${post.id})" class="btn-edit">✏️ Editar</button>
                <button onclick="deletePost(${post.id})" class="btn-delete">🗑️ Eliminar</button>
            </div>
            ` : ''}
        </div>
        `;
    }).join('');
}

// EDITOR DE POSTS
function startEditPost(postId) {
    // Buscar el post en la lista actual
    const postElements = document.querySelectorAll('.post');
    let post = null;
    
    for (let element of postElements) {
        if (parseInt(element.dataset.postId) === postId) {
            const title = element.querySelector('h3').textContent;
            const content = element.querySelector('.post-content').innerHTML;
            
            // Mostrar editor, ocultar creador
            document.getElementById('create-post-container').style.display = 'none';
            document.getElementById('edit-post-section').style.display = 'block';
            
            // Llenar datos
            document.getElementById('edit-post-id').value = postId;
            document.getElementById('edit-post-title').value = title;
            document.getElementById('edit-post-content').innerHTML = content;
            
            // Scroll suave
            document.getElementById('edit-post-section').scrollIntoView({ behavior: 'smooth' });
            return;
        }
    }
    
    showAuthStatus('❌ No se pudo encontrar el post', 'error');
}

function cancelEdit() {
    document.getElementById('edit-post-form').reset();
    document.getElementById('edit-post-content').innerHTML = '';
    document.getElementById('edit-post-section').style.display = 'none';
    document.getElementById('create-post-container').style.display = 'block';
}

async function handleEditPost(e) {
    e.preventDefault();
    
    const postId = document.getElementById('edit-post-id').value;
    const title = document.getElementById('edit-post-title').value;
    const content = document.getElementById('edit-post-content').innerHTML;

    if (!title || !content) {
        showAuthStatus('❌ Título y contenido son requeridos', 'error');
        return;
    }

    try {
        showAuthStatus('⏳ Actualizando post...', 'info');
        
        const response = await fetch(`${API_BASE}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();

        if (response.ok) {
            showAuthStatus('✅ ¡Post actualizado exitosamente!', 'success');
            cancelEdit();
            await loadPosts();
        } else {
            showAuthStatus(`❌ Error: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Error actualizando post:', error);
        showAuthStatus('❌ Error de conexión', 'error');
    }
}

async function deletePost(postId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este post? Esta acción no se puede deshacer.')) {
        return;
    }

    try {
        showAuthStatus('⏳ Eliminando post...', 'info');
        
        const response = await fetch(`${API_BASE}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            showAuthStatus('✅ ¡Post eliminado exitosamente!', 'success');
            await loadPosts();
        } else {
            showAuthStatus(`❌ Error: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Error eliminando post:', error);
        showAuthStatus('❌ Error de conexión', 'error');
    }
}

// HERRAMIENTAS DEL EDITOR
function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('edit-post-content').focus();
}

function changeFontSize(size) {
    if (size) document.execCommand('fontSize', false, size);
}

function changeFontFamily(font) {
    if (font) document.execCommand('fontName', false, font);
}

function insertImage() {
    const url = prompt('Ingresa la URL de la imagen:');
    if (url) {
        document.execCommand('insertImage', false, url);
    }
}

// UTILIDADES
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
    
    // Auto-ocultar mensajes de éxito
    if (type === 'success') {
        setTimeout(() => {
            if (authStatus.innerHTML.includes(message)) {
                authStatus.innerHTML = '';
            }
        }, 3000);
    }
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// LOGOUT
function logout() {
    console.log('🚪 Cerrando sesión...');
    localStorage.removeItem('blogToken');
    localStorage.removeItem('blogUser');
    currentToken = null;
    currentUser = null;
    showAuthSection();
    showAuthStatus('👋 Sesión cerrada correctamente', 'info');
}

// DEBUG
function debugAuth() {
    console.log('=== DEBUG ===');
    console.log('Token:', currentToken);
    console.log('Usuario:', currentUser);
    console.log('Auth section visible:', authSection.style.display !== 'none');
    console.log('Posts section visible:', postsSection.style.display !== 'none');
    console.log('==================');
}