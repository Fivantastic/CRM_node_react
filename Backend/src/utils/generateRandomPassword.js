export function generateRandomPassword(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    
    // Agregar al menos una mayúscula
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
    // Agregar al menos una minúscula
    password += 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
    // Agregar al menos un número
    password += '0123456789'.charAt(Math.floor(Math.random() * 10));
    
    // Generar el resto de la contraseña con caracteres aleatorios
    for (let i = 3; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        password += caracteres.charAt(indice);
    }
    
    // Mezclar la contraseña generada
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    return password;
}
