export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string [] = [];

    if(password.length < 6){
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    if (!/(?=.*[a-z])/.test(password)) {
        errors.push('La contraseña debe tener al menos una minúscula');
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push('La contraseña debe tener al menos una mayúscula');
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push('La contraseña debe tener al menos un número');
      }

      return {
        isValid: errors.length === 0,
        errors
    };
};

export const validatePost = (title: string, content: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!title || title.trim().length < 3) {
      errors.push('El título debe tener al menos 3 caracteres');
    }
    if (!content || content.trim().length < 10) {
      errors.push('El contenido debe tener al menos 10 caracteres');
    }
    if (title && title.length > 200) {
      errors.push('El título no puede tener más de 200 caracteres');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
};

export const validateComment = (content: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!content || content.trim().length < 2) {
      errors.push('El comentario debe tener al menos 2 caracteres');
    }
    if (content && content.length > 1000) {
      errors.push('El comentario no puede tener más de 1000 caracteres');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  
  
