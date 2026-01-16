import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

	export const Navbar = () => {
		const { store, dispatch } = useGlobalReducer();
		const favorite = store.favorite;

		const eliminarFavorito = (character) => {
			dispatch({ type: 'remove_favorite', payload: character });
		};

		return (
			<nav className="navbar navbar-light bg-light">
				<div className="container">
				<Link to="/" className="navbar-brand mb-0 h1">The Simpsons</Link>



				<div className="dropdown ms-auto">
					<button className="btn btn-primary dropdown-toggle ml-auto" type="button"
						data-bs-toggle="dropdown" aria-expanded="false">
						⭐ Favoritos ({favorite.length})
					</button>

					<ul className="dropdown-menu dropdown-menu-end">
						{favorite.length === 0 ? (
							<li><span className="dropdown-item text-center">Sin favoritos</span></li>
						) : (
							favorite.map((character) => (
								<li key={character._id || character.id}>
									<div className="dropdown-item d-flex justify-content-between align-items-center">
										<span>{character.name}</span>
										<button className="btn btn-sm btn-outline-danger ms-2"
											onClick={() => eliminarFavorito(character)}>
											Quitar
										</button>
									</div>
								</li>
							))
						)}
					</ul>
					</div>
				</div>
			</nav>
		);
};