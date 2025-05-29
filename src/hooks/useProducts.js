import React, { useEffect, useReducer } from 'react'
import { useLocalStorage } from './useLocalStorage'


const initialState = {
  products: [],
  loading: false,
  error: null,
};


const reducer = (state,action)=>{
    switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

export const useProducts = () => {

    const[persistedProducts, setPersistedProducts] = useLocalStorage("products",[]);
    const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    products: persistedProducts,
  });

  useEffect(() => {
    setPersistedProducts(state.products);
  }, [state.products]);
  return {
    ...state,
    addProduct: (p) => dispatch({ type: "ADD_PRODUCT", payload: p }),
    updateProduct: (p) => dispatch({ type: "UPDATE_PRODUCT", payload: p }),
    deleteProduct: (id) => dispatch({ type: "DELETE_PRODUCT", payload: id }),
  };
}
