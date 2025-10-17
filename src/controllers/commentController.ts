// Controlador de comentarios - temporalmente deshabilitado
// Lo implementaremos después de que la autenticación funcione

import { Request, Response } from 'express';

export const getPostComments = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Los comentarios se implementarán después',
    data: []
  });
};

export const createComment = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Crear comentarios se implementará después'
  });
};

export const deleteComment = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Eliminar comentarios se implementará después'
  });
};