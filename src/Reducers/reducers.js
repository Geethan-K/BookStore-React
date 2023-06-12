import { combineReducers } from 'redux';
import Cartreducer from './CartReducer';


const rootReducer = combineReducers({
  cart: cartReducer,
  // Add more reducers here if needed
});

export default rootReducer;
