<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Blog API - Full Stack Application</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #B0E0E6 100%);
            background-attachment: fixed;
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.85);
            border-radius: 20px;
            box-shadow: 
                0 8px 32px rgba(31, 38, 135, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            position: relative;
            overflow: hidden;
        }

        header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #00BFFF, #32CD32, #1E90FF);
        }

        header h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 2.5rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            background: linear-gradient(135deg, #1E90FF, #32CD32);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        header p {
            color: #5D6D7E;
            font-size: 1.1rem;
        }

        .section {
            background: rgba(255, 255, 255, 0.8);
            padding: 30px;
            margin-bottom: 30px;
            border-radius: 20px;
            box-shadow: 
                0 8px 32px rgba(31, 38, 135, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            position: relative;
            overflow: hidden;
        }

        .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #00CED1, #20B2AA, #40E0D0);
        }

        .section h2 {
            color: #2c3e50;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid;
            border-image: linear-gradient(90deg, #00BFFF, #32CD32) 1;
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .auth-forms {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

        .form-container {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 255, 0.8) 100%);
            padding: 25px;
            border-radius: 15px;
            box-shadow: 
                0 6px 20px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.5);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .form-container:hover {
            transform: translateY(-5px);
            box-shadow: 
                0 12px 25px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .form-container h3 {
            margin-bottom: 20px;
            color: #2c3e50;
            font-size: 1.4rem;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 2px solid;
            border-image: linear-gradient(90deg, #00BFFF, #32CD32) 1;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        input, textarea {
            padding: 14px;
            border: 1px solid rgba(0, 191, 255, 0.3);
            border-radius: 12px;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: #00BFFF;
            box-shadow: 
                0 0 0 3px rgba(0, 191, 255, 0.2),
                inset 0 2px 4px rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 1);
        }

        textarea {
            min-height: 120px;
            resize: vertical;
        }

        button {
            padding: 14px 24px;
            background: linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 
                0 4px 15px rgba(30, 144, 255, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            position: relative;
            overflow: hidden;
        }

        button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 
                0 6px 20px rgba(30, 144, 255, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            background: linear-gradient(135deg, #1E90FF 0%, #00BFFF 100%);
        }

        button:hover::before {
            left: 100%;
        }

        button:active {
            transform: translateY(0);
        }

        button[style*="background: #6c757d"] {
            background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
            box-shadow: 
                0 4px 15px rgba(108, 117, 125, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        button[style*="background: #6c757d"]:hover {
            background: linear-gradient(135deg, #5a6268 0%, #6c757d 100%);
            box-shadow: 
                0 6px 20px rgba(108, 117, 125, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        button[style*="background: #dc3545"] {
            background: linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%);
            box-shadow: 
                0 4px 15px rgba(255, 107, 107, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        button[style*="background: #dc3545"]:hover {
            background: linear-gradient(135deg, #FF4757 0%, #FF6B6B 100%);
            box-shadow: 
                0 6px 20px rgba(255, 107, 107, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .status {
            margin-top: 20px;
            padding: 20px;
            border-radius: 15px;
            font-weight: 500;
            box-shadow: 
                0 4px 15px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .status.success {
            background: linear-gradient(135deg, rgba(212, 237, 218, 0.9) 0%, rgba(195, 230, 203, 0.8) 100%);
            color: #155724;
            border-left: 5px solid #28a745;
        }

        .status.error {
            background: linear-gradient(135deg, rgba(248, 215, 218, 0.9) 0%, rgba(245, 198, 203, 0.8) 100%);
            color: #721c24;
            border-left: 5px solid #dc3545;
        }

        .status.info {
            background: linear-gradient(135deg, rgba(209, 236, 241, 0.9) 0%, rgba(190, 229, 235, 0.8) 100%);
            color: #0c5460;
            border-left: 5px solid #17a2b8;
        }

        .posts-list {
            display: grid;
            gap: 25px;
            margin-top: 25px;
        }

        .post {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 255, 0.8) 100%);
            padding: 25px;
            border-radius: 18px;
            box-shadow: 
                0 6px 20px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-left: 6px solid;
            border-image: linear-gradient(180deg, #00BFFF, #32CD32) 1;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .post:hover {
            transform: translateY(-5px);
            box-shadow: 
                0 12px 25px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .post h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.5rem;
            border-bottom: 2px solid;
            border-image: linear-gradient(90deg, #00BFFF, transparent) 1;
            padding-bottom: 8px;
        }

        .post-meta {
            font-size: 14px;
            color: #5D6D7E;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .editor-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 15px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 255, 0.8) 100%);
            border: 1px solid rgba(0, 191, 255, 0.3);
            border-bottom: none;
            border-radius: 15px 15px 0 0;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .editor-toolbar button,
        .editor-toolbar select {
            padding: 10px 14px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 191, 255, 0.3);
            border-radius: 10px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .editor-toolbar button:hover,
        .editor-toolbar select:hover {
            background: rgba(255, 255, 255, 1);
            border-color: #00BFFF;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .rich-editor {
            min-height: 250px;
            padding: 20px;
            border: 1px solid rgba(0, 191, 255, 0.3);
            border-radius: 0 0 15px 15px;
            background: rgba(255, 255, 255, 0.9);
            font-family: inherit;
            line-height: 1.7;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .rich-editor:focus {
            outline: none;
            border-color: #00BFFF;
            box-shadow: 
                0 0 0 3px rgba(0, 191, 255, 0.2),
                inset 0 2px 4px rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 1);
        }

        .post-actions {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid;
            border-image: linear-gradient(90deg, #00BFFF, transparent) 1;
            display: flex;
            gap: 12px;
        }

        .btn-edit, .btn-delete {
            padding: 10px 18px;
            font-size: 14px;
            border-radius: 10px;
            transition: all 0.3s ease;
            font-weight: 600;
            box-shadow: 
                0 4px 10px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-edit {
            background: linear-gradient(135deg, #32CD32 0%, #28a745 100%);
            color: white;
        }

        .btn-edit:hover {
            background: linear-gradient(135deg, #28a745 0%, #32CD32 100%);
            transform: translateY(-2px);
            box-shadow: 
                0 6px 15px rgba(40, 167, 69, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-delete {
            background: linear-gradient(135deg, #FF6B6B 0%, #dc3545 100%);
            color: white;
        }

        .btn-delete:hover {
            background: linear-gradient(135deg, #dc3545 0%, #FF6B6B 100%);
            transform: translateY(-2px);
            box-shadow: 
                0 6px 15px rgba(220, 53, 69, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .owner-badge {
            background: linear-gradient(135deg, #00BFFF, #1E90FF);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            box-shadow: 0 2px 5px rgba(0, 191, 255, 0.3);
        }

        .post-content {
            line-height: 1.8;
            white-space: pre-wrap;
            color: #2c3e50;
        }

        .post-content img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 15px 0;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .post-content ul, .post-content ol {
            margin-left: 25px;
            margin-bottom: 15px;
        }

        .post-content strong {
            font-weight: bold;
            color: #2c3e50;
            background: linear-gradient(135deg, #00BFFF, #32CD32);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .post-content em {
            font-style: italic;
            color: #5D6D7E;
        }

        .post-content u {
            text-decoration: underline;
            text-decoration-color: #00BFFF;
        }

        #edit-post-section {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 255, 255, 0.9) 100%);
            padding: 25px;
            border-radius: 18px;
            border: 2px solid;
            border-image: linear-gradient(135deg, #00BFFF, #32CD32) 1;
            margin-bottom: 25px;
            box-shadow: 
                0 8px 25px rgba(0, 191, 255, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 768px) {
            .auth-forms {
                grid-template-columns: 1fr;
            }
            
            .editor-toolbar {
                gap: 5px;
            }
            
            .editor-toolbar button,
            .editor-toolbar select {
                padding: 8px 10px;
                font-size: 12px;
            }
            
            .post-actions {
                flex-direction: column;
            }
            
            .btn-edit, .btn-delete {
                width: 100%;
            }
            
            .section {
                padding: 20px;
            }
            
            header h1 {
                font-size: 2rem;
            }
        }

        .loading {
            opacity: 0.7;
            pointer-events: none;
            position: relative;
        }

        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
            margin: -15px 0 0 -15px;
            border: 3px solid rgba(0, 191, 255, 0.3);
            border-top: 3px solid #00BFFF;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .post-content h1, .post-content h2, .post-content h3 {
            color: #2c3e50;
            margin: 20px 0 15px 0;
            border-bottom: 2px solid;
            border-image: linear-gradient(90deg, #00BFFF, transparent) 1;
            padding-bottom: 8px;
        }

        .post-content blockquote {
            border-left: 5px solid;
            border-image: linear-gradient(180deg, #00BFFF, #32CD32) 1;
            padding-left: 20px;
            margin: 20px 0;
            color: #5D6D7E;
            font-style: italic;
            background: linear-gradient(135deg, rgba(240, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%);
            padding: 15px;
            border-radius: 0 12px 12px 0;
        }

        .post-content code {
            background: linear-gradient(135deg, rgba(240, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
            padding: 4px 10px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            border: 1px solid rgba(0, 191, 255, 0.2);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section, .form-container, .post {
            position: relative;
        }

        .section::after, .form-container::after, .post::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: inherit;
            pointer-events: none;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
            opacity: 0.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📝 Personal Blog API</h1>
            <p>Full Stack Application - 100% Local Development</p>
        </header>

        <!-- Sección de Autenticación -->
        <section id="auth-section" class="section">
            <h2>🔐 Authentication</h2>
            <div class="auth-forms">
                <div class="form-container">
                    <h3>Register</h3>
                    <form id="register-form">
                        <input type="text" id="register-name" placeholder="Full Name" required>
                        <input type="email" id="register-email" placeholder="Email" required>
                        <input type="password" id="register-password" placeholder="Password" required>
                        <button type="submit">📝 Register</button>
                    </form>
                </div>
                
                <div class="form-container">
                    <h3>Login</h3>
                    <form id="login-form">
                        <input type="email" id="login-email" placeholder="Email" required>
                        <input type="password" id="login-password" placeholder="Password" required>
                        <button type="submit">🔑 Login</button>
                    </form>
                </div>
            </div>
            <div id="auth-status" class="status"></div>
        </section>

        <!-- Sección de Posts -->
        <section id="posts-section" class="section" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">📄 My Posts</h2>
                <button onclick="logout()" style="background: #6c757d;">🚪 Logout</button>
            </div>

            <!-- Formulario de Edición -->
            <div id="edit-post-section" class="form-container" style="display: none; border: 2px solid #3498db;">
                <h3>✏️ Editing Post</h3>
                <form id="edit-post-form">
                    <input type="hidden" id="edit-post-id">
                    <input type="text" id="edit-post-title" placeholder="Post Title" required>
                    
                    <!-- Editor enriquecido -->
                    <div class="editor-toolbar">
                        <button type="button" onclick="formatText('bold')" title="Bold"><strong>B</strong></button>
                        <button type="button" onclick="formatText('italic')" title="Italic"><em>I</em></button>
                        <button type="button" onclick="formatText('underline')" title="Underline"><u>U</u></button>
                        <button type="button" onclick="formatText('insertUnorderedList')" title="Bullet List">• List</button>
                        <button type="button" onclick="formatText('insertOrderedList')" title="Numbered List">1. List</button>
                        <select onchange="changeFontSize(this.value)" title="Font Size">
                            <option value="">Size</option>
                            <option value="1">Small</option>
                            <option value="3">Normal</option>
                            <option value="5">Large</option>
                            <option value="7">X-Large</option>
                        </select>
                        <select onchange="changeFontFamily(this.value)" title="Font Family">
                            <option value="">Font</option>
                            <option value="Arial, sans-serif">Arial</option>
                            <option value="Georgia, serif">Georgia</option>
                            <option value="'Times New Roman', serif">Times New Roman</option>
                            <option value="'Courier New', monospace">Courier New</option>
                        </select>
                        <button type="button" onclick="insertImage()" title="Insert Image">🖼️ Image</button>
                        <button type="button" onclick="formatText('removeFormat')" title="Clear Format">🧹 Clear</button>
                    </div>
                    
                    <div id="edit-post-content" contenteditable="true" class="rich-editor" placeholder="Write your post content here..."></div>
                    
                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <button type="submit">✅ Save Changes</button>
                        <button type="button" onclick="cancelEdit()" style="background: #6c757d;">❌ Cancel Edit</button>
                    </div>
                </form>
            </div>

            <!-- Formulario para Crear Nuevo Post -->
            <div id="create-post-container" class="form-container">
                <h3>📝 Create New Post</h3>
                <form id="create-post-form">
                    <input type="text" id="post-title" placeholder="Post Title" required>
                    <textarea id="post-content" placeholder="Post content (you can use basic formatting)" required></textarea>
                    <button type="submit">📤 Publish Post</button>
                </form>
            </div>

            <!-- Lista de Posts -->
            <div class="posts-container">
                <h3>📚 All Posts</h3>
                <div id="posts-list" class="posts-list">
                    <p>Loading posts...</p>
                </div>
            </div>
        </section>

        <!-- Administración del Sistema -->
        <section class="section">
            <h2>⚙️ System Administration</h2>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <button onclick="checkHealth()">🩺 Check Status</button>
                <button onclick="resetCompleteSystem()" style="background: #dc3545;">
                    🔄 Clear Local Data & Database
                </button>
            </div>
            <div id="health-status" class="status" style="margin-top: 15px;"></div>
        </section>

        <!-- Información del Usuario -->
        <section id="user-info-section" class="section" style="display: none;">
            <h2>👤 User Information</h2>
            <div id="user-info" class="status info">
                <p><strong>ID:</strong> <span id="user-id">-</span></p>
                <p><strong>Name:</strong> <span id="user-name">-</span></p>
                <p><strong>Email:</strong> <span id="user-email">-</span></p>
                <p><strong>Registered:</strong> <span id="user-created">-</span></p>
            </div>
        </section>
    </div>

    <script>
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
            console.log('🚀 Application started');
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

        // AUTENTICACIÓN
        async function handleRegister() {
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            showAuthStatus('⏳ Registering user...', 'info');

            try {
                const response = await fetch(`${API_BASE}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();
                console.log('🔐 Register response:', data);

                if (response.ok && data.success) {
                    currentToken = data.data.token;
                    localStorage.setItem('blogToken', currentToken);
                    showAuthStatus('✅ Registration successful!', 'success');
                    
                    // Guardar información del usuario
                    currentUser = data.data.user;
                    localStorage.setItem('blogUser', JSON.stringify(currentUser));
                    
                    // Redirigir a la sección de posts
                    showPostsSection();
                    
                } else {
                    showAuthStatus(`❌ Error: ${data.message || 'Registration error'}`, 'error');
                }
            } catch (error) {
                console.error('Error in registration:', error);
                showAuthStatus('❌ Server connection error', 'error');
            }
        }

        async function handleLogin() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            showAuthStatus('⏳ Logging in...', 'info');

            try {
                const response = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log('🔐 Login response:', data);

                if (response.ok && data.success) {
                    currentToken = data.data.token;
                    localStorage.setItem('blogToken', currentToken);
                    showAuthStatus('✅ Login successful!', 'success');
                    
                    // Guardar información del usuario
                    currentUser = data.data.user;
                    localStorage.setItem('blogUser', JSON.stringify(currentUser));
                    
                    // Redirigir a la sección de posts
                    showPostsSection();
                    
                } else {
                    showAuthStatus(`❌ Error: ${data.message || 'Invalid credentials'}`, 'error');
                }
            } catch (error) {
                console.error('Error in login:', error);
                showAuthStatus('❌ Server connection error', 'error');
            }
        }

        // GESTIÓN DE SECCIONES
        function showAuthSection() {
            authSection.style.display = 'block';
            postsSection.style.display = 'none';
            console.log('🔐 Showing authentication section');
        }

        function showPostsSection() {
            authSection.style.display = 'none';
            postsSection.style.display = 'block';
            console.log('📄 Showing posts section');
            
            // Cargar datos
            loadPosts();
        }

        async function checkAuthenticationStatus() {
            console.log('🔍 Checking authentication...');
            
            if (currentToken) {
                console.log('✅ Token found in localStorage');
                
                // Intentar cargar el perfil para verificar el token
                try {
                    const userData = localStorage.getItem('blogUser');
                    if (userData) {
                        currentUser = JSON.parse(userData);
                        console.log('👤 User loaded from localStorage:', currentUser);
                    }
                    
                    // Verificar el token con el servidor
                    await verifyToken();
                    showPostsSection();
                    return;
                } catch (error) {
                    console.log('❌ Invalid token:', error);
                }
            }
            
            // Si no hay token o es inválido, mostrar auth
            console.log('❌ No valid token, showing login');
            showAuthSection();
        }

        // VERIFICAR TOKEN CON SERVIDOR
        async function verifyToken() {
            if (!currentToken) {
                throw new Error('No token');
            }

            try {
                console.log('🔐 Verifying token with server...');
                const response = await fetch(`${API_BASE}/auth/profile`, {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Valid token, profile:', data.data);
                    return true;
                } else {
                    console.error('❌ Invalid token, response:', response.status);
                    // Token inválido, limpiar
                    localStorage.removeItem('blogToken');
                    localStorage.removeItem('blogUser');
                    currentToken = null;
                    currentUser = null;
                    throw new Error('Invalid token');
                }
            } catch (error) {
                console.error('❌ Error verifying token:', error);
                throw error;
            }
        }

        // GESTIÓN DE POSTS
        async function handleCreatePost() {
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;

            if (!title || !content) {
                showAuthStatus('❌ Title and content are required', 'error');
                return;
            }

            try {
                showAuthStatus('⏳ Creating post...', 'info');
                
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
                    showAuthStatus('✅ Post created successfully!', 'success');
                    document.getElementById('create-post-form').reset();
                    await loadPosts();
                } else {
                    showAuthStatus(`❌ Error: ${data.message}`, 'error');
                }
            } catch (error) {
                console.error('Error creating post:', error);
                showAuthStatus('❌ Connection error', 'error');
            }
        }

        async function loadPosts() {
            try {
                console.log('📥 Loading posts...');
                const response = await fetch(`${API_BASE}/posts`);
                const data = await response.json();

                if (response.ok) {
                    console.log(`📚 Loaded ${data.data.length} posts`);
                    displayPosts(data.data);
                } else {
                    console.error('Error in posts response:', data);
                }
            } catch (error) {
                console.error('Error loading posts:', error);
            }
        }

        function displayPosts(posts) {
            const postsList = document.getElementById('posts-list');
            
            if (!posts || posts.length === 0) {
                postsList.innerHTML = '<p>No posts available. Be the first to create one!</p>';
                return;
            }

            postsList.innerHTML = posts.map(post => {
                const isOwner = currentUser && post.userId === currentUser.id;
                
                return `
                <div class="post" data-post-id="${post.id}">
                    <h3>${escapeHtml(post.title)}</h3>
                    <div class="post-meta">
                        <strong>Author:</strong> ${escapeHtml(post.author)} 
                        ${isOwner ? '<span class="owner-badge">(You)</span>' : ''} | 
                        <strong>Date:</strong> ${new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div class="post-content">${post.content}</div>
                    
                    ${isOwner ? `
                    <div class="post-actions">
                        <button onclick="startEditPost(${post.id})" class="btn-edit">✏️ Edit</button>
                        <button onclick="deletePost(${post.id})" class="btn-delete">🗑️ Delete</button>
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
            
            showAuthStatus('❌ Could not find the post', 'error');
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
                showAuthStatus('❌ Title and content are required', 'error');
                return;
            }

            try {
                showAuthStatus('⏳ Updating post...', 'info');
                
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
                    showAuthStatus('✅ Post updated successfully!', 'success');
                    cancelEdit();
                    await loadPosts();
                } else {
                    showAuthStatus(`❌ Error: ${data.message}`, 'error');
                }
            } catch (error) {
                console.error('Error updating post:', error);
                showAuthStatus('❌ Connection error', 'error');
            }
        }

        async function deletePost(postId) {
            if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
                return;
            }

            try {
                showAuthStatus('⏳ Deleting post...', 'info');
                
                const response = await fetch(`${API_BASE}/posts/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${currentToken}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    showAuthStatus('✅ Post deleted successfully!', 'success');
                    await loadPosts();
                } else {
                    showAuthStatus(`❌ Error: ${data.message}`, 'error');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                showAuthStatus('❌ Connection error', 'error');
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
            const url = prompt('Enter image URL:');
            if (url) {
                document.execCommand('insertImage', false, url);
            }
        }

        // RESETEO COMPLETO DEL SISTEMA
        async function resetCompleteSystem() {
            if (!confirm('⚠️ ARE YOU ABSOLUTELY SURE?\n\nThis will delete:\n• ALL users\n• ALL posts\n• ALL comments\n• Your local data\n\nThis action CANNOT be undone.')) {
                return;
            }
            
            try {
                showAuthStatus('⏳ Cleaning system...', 'info');
                
                // 1. Limpiar datos locales primero
                localStorage.clear();
                console.log('🧹 Local data cleared');
                
                // 2. Resetear base de datos en la API (ruta pública, sin token)
                const response = await fetch('http://localhost:3000/testing/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showAuthStatus('✅ ' + data.message, 'success');
                    // Forzar mostrar sección de autenticación
                    showAuthSection();
                    
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } else {
                    showAuthStatus('❌ Error: ' + data.message, 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showAuthStatus('❌ Server connection error', 'error');
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
                            <strong>✅ Server running</strong><br>
                            ${data.message}<br>
                            Database: ${data.database}
                        </div>
                    `;
                } else {
                    healthStatus.innerHTML = '<div class="status error">❌ Server unavailable</div>';
                }
            } catch (error) {
                healthStatus.innerHTML = '<div class="status error">❌ Error connecting to server</div>';
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
                }, 5000);
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
            console.log('🚪 Logging out...');
            localStorage.removeItem('blogToken');
            localStorage.removeItem('blogUser');
            currentToken = null;
            currentUser = null;
            showAuthSection();
            showAuthStatus('👋 Logged out successfully', 'info');
        }

        // DEBUG
        function debugAuth() {
            console.log('=== DEBUG ===');
            console.log('Token:', currentToken);
            console.log('User:', currentUser);
            console.log('Auth section visible:', authSection.style.display !== 'none');
            console.log('Posts section visible:', postsSection.style.display !== 'none');
            console.log('==================');
        }
    </script>
</body>
</html>
