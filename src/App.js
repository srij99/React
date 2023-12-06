import {Login, Sign} from "./Components/LoginSign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Payment from "./Components/Payment";
import './App.css'
import { useState } from "react";

function App() {

  const [addedItems, setAddedItems] = useState([]);

  const addData = (id) => {
    const existingItem = addedItems.find((item) => item.id === id);

    if (existingItem) {
      alert("Item already added to the cart!");
    } else {
      setAddedItems([...addedItems, { id, quantity: 1 }]);
    }
  };

  


  return (
    <>
    <Router>
      <Routes>
        <Route path='/home' element={<Home addData={addData} addedItems={addedItems}/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Sign/>}/>
        <Route path='/cart' element={<Cart addedItems={addedItems} setAddedItems={setAddedItems}/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='*' element={<Payment/>}/>
        
      </Routes>
    </Router>
      
    </>
  );
}

export default App;
