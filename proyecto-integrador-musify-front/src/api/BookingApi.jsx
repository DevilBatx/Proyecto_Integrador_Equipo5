export const getBookingByUserId = async (apiURL, userId) => {    
    try {
        const response = await fetch(`${apiURL}/auth/bookings/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la reserva por id:', error);
        throw error;
    }
};