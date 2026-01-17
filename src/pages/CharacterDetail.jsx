import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getCharacter } from '../Services/APISimpsons';
export const CharacterDetail = () => {
    const { id } = useParams(); 
    const [character, setCharacter] = useState({});
    
    const { store, dispatch } = useGlobalReducer();
    // LÓGICA DIRECTA (Sin variables intermedias de seguridad)
    const isFavorite = store.favoriteCharacters.some(fav => fav.id === character.id);
    const onToggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'remove_fav_character', payload: character });
        } else {
            dispatch({ type: 'add_fav_character', payload: character });
        }
    }
    // Carga de datos simple
    useEffect(() => {
        getCharacter(id).then(data => setCharacter(data));
    }, []);
    return (
        <div className="container py-4">
            <Link to="/" className="text-decoration-none">
                <button className="btn btn-warning mb-3">
                    Volver atrás
                </button>
            </Link>
            <div className="card shadow-sm mx-auto" style={{ maxWidth: "800px" }}>
                <div className="row g-0">
                    <div className="col-md-4 p-3 d-flex justify-content-center align-items-center">
                        <img
                            // IMAGEN DIRECTA (Como tus compañeros)
                            src={`https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`}
                            className="img-fluid rounded-start"
                            alt={character.name}
                            style={{ maxHeight: 300, objectFit: "contain" }}
                            onError={(e) => e.target.src = "https://via.placeholder.com/300?text=No+Image"}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title display-5 text-primary fw-bold text-decoration-underline">
                                {character.name}
                            </h1>
                            <h4 className="card-text text-secondary mb-3">{character.occupation}</h4>
                            
                            <p className="card-text fs-5"><strong>Estado:</strong> {character.status}</p>
                            <p className="card-text fs-5"><strong>Género:</strong> {character.gender}</p>
                            <p className="card-text fs-5"><strong>Edad:</strong> {character.age ? `${character.age} años` : "Desconocida"}</p>
                            
                            <p className="card-text text-start mt-3 mb-3 px-md-5">{character.description}</p>
                            
                            {character.phrases && (
                                <div className="mt-4">
                                    <h5>Frases Célebres:</h5>
                                    <ul className="list-group list-group-flush">
                                        {character.phrases.slice(0, 3).map((phrase, i) => (
                                            <li key={i} className="list-group-item fst-italic">"{phrase}"</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            <div className="d-flex gap-2 mt-4">
                                <button
                                    className={`btn ${isFavorite ? "btn-donut" : "btn-outline-donut"} px-4 py-2`} 
                                    onClick={onToggleFavorite}
                                >
                                    {isFavorite ? "Quitar de favoritos 🍩" : "Añadir a favoritos 🍩"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};