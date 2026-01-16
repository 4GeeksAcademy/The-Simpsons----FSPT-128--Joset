import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getCharacters } from "../Services/APISimpsons.js";
import { CharactersCard } from "../components/CharactersCard.jsx";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {

        getCharacters(dispatch)

    }, [])

    const handleToggleFavorite = (character) => {

        const isFavorite = store.favorite.some(fav => fav.id === character.id);

        if (isFavorite) {
            dispatch({ type: 'remove_favorite', payload: character });
        } else {
            dispatch({ type: 'add_to_favorite', payload: character });
        }
    };

    return (

        <div className="container py-4">
            <div>
                <h1>Springfieldianos</h1>
            </div>

            <div className="d-flex flex-nowrap overflow-auto gap-3 py-3" >
                {store.characters.map(character => {
                   
                    const yaEstaEnLaLista = store.favorite.some(fav => fav.id === character.id);
                    
                    return (
                        <div className="col-sm-6 col-md-4 col-lg-3" key={character.id} style={{ minWidth: "280px" }}>
                            <CharactersCard
                                character={character}
                                onToggleFavorite={handleToggleFavorite}
                                isFavorite={yaEstaEnLaLista} 
                            />
                        </div>
                    )
                })}
            </div>
            
        </div>
    );
};