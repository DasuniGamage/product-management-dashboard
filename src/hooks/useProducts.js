import React, { useEffect, useReducer } from 'react'
import { useLocalStorage } from './useLocalStorage'


const initialState = {
  products: [],
  loading: false,
  error: null,
};

const defaultProducts = [
  {
    id: "1",
    name: "Wireless Mouse",
    price: 25.99,
    category: "Electronics",
    quantity: 12,
    description: "A reliable wireless mouse with ergonomic design.",
    imageUrl: "logo.jpg"
  },
  {
    id: "2",
    name: "Bluetooth Speaker",
    price: 45.00,
    category: "Electronics",
    quantity: 8,
    description: "Portable speaker with rich sound.",
    imageUrl: "logo.jpg"
  },
  {
    id: "3",
    name: "Wireless Tab",
    price: 25.99,
    category: "Electronics",
    quantity: 12,
    description: "A reliable wireless mouse with ergonomic design and long battery life.",
    imageUrl: "logo.jpg"
  },
    {
    id: "4",
    name: "Wireless Keyboard",
    price: 25.99,
    category: "Electronics",
    quantity: 12,
    description: "A reliable wirelessaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    imageUrl: "logo.jpg"
  }
];


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
      const initialProducts = persistedProducts.length === 0 ? defaultProducts : persistedProducts;
    const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    products: initialProducts,
  });

  useEffect(() => {
    if (persistedProducts.length === 0) {
      setPersistedProducts(defaultProducts);
    }
  }, []);

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
