
// Función para validar el token
export const validarToken = (token) => {
    if (!token) {
        // El token no está presente
        return true;
    }

    const decodedToken = jwt.decode(token);

    if (!decodedToken.exp) {
        // La propiedad "exp" no está presente en el token
        return true;
    }

    // Obtiene la fecha actual en segundos
    const currentTime = Date.now() / 1000;

    // Compara la fecha de expiración del token con la fecha actual
    return decodedToken.exp < currentTime;
}
