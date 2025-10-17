import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../db';
import { validateEmail, validatePassword } from '../utils/validators';

const JWT_SECRET = process.env.JWT_SECRET || 'clave-secreta-local-ficticia';

// Interface para el usuario en el token
interface TokenUser {
  userId: number;
  email: string;
}

// Extender el tipo Request de Express
interface AuthRequest extends Request {
  user?: TokenUser;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validaciones básicas
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password y name son requeridos'
      });
    }

    // Validaciones avanzadas
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email es inválido'
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña no cumple los requisitos',
        errors: passwordValidation.errors
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'El nombre debe tener al menos 2 caracteres'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name.trim()
      }
    });

    // Excluir password de la respuesta
    const { password: _, ...userWithoutPassword } = user;

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Usuario registrado exitosamente'
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y password son requeridos'
      });
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Excluir password de la respuesta
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Login exitoso'
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Por ahora devolvemos un mensaje - implementaremos la autenticación después
    res.json({
      success: true,
      message: 'Endpoint de perfil - la autenticación se implementará después',
      note: 'Por ahora puedes usar register y login para crear usuarios'
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo perfil'
    });
  }
};

// TOKEN: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoibWl1c3VhcmlvQGZpY3RpY2lvLmNvbSIsImlhdCI6MTc2MDM3Mzc4NSwiZXhwIjoxNzYwNDYwMTg1fQ.idZGFK1Z4cTx91lcr0t9Tz95L2u5DB1UWI_B9qy6oIo