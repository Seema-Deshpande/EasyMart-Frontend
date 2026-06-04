import { useReducer } from 'react';

// Pure reducer function — same idea as a Redux slice reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i._id === action.payload._id);
      if (existing)
        return {
          ...state,
          items: state.items.map((i) =>
            i._id === action.payload._id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i._id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((i) =>
          i._id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Custom hook wraps useReducer and exposes a clean API
const useCartReducer = () => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return {
    items: state.items,
    addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  };
};

export default useCartReducer;
