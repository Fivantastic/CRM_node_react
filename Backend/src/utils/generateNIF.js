export function generarNIF() {
    // Definir las letras válidas para el primer carácter del NIF
    const letrasValidas = 'ABCDEFGHIJNPQRSUVW';

    // Seleccionar una letra aleatoria de las letras válidas
    const letraAleatoria = letrasValidas.charAt(Math.floor(Math.random() * letrasValidas.length));
  
    // Generar un número aleatorio de 7 dígitos
    const numeroAleatorio = Math.floor(Math.random() * 10000000);
    // Convertir el número a cadena y añadir ceros a la izquierda si es necesario
    const numeroCadena = String(numeroAleatorio).padStart(7, '0');
  
    // Combinar la letra y el número para formar el NIF completo
    const nifCompleto = letraAleatoria + numeroCadena;
    return nifCompleto;
}
