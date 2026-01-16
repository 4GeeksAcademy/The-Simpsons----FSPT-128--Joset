const API_URL = 'https://thesimpsonsapi.com/api';


export const getCharacters = async (dispatch) =>{

    const response = await fetch(`${API_URL}/characters?page=`);
    if(!response.ok) {
        console.log("Hubo un error");
        return
        
    } 
    const data = await response.json()
    dispatch({ type: "set_characters", payload: data.results }) 
}


export const getCharacter = async (id) =>{

    const response = await fetch(`${API_URL}/characters/${id}`);
    if(!response.ok) {
        console.log("Hubo un error");
        return null
    } 
    const data = await response.json()
   return data
}