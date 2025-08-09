import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const apiUrl = `https://www.swapi.tech/api/`


	//const personajes = (personajesNombre) = `https://www.swapi.tech/api/people/?${personajesNombre}`

	const StarWarsCard = ({ personajes }) => {

		const { store, dispatch } = useGlobalReducer()
		const isfavorite = store.favorites.find(perso => perso.nombre === personajes.nombre);

		return <div className="p-2 col-3" style={{ minHeight: "300px" }}>
			<div className="card d-flex flex-column h-100" style={{ minHeight: "280px" }}>
				{/* <img src={personajes(personajes.numero)} className="card-img-top mx-auto mb-auto"
					style={{ maxwidth: "160px", maxheight: "160px" }} alt={personajes.nombre}
				/> */}
				<div className="m-2 mt-auto">
					<h5 className="card-title">{personajes.nombre}</h5>
				
					<button className="btn btn-primary"
						onClick={() => dispatch({
							type: "add_favorites",
							payload: { favoritesItem: personajes }
						})}
					>
						{isfavorite && <i className="fa-solid fa-heart"></i>}
						{!isfavorite && <i className="fa-light fa-heart"></i>}
					</button>
				</div>
			</div>
		</div>



	}

	const [starWars, setStarWars] = useState([])

	const loadStarWars = async () => {
		const resp = await fetch(apiUrl+"people");
		const data = await resp.json();
		dispatch({
			type: "update_startWarsPeople",
			payload: { newStartWarsPeople: data.results }
		});
	}

	useEffect(() => {
		loadStarWars()
	}, [])

	return (
		<div className="text-center mt-5 text-black">
			<h1>Blog Star Wars!!</h1>
			{store.starWarsPeople && store.starWarsPeople.map((item, indice) => (
				<StarWarsCard  key={indice} personajes={{
					nombre: item.name,}}>
					

				</StarWarsCard>

			))}
		</div>
	);
}; 