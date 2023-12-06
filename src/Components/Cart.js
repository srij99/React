import React, { useEffect, useState } from 'react';
import { CartNavbar } from '../Navbar';
import shoeData from './../data.json';
import { useNavigate } from "react-router-dom";

export default function Cart({ addedItems, setAddedItems }) {
    const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(addedItems);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    // Only update the parent state if it's not derived from a state hook
    if (typeof setAddedItems === 'function') {
      setAddedItems(cartItems);
    }
  }, [cartItems, setAddedItems]);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * getItemPriceById(item.id),
      0
    );
  };

  const getItemPriceById = (id) => {
    const shoe = shoeData.shoeData.find((item) => item.id === id);
    return shoe ? shoe.price : 0;
  };

  const getItemNameById = (id) => {
    const shoe = shoeData.shoeData.find((item) => item.id === id);
    return shoe ? shoe.name : '';
  };
  
  const getItemImageById = (id) => {
    const shoe = shoeData.shoeData.find((item) => item.id === id);
    return shoe ? shoe.image : '';
  };


  const checkout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout', { state: { cartItems } });
    } else {
      alert('Cart is empty');
    }
  };

  return (
    <>
      <CartNavbar />
      
      <div className='cart-data'>
      <div className="cart-page">
        <h2>Shopping Cart</h2>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                className="cart-item-image"
                src={getItemImageById(item.id)}
                alt={getItemNameById(item.id)}
              />
              <div className="cart-item-details">
                <h3>{getItemNameById(item.id)}</h3>
                <p>Price: ${getItemPriceById(item.id).toFixed(2)}</p>
                <label>Quantity:</label>
                <input className='cart-input'
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                />
                <button className='cart-button' onClick={() => removeItem(item.id)}>Remove</button>
                <p>Total: ${(getItemPriceById(item.id) * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="total-price">
          <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
          <button onClick={checkout}>Proceed to Checkout</button>
        </div>
      </div>
      </div>
     

      
    </>
  );
}


