/* src/Services/APISimpsons.js */
const API_URL = 'https://thesimpsonsapi.com/api';

export const getCharacters = async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/characters?page=1&limit=15`);
        if (!response.ok) throw new Error("Error cargando personajes");

        const data = await response.json();

        dispatch({ type: "cargarPersonajes", payload: data.results || data });

    } catch (error) {
        console.error("❌ Error en getCharacters:", error);
    }
}

export const getCharacter = async (id) => {
    try {
        const response = await fetch(`${API_URL}/characters/${id}`);
        if (!response.ok) return null;

        return await response.json();
    } catch (error) {
        return null;
    }
}

export const getLocations = async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}/locations?limit=15`);
        if (!response.ok) throw new Error("Error cargando lugares");
        const data = await response.json();
        const locationsData = data.results || data;

        dispatch({ type: "cargarLugares", payload: locationsData });

    } catch (error) {
        return null;
    }
}

export const getLocation = async (id) => {
    try {
        const response = await fetch(`${API_URL}/locations/${id}`);
        if (!response.ok) return null;
        const data = await response.json();

        return Array.isArray(data) ? data[0] : data;

    } catch (error) {
        return null;
    }
}