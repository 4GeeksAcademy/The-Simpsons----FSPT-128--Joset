export const initialStore = () => {
  return {
    characters: [],
    favorite: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    //dispatch({type:"set_characters", payload: characters})
    case 'set_characters':
      return {
        ...store, //copia de lo que habia en initialStore
        characters: action.payload //nuevo dato de characters
      }

    case 'add_to_favorite':
      const character = action.payload
      const exist = store.favorite.find(item => item.id === character.id)
      if (exist) {
        return {
          ...store,
          favorite: store.favorite.map(item => item.id === character.id ? { ...item, qty: item.qty + 1 } : item)
        };
      } else {
        return {
          ...store,
          favorite: [...store.favorite, { ...character, qty: 1 }]
        };
      };
      case 'remove_favorite':
      return {
        ...store,
        favorite: store.favorite.filter(item => item.id !== action.payload.id)
      };


    default:
      return store;
  }
}
