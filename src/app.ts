import express from 'express'
import cors from 'cors'
import prisma from './db'

// Importación alternativa - importa todo el módulo
import * as authController from './controllers/authController'
import * as commentController from './controllers/commentController'
import * as authMiddleware from './middleware/auth'

const app = express()
const PORT = 3000

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'],
  credentials: true
}))
app.use(express.json())

// Health check
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({
      status: 'healthy',
      message: 'API funcionando - Con autenticación completa',
      timestamp: new Date().toISOString(),
      database: 'SQLite local',
      features: 'CRUD Posts, Autenticación JWT, Comentarios'
    })
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      message: 'Error de base de datos'
    })
  }
})

// 🔓 RUTAS PÚBLICAS
// Rutas de autenticación
app.post('/auth/register', authController.register as express.RequestHandler)
app.post('/auth/login', authController.login as express.RequestHandler)

// Rutas públicas de posts (lectura)
app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: posts,
      count: posts.length
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: 'Error obteniendo posts'
    })
  }
})

app.get('/posts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      })
    }

    res.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: 'Error obteniendo post'
    })
  }
})

// Rutas de comentarios (públicas para lectura)
app.get('/posts/:postId/comments', commentController.getPostComments as express.RequestHandler)

// 🔧 RUTA PÚBLICA PARA RESETEAR DATOS (SIN AUTENTICACIÓN)
app.post('/testing/reset', async (req, res) => {
  try {
    console.log('🗑️ Iniciando reset completo de la base de datos...')
    
    // Eliminar en orden correcto por las relaciones
    await prisma.comment.deleteMany()
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
    
    console.log('✅ Base de datos reseteda completamente')
    
    res.json({
      success: true,
      message: '✅ Sistema reiniciado completamente. Todos los usuarios, posts y comentarios han sido eliminados.'
    })
  } catch (error) {
    console.error('❌ Error reseteando datos:', error)
    res.status(500).json({
      success: false,
      message: 'Error reseteando datos'
    })
  }
})

// 🔐 A PARTIR DE AQUÍ - RUTAS PROTEGIDAS
app.use(authMiddleware.authenticateToken as express.RequestHandler)

// Ruta de perfil (protegida)
app.get('/auth/profile', authController.getProfile as express.RequestHandler)

// POST /posts - Crear nuevo post (protegido)
app.post('/posts', async (req: any, res) => {
  try {
    const { title, content } = req.body
    const userId = req.user.userId

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title y content son requeridos'
      })
    }

    // Obtener información del usuario para el autor
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true }
    })

    const newPost = await prisma.post.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        author: user?.name || 'Autor Ficticio',
        userId: userId
      }
    })

    res.status(201).json({
      success: true,
      data: newPost,
      message: 'Post creado exitosamente'
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creando post'
    })
  }
})

// PUT /posts/:id - Actualizar post (protegido)
app.put('/posts/:id', async (req: any, res) => {
  try {
    const id = parseInt(req.params.id)
    const { title, content } = req.body
    const userId = req.user.userId

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title y content son requeridos'
      })
    }

    // Verificar que el post existe y pertenece al usuario
    const existingPost = await prisma.post.findFirst({
      where: { 
        id: id,
        userId: userId 
      }
    })

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado o no autorizado'
      })
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: title.trim(),
        content: content.trim()
      }
    })

    res.json({
      success: true,
      data: updatedPost,
      message: 'Post actualizado exitosamente'
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: 'Error actualizando post'
    })
  }
})

// DELETE /posts/:id - Eliminar post (protegido)
app.delete('/posts/:id', async (req: any, res) => {
  try {
    const id = parseInt(req.params.id)
    const userId = req.user.userId

    // Verificar que el post existe y pertenece al usuario
    const existingPost = await prisma.post.findFirst({
      where: { 
        id: id,
        userId: userId 
      }
    })

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado o no autorizado'
      })
    }

    await prisma.post.delete({
      where: { id }
    })

    res.json({
      success: true,
      message: 'Post eliminado exitosamente'
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: 'Error eliminando post'
    })
  }
})

// POST /posts/:postId/comments - Crear comentario (protegido)
app.post('/posts/:postId/comments', commentController.createComment as express.RequestHandler)

// DELETE /comments/:commentId - Eliminar comentario (protegido)
app.delete('/comments/:commentId', commentController.deleteComment as express.RequestHandler)

// 🔧 RUTAS DE DESARROLLO (públicas por ahora)
// Endpoint temporal para ver usuarios (SOLO desarrollo)
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })
    
    res.json({
      success: true,
      data: users,
      count: users.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo usuarios'
    })
  }
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 SERVIDOR COMPLETO CON AUTENTICACIÓN')
  console.log(`📡 URL: http://localhost:${PORT}`)
  console.log(`🗄️  Base de datos: SQLite local`)
  console.log(`🔐 Autenticación: JWT habilitada`)
  console.log(`❤️  Health: http://localhost:${PORT}/health`)
  console.log('')
  console.log('📚 ENDPOINTS PÚBLICOS:')
  console.log('  POST /auth/register          - Registrar usuario')
  console.log('  POST /auth/login             - Login usuario')
  console.log('  GET  /posts                  - Listar posts')
  console.log('  GET  /posts/:id             - Obtener post')
  console.log('  GET  /posts/:postId/comments - Listar comentarios')
  console.log('  POST /testing/reset          - Resetear base de datos (desarrollo)')
  console.log('')
  console.log('🔐 ENDPOINTS PROTEGIDOS (requieren token JWT):')
  console.log('  GET  /auth/profile           - Perfil de usuario')
  console.log('  POST /posts                  - Crear post')
  console.log('  PUT  /posts/:id             - Actualizar post')
  console.log('  DELETE /posts/:id           - Eliminar post')
  console.log('  POST /posts/:postId/comments - Crear comentario')
  console.log('  DELETE /comments/:commentId  - Eliminar comentario')
  console.log('')
  console.log('💡 INSTRUCCIONES:')
  console.log('  1. Registra un usuario en /auth/register')
  console.log('  2. Haz login en /auth/login para obtener token')
  console.log('  3. Usa el token en header: "Authorization: Bearer TU_TOKEN"')
})