import { jwtDecode } from "jwt-decode";

export async function renewTokenIfExpired(token, setUser) {
    if (!token) {
        return;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Calcular el tiempo restante para la expiración del token
    const timeUntilExpiration = decodedToken.exp - currentTime;

    // Renovar el token si está próximo a expirar (menos de 1 minuto)
    if (timeUntilExpiration < 60) {
        try {
            const response = await fetch('http://localhost:3000/user/renew-token', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}` 
                }
            });
            if (response.ok) {
                const responseData = await response.json();

                // Extraer el nuevo token de la respuesta
                const newToken = responseData.token;

                // Guardar el nuevo token en el contexto de autenticación
                setUser(newToken);
                // También puedes guardar el nuevo token en el localStorage si es necesario
                // localStorage.setItem('session', newToken);
                console.log('Token renovado');
            } else {
                console.error('Error al renovar el token:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red al renovar el token:', error);
        }
    }
}
