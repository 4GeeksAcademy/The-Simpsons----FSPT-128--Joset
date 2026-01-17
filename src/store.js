export const initialStore = () => {
  return {
    characters: [],
    locations: [],
    // AHORA TENEMOS DOS CAJAS SEPARADAS (Y VACÍAS al empezar)
    favoriteCharacters: [],
    favoriteLocations: []
  }
}
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    
    // --- CARGA DE DATOS ---
    case 'cargarPersonajes': // <--- CAMBIADO para coincidir con la API
      return { ...store, characters: action.payload };
      
    case 'cargarLugares':
      return { ...store, locations: action.payload };
    // --- FAVORITOS: PERSONAJES ---
    case 'add_fav_character':
        return { 
            ...store, 
            favoriteCharacters: [...store.favoriteCharacters, action.payload] 
        };
    case 'remove_fav_character':
        return { 
            ...store, 
            favoriteCharacters: store.favoriteCharacters.filter(item => item.id !== action.payload.id) 
        };
    // --- FAVORITOS: LUGARES ---
    case 'add_fav_location':
        return { 
            ...store, 
            favoriteLocations: [...store.favoriteLocations, action.payload] 
        };
    case 'remove_fav_location':
        return { 
            ...store, 
            favoriteLocations: store.favoriteLocations.filter(item => item.id !== action.payload.id) 
        };
    default:
      return store;
  }
}