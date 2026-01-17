import { Link } from "react-router-dom";
export const CharactersCard = ({ character, onToggleFavorite, isFavorite }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="p-3 d-flex justify-content-center align-item-center mb-0">
        <img src={`https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`}
          className="card-img-top hover-zoom" alt=""
          style={{ height: "130px", width: "auto", objectFit: "contain" }}
        />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title"> {character.name}</h5>
         <p className="text-secondary mb-0">{character.occupation || "Unknown Occupation"}</p>
        
        <div className="text-muted xsmall mb-2" style={{ fontSize: '0.8rem' }}>
          <div>🎂 {character.birthdate || "Unknown"}</div>
          <div>⏳ {character.age ? `${character.age} years` : "Age unknown"}</div>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
            <Link to={`/character/${character.id}`} className="w-50">
                <button className="btn btn-outline-primary btn-sm w-100">
                    + Info
                </button>
            </Link>
            
            <button
                className={`btn btn-sm ${isFavorite ? "btn-donut" : "btn-outline-donut"} btn-donut-icon`} 
                onClick={() => onToggleFavorite(character)}
                title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
               🍩
            </button>
        </div>
      </div>
    </div>
  );
};
