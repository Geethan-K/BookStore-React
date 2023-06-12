import React, { useState, useEffect,useReducer } from 'react';
import Cartreducer from '../Reducers/CartReducer';
import { Link,useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery,setSearchQuery] = useState('');
  const [cartCount,setCartcount] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  const fetchBooks = () => {
    // Make API call to fetch books data
    // Replace this with your actual API call
    const apiUrl = `https://api.itbook.store/1.0/search/new`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      
        setBooks(prevBooks => [...prevBooks, ...data.books]);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };


  const searchBooks = () => {
    // Make API call to fetch books data
    // Replace this with your actual API call
    const apiUrl = `https://api.itbook.store/1.0/search/${searchQuery}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      
        setBooks(prevBooks => [...data.books]);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const threshold = 0.8 * scrollHeight;

    if (!loading && scrollTop + clientHeight >= threshold) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
      fetchBooks();
    }
  };


  
const Cart = () => {
  const initialState = {
    cartItems: [],
  };
  
  const [state, dispatch] = useReducer(Cartreducer, initialState);

  const addToCart = (item) => {
    setCartcount(prevState=>prevState + 1)
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    setCartcount(prevState=>prevState - 1)
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

 



  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto  ">
     <div className='container bg-black py-8'>
      <div>
      <h2 className="text-3xl text-orange-400 font-semibold mb-4">Book Listing</h2>
      <div className='left-0 mb-8 pl-4 pr-4 top-0 float-right' onClick={()=>navigate('/Cart')}>
        {
          cartCount > 0 && ( 
          <div className='rounded bg-red-500'>
              {cartCount}
          </div>)
        }
       
        <svg xmlns="http://www.w3.org/2000/svg" color='orange' fill="orange" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </div>
      </div>
      <div className='grid '>
     
<div className="flex items-center">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
        </div>
        <input type="text" onChange={(e)=>setSearchQuery(e.target.value)} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
    </div>
    <button type="submit" onClick={searchBooks} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="sr-only">Search</span>
    </button>
</div>

      </div>
     </div> 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map(book => (
          <div key={book.id} className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={book.image} alt="no preview available" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{book.title}</div>
            <p className="text-gray-700 text-base">
            {book.author}
            </p>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{book.price}</span>
          </div>
          <div className="px-6 pt-4 pb-2">
           <button 
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
           onClick={() => addToCart({ id: book.id, name: book.title })}
           >
              Add to cart
            </button>
           
           <button 
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
           onClick={() => removeFromCart(book.id)}
           >
             remove from cart
            </button>
          
          </div>
        </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};


}
export default Dashboard;
