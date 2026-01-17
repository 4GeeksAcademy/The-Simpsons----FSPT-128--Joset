import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

  const { store, dispatch } = useGlobalReducer();
  
  return (
    <nav className="navbar navbar-light mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/The_Simpsons_yellow_logo.svg" 
                alt="The Simpsons" 
                height="80" 
                className="d-inline-block align-text-top"
            />
        </Link>
      <span className="navbar-text position-absolute top-50 start-50 translate-middle text-white fs-3 d-flex d-md-block" style={{ fontFamily: 'Simpsonfont', letterSpacing: '2px', textShadow: "1px 1px 2px black, opacity: 0.9" }}>
           4Geeks Academy <span style={{ filter: "grayscale(100%) invert(100%)" }}>🖍️</span>
           
        </span>


        <div className="dropdown ms-auto">
          <button 
            className="btn dropdown-toggle fw-bold shadow-sm" 
            type="button"
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            style={{ backgroundColor: "#F687B3", color: "white", border: "2px solid #D53F8C" }}
          >
            
            🍩 Mis Donuts ({store.favoriteCharacters.length + store.favoriteLocations.length})
          </button>
          <ul className="dropdown-menu dropdown-menu-end" style={{ maxHeight: "300px", overflowY: "auto" }}>
            
            {(store.favoriteCharacters.length + store.favoriteLocations.length) === 0 ? (
              <li><span className="dropdown-item text-center text-muted">Sin favoritos</span></li>
            ) : (
              <>
               
                {store.favoriteCharacters.length > 0 && <li className="dropdown-header text-primary">Personajes</li>}
                {store.favoriteCharacters.map((item) => (
                    <li key={item.id}>
                        <div className="dropdown-item d-flex justify-content-between align-items-center gap-2">
                            <span className="text-truncate" style={{ maxWidth: "150px" }}>{item.name}</span>
                            <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    dispatch({ type: 'remove_fav_character', payload: item });
                                }}
                            >
                            🍩❌ 
                            </button>
                        </div>
                    </li>
                ))}
                
                {store.favoriteLocations.length > 0 && <li><hr className="dropdown-divider"/></li>}
                {store.favoriteLocations.length > 0 && <li className="dropdown-header text-success">Lugares</li>}
                {store.favoriteLocations.map((item) => (
                    <li key={'loc-' + item.id}> 
                        <div className="dropdown-item d-flex justify-content-between align-items-center gap-2">
                            <span className="text-truncate" style={{ maxWidth: "150px" }}>{item.name}</span>
                            <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    dispatch({ type: 'remove_fav_location', payload: item });
                                }}
                            >
                            🍩❌ 
                            </button>
                        </div>
                    </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}