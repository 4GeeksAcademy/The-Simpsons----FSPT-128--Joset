import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getCharacters, getLocations } from "../Services/APISimpsons.js"; 
import { CharactersCard } from "../components/CharactersCard.jsx"; 
import { LocationCard } from "../components/LocationCard.jsx";  

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    
    useEffect(() => {
        getCharacters(dispatch);
        getLocations(dispatch);
    }, []);

    const handleToggleFavorite = (item, type) => {
        const isLoc = type === 'loc';
        const list = isLoc ? store.favoriteLocations : store.favoriteCharacters;
        const action = isLoc ? '_fav_location' : '_fav_character';
        
        if (list.some(fav => fav.id === item.id)) {
            dispatch({ type: 'remove' + action, payload: item });
        } else {
            dispatch({ type: 'add' + action, payload: item });
        }
    };
    return (
        <div className="container py-4">
            <h1 className="mb-3">Springfieldianos</h1>
            <div className="d-flex flex-nowrap overflow-auto gap-3 py-3 mb-4 scrollbar-hide">
                {store.characters.map(char => (
                    <div key={char.id} style={{ minWidth: "280px" }}>
                        <CharactersCard
                            character={char}
                            onToggleFavorite={(item) => handleToggleFavorite(item, 'char')}
                            isFavorite={store.favoriteCharacters.some(fav => fav.id === char.id)}
                        />
                    </div>
                ))}
            </div>
            <h1 className="mb-3">Lugares Emblemáticos</h1>
            <div className="d-flex flex-nowrap overflow-auto gap-3 py-3 scrollbar-hide">
                {store.locations?.map(loc => (
                    <div key={loc.id} style={{ minWidth: "300px" }}>
                        <LocationCard 
                            location={loc} 
                            onToggleFavorite={(item) => handleToggleFavorite(item, 'loc')}
                            isFavorite={store.favoriteLocations.some(fav => fav.id === loc.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};