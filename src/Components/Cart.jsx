import React, { useState, useEffect,useReducer } from 'react';
import Cartreducer from '../Reducers/CartReducer';
import { Link,useNavigate } from 'react-router-dom';
import { yourOrdersUrl } from '../environment';

// Define initial state
const initialState = {
  cartItems: [],
};


useEffect(() => {
    fetchYourOrders();
  },[myOrders]);


  

const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [myOrders,setMyOrders] = useState('');

  const addToCart = (props) => {
    const { cartItems, addToCart, removeFromCart, clearCart } = props;

    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const fetchYourOrders = () =>{

    fetch(yourOrdersUrl)
      .then(response => response.json())
      .then(data => {
        
        setMyOrders(data)
        setBooks(prevBooks => [...prevBooks, ...data.books]);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  const removeFromCart = (itemId) => {
    
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const cancelOrder = () => {
    dispatch({ type: 'CANCEL_ORDER' });
  };

  const mapStateToProps = (state) => {
    return {
      cartItems: state.cart.items,
    };
  };
  
  const mapDispatchToProps = {
    addToCart,
    removeFromCart,
    clearCart,
  };


  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addToCart({ id: 1, name: 'Product 1' })}>Add to Cart</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
