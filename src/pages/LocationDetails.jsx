import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getLocation } from '../Services/APISimpsons';

export const LocationDetails = () => {
    
    const { id } = useParams();
    const [location, setLocation] = useState({});
    
    // Accedemos directamente al store
    const { store, dispatch } = useGlobalReducer();
    // LÓGICA DIRECTA: Comprobamos si el ID está en la lista de favoritos de LUGARES
    // (Asumimos que store.favoriteLocations siempre existe gracias al initialState)
    const isFavorite = store.favoriteLocations.some(fav => fav.id === location.id);
    const onToggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'remove_fav_location', payload: location });
        } else {
            dispatch({ type: 'add_fav_location', payload: location });
        }
    }
    // Carga de datos simple
    useEffect(() => {
        getLocation(id).then(data => setLocation(data));
    }, []);
    return (
        <div className="container py-4">
            <Link to="/" className="text-decoration-none">
                <button className="btn btn-warning mb-3">
                    Volver atrás
                </button>
            </Link>
            <div className="card shadow-sm mx-auto" style={{ maxWidth: "900px" }}>
                <div className="row g-0">
                    <div className="col-md-5 p-3 d-flex justify-content-center align-items-center">
                        <img
                            // Lógica de imagen simplificada (inline)
                            src={location.image_path ? `https://cdn.thesimpsonsapi.com/500${location.image_path}` : ""}
                            className="img-fluid rounded-start"
                            alt={location.name}
                            style={{ maxHeight: 300, objectFit: "contain" }}
                            onError={(e) => e.target.src = "https://via.placeholder.com/300?text=No+Image"}
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h1 className="card-title display-5 text-success fw-bold text-decoration-underline">
                                {location.name}
                            </h1>
                            <h4 className="card-text text-secondary mb-3">{location.town}</h4>
                            
                            <p className="card-text fs-5"><strong>Uso:</strong> {location.use || "Desconocido"}</p>
                            
                            <p className="card-text text-start mt-3 mb-3 px-md-2">
                                {location.description || "Sin descripción disponible."}
                            </p>
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