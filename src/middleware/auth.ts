import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-local-ficticia';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Token de acceso requerido'
    });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};