import { Link } from "react-router-dom";
export const CharactersCard = ({ character, onToggleFavorite, isFavorite }) => {
  const imgSrc = character.portrait_path 
    ? `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`
    : `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`;
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="p-3 d-flex justify-content-center align-items-center character-img">
        <img
          src={imgSrc}
          className="card-img-top hover-zoom"
          alt={character.name}
          style={{ height: "180px", width: "auto", objectFit: "contain" }}
        />
      </div>
      <div className="card-body text-center">
        <h6 className="card-title fw-bold text-primary text-truncate mb-1">
            {character.name}
        </h6>
        
        <p className="small text-secondary mb-2">
            {character.occupation || "Unknown Occupation"}
        </p>
        {/* DATOS QUE HABÍA BORRADO POR ERROR (RESTAURADOS) */}
        <div className="text-muted xsmall mb-2" style={{ fontSize: '0.8rem' }}>
          <div>🎂 {character.birthdate || "Unknown"}</div>
          <div>⏳ {character.age ? `${character.age} years` : "Age unknown"}</div>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
            <Link to={`/character/${character.id}`} className="w-100">
                <button className="btn btn-outline-primary btn-sm w-100">
                    + Info
                </button>
            </Link>
            <button
                className={`btn btn-sm ${isFavorite ? "btn-warning text-white" : "btn-outline-warning"}`}
                onClick={() => onToggleFavorite(character)}
                title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                style={{ width: "32px", height: "32px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                ♥
            </button>
        </div>
      </div>
    </div>
  );
};


