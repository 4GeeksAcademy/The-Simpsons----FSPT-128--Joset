import { Link } from "react-router-dom";

export const LocationCard = ({ location, onToggleFavorite, isFavorite }) => {
  return (

    <div className="card h-100 shadow-sm border-0">
      <div className="p-3 d-flex justify-content-center align-items-center location-img">
        <img src={`https://cdn.thesimpsonsapi.com/500${location.image_path}`}
          className="card-img-top hover-zoom" alt=""
          style={{ height: "160px", width: "auto", objectFit: "contain" }}
        />
      </div>

      <div className="card-body text-center">
        <h5 className="card-title  mb-0"> {location.name}</h5>

        <p className="small text-secondary mb-2 fw-bold">
          {location.use || "Unknown Use"}
        </p>
        <div className="text-muted xsmall mb-3" style={{ fontSize: '0.8rem' }}>
          <div>📍 {location.town || "Springfield"}</div>
        </div>
        
        <div className="d-flex justify-content-center align-items-center gap-2 mt-auto">
          
          <Link to={`/location/${location.id}`} className="w-50">
            <button className="btn btn-outline-primary btn-sm w-100">
              + Info
            </button>
          </Link>

          <button
            className={`btn btn-sm ${isFavorite ? "btn-donut" : "btn-outline-donut"} btn-donut-icon`}
            onClick={() => onToggleFavorite(location)}
            title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            🍩
          </button>
          
        </div>
      </div>
    </div>
  );
};