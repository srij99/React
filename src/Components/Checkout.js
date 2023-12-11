import React from 'react';
import { useLocation } from 'react-router-dom';
import shoeData from './../data.json';
import { useNavigate } from 'react-router-dom';
import { CartNavbar } from '../Navbar';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state;

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (getItemPriceById(item.id) * item.quantity + calculateTax(item.id)),
      0
    );
  };

  const getItemPriceById = (id) => {
    const shoe = shoeData.shoeData.find((item) => item.id === id);
    return shoe ? shoe.price : 0;
  };

  const calculateTax = (id) => {
    return (getItemPriceById(id) * cartItems.find((item) => item.id === id).quantity * 0.05 );
  };
  


  const getItemNameById = (id) => {
    const shoe = shoeData.shoeData.find((item) => item.id === id);
    return shoe ? shoe.name : '';
  };

  const payment = () => {
    navigate('/payment');
  };

  return (
    <>
      <CartNavbar />
      <div className="checkout-page">
        <h2>Order Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{getItemNameById(item.id)}</td>
                <td>{item.quantity}</td>
                <td>${(getItemPriceById(item.id) * item.quantity).toFixed(2)}</td>
                <td>${calculateTax(item.id).toFixed(2)}</td>
                <td>
                  ${(getItemPriceById(item.id) * item.quantity + calculateTax(item.id)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-price">
          <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
          <button className="payment" onClick={payment}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
}
