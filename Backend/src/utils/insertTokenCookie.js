// Función para configurar la cookie del token
export function insertTokenCookie(res, token) {
  // Configurar la duración del token en la cookie
  const oneDay = 1000 * 60 * 60 * 24;
  
  // Establecer la cookie con el token
  res.cookie('token', token, { 
      maxAge: oneDay, 
      httpOnly: true,
      secure: true, 
      sameSite: 'None'
  });
}
