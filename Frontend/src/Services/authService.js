import { jwtDecode } from "jwt-decode";

export async function renewTokenIfExpired() {
    const token = localStorage.getItem('session');
    if (!token) {
        return;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        try {
            const response = await fetch('http://localhost:3000/user/renew-token', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyI…E0Nn0.BkVU7qfQbtDXyqCmF2OGcfj8vf-N6srcluxDv0n_Kh8`
                }
            });
            if (response.ok) {
                const newToken = await response.text(); // Obtiene el token renovado como texto
                // Guardar el nuevo token en el localStorage
                localStorage.setItem('session', newToken);
            } else {
                console.error('Error al renovar el token:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red al renovar el token:', error);
        }
    }
}
