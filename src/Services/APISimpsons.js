/* src/Services/APISimpsons.js */
const API_URL = 'https://thesimpsonsapi.com/api';
// 1. Obtener TODOS los Personajes
export const getCharacters = async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/characters?page=1&limit=15`); // Pido 15 para que se vea lleno
        if (!response.ok) throw new Error("Error cargando personajes");
        
        const data = await response.json();
        // La acción debe coincidir con el store (Español)
        dispatch({ type: "cargarPersonajes", payload: data.results || data });
        
    } catch (error) {
        console.error("❌ Error en getCharacters:", error);
    }
}
// 2. Obtener un Personaje INDIVIDUAL
export const getCharacter = async (id) => {
    try {
        const response = await fetch(`${API_URL}/characters/${id}`);
        if (!response.ok) return null;
        
        return await response.json();
    } catch (error) {
        return null; // Si falla, devuelve null para que no rompa la página
    }
}
// 3. Obtener TODOS los Lugares
export const getLocations = async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/locations?limit=15`);
        if (!response.ok) throw new Error("Error cargando lugares");
        const data = await response.json();
        const locationsData = data.results || data; // Parche para inconsistencias de la API
        
        dispatch({ type: "cargarLugares", payload: locationsData });
        
    } catch (error) {
        console.error("❌ Error en getLocations:", error);
    }
}
// 4. Obtener un Lugar INDIVIDUAL
export const getLocation = async (id) => {
    try {
        const response = await fetch(`${API_URL}/locations/${id}`);
        if (!response.ok) return null;
        const data = await response.json();
        // Parche: a veces viene como array [objeto] y a veces como objeto
        return Array.isArray(data) ? data[0] : data;
        
    } catch (error) {
        return null;
    }
}