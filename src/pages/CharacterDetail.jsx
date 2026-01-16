
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { getCharacter } from '../Services/APISimpsons';

export const CharacterDetail = () => {

    const { id } = useParams(); {/* devuelve un objeto con los parametros dinamicos de la url actual */ }

    const [character, setCharacter] = useState({})

    const { store, dispatch } = useGlobalReducer()

    const isFavorite = store.favorite.some(fav => fav.id === character.id);

    const onToggleFavorite = () => {

        if (isFavorite) {
            dispatch({ type: 'remove_favorite', payload: character });
        } else {
            dispatch({ type: 'add_to_favorite', payload: character });
        }
    }

    const getCharacterData = async () => {
        const characterData = await getCharacter(id)
        setCharacter(characterData)
    }

    useEffect(() => {
        getCharacterData()
    }, [])



    return (
        <div className="container py-4">

            <Link to="/" className="text-decoration-none">
    <button className="btn btn-outline-secondary">
         Volver atrás
    </button>
</Link>

            <div className="card shadow-sm">
                <div className="row g-0">
                    <div className="col-md-4 p-3 d-flex justify-content-center align-items-center">
                        <img
                            src={`https://cdn.thesimpsonsapi.com/500${character.portrait_path}`}
                            className="img-fluid rounded-start"
                            alt={character.name}
                            style={{ maxHeight: 200, objectFit: "contain" }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title display-5 text-primary fw-bold text-decoration-underline">{character.name}</h1>
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
                        </div>
                    </div>
                    <div className="d-flex gap-2 mt-3">

                        <button
                            className={`btn ${isFavorite ? "btn-warning" : "btn-primary"}`}
                            onClick={onToggleFavorite}
                        >
                            {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};