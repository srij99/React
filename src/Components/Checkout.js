import React from 'react';
//import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shoeData from './../data.json';
import { useNavigate } from 'react-router-dom';
import { CartNavbar } from '../Navbar';


export default function Checkout() {
const navigate = useNavigate()
const location = useLocation();
const { cartItems } = location.state;

  // const [discountCode, setDiscountCode] = useState('');
  // const discountCodesList = ['DECEMBER', 'CHRISTMAS'];
  // const discountPercentage = 20;

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

  // const applyDiscount = () => {
  //   if (discountCodesList.includes(discountCode.toUpperCase())) {
  //     return (calculateTotalPrice() * (100 - discountPercentage)) / 100;
  //   }
  //   return calculateTotalPrice();
  // };
  
  const payment = () => {
    navigate('/payment')
  };

  return (<>
    <CartNavbar/>
    <div className="checkout-page">
      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{getItemNameById(item.id)}</td>
              <td>{item.quantity}</td>
              <td>${(getItemPriceById(item.id) * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="discount-code">
        <label className="discount-label">Discount Code:</label>
        <input
          className="discount-input"
          type="text"
          placeholder="ENTER DISCOUNT CODE"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button className="discount-button" type="button" onClick={applyDiscount}>
          Apply Discount
        </button>
      </div> */}
      <div className="total-price">
        <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
        <button className='payment' onClick={payment}>Proceed to Payment</button>
      </div>
    </div>
    </>
  );
}
