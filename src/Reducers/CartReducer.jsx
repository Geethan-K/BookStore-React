import React,{ useReducer } from "react";


/*
const Cartreducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== action.payload),
        };
      case 'CANCEL_ORDER':
        return {
          ...state,
          cartItems: [],
        };
      default:
        return state;
    }
  };

  export default Cartreducer;
  */

  const initialState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      case 'CLEAR_CART':
        return {
          ...state,
          items: [],
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  