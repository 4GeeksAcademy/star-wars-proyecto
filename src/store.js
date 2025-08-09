export const initialStore = () => {
  return {
    message: null,
    starWarsPeople: [],
    favorites: [],
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case `update_startWarsPeople`:
      const { newStartWarsPeople } = action.payload
      return {
        ...store,
        starWarsPeople: newStartWarsPeople
      }

    case `add_favorites`:
      const { favoritesItem } = action.payload

      const searchPersonaje = store.favorites.find(perso => perso.nombre === favoritesItem.nombre);
      if (searchPersonaje) return store
      

      return {
        ...store, favorites: [...store.favorites, favoritesItem]
      }


    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }
}
