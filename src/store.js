export const initialStore = () => {
  return {
    characters: [],
    locations: [],
    favoriteCharacters: [],
    favoriteLocations: []
  }
}
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    
    
    case 'cargarPersonajes': 
      return { ...store, characters: action.payload };
      
    case 'cargarLugares':
      return { ...store, locations: action.payload };
 
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