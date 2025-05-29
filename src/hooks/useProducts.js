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
    quantity: 15,
    description: "Ergonomic wireless mouse with adjustable DPI and long battery life.",
    imageUrl: "https://via.placeholder.com/300x200.png?text=Product+Image"
  },
  {
    id: "2",
    name: "Bluetooth Speaker",
    price: 45.00,
    category: "Electronics",
    quantity: 8,
    description: "Compact Bluetooth speaker with deep bass and 12-hour playtime.",
    imageUrl: "logo.jpg"
  },
  {
    id: "3",
    name: "Yoga Mat",
    price: 22.99,
    category: "Sports",
    quantity: 25,
    description: "Non-slip eco-friendly yoga mat with carrying strap.",
    imageUrl: "yogamat.jpg"
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    price: 18.50,
    category: "Home",
    quantity: 20,
    description: "Insulated bottle that keeps drinks cold for 24 hours or hot for 12.",
    imageUrl: "logo.jpg"
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 69.99,
    category: "Clothing",
    quantity: 10,
    description: "Lightweight, breathable running shoes with cushioned sole.",
    imageUrl: "shoes.jpg"
  },
  {
    id: "6",
    name: "LED Desk Lamp",
    price: 34.75,
    category: "Home",
    quantity: 12,
    description: "Adjustable LED desk lamp with touch controls and USB charging port.",
    imageUrl: "lamp.jpg"
  },
  {
    id: "7",
    name: "Noise-Cancelling Headphones",
    price: 129.00,
    category: "Electronics",
    quantity: 5,
    description: "Over-ear headphones with active noise cancellation and Bluetooth 5.0.",
    imageUrl: "hp.jpg"
  },
  {
    id: "8",
    name: "Digital Watch",
    price: 49.99,
    category: "Clothing",
    quantity: 9,
    description: "Water-resistant digital watch with stopwatch, alarm, and backlight.",
    imageUrl: "watch.jpg"
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
