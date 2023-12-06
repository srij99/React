import shoeData from './../data.json';
import './../App.css';
import { HomeNavbar } from "../Navbar";

export default function Home({ addData, addedItems }) {
  return (
    <>
      <HomeNavbar />
      <div className="home-page">
        <h1>Shoe Collection</h1>
        <div className="shoe-container">
          {shoeData.shoeData.map((shoe) => (
            <div key={shoe.id} className="shoe-card">
              <img className="imagesrc" src={shoe.image} alt={shoe.name} />
              <div className="shoe-details">
                <h2 className="title">{shoe.name}</h2>
                <p className="price">${shoe.price.toFixed(2)}</p>
                <button className="add-to-cart" onClick={() => addData(shoe.id)}>
                  {addedItems.some(item => item.id === shoe.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
