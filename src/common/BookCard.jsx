import React from 'react'
import { Link } from 'react-router-dom';
import crazyRichAsianImage from "../assets/pngs/crazyrichasians.png";

const BookCard = () => {
  return (
    <div className="card">
            <div className="card-img">
              <img src={crazyRichAsianImage} alt="crazy rich asians" />
            </div>
            <div className="card-content">
              <p className="author">kevin kwan</p>
              <Link to="/book/1"><h3>Crazy rich asians</h3></Link>
              <p className="content">
                The outrageously funny debut novel about three super-rich,
                pedigred chinese families and gossip
              </p>
              <div className="current-amount">
                <span className="first">$4.99</span>
              </div>
              <Link to="/" className='cart-button'>Add to cart</Link>
            </div>
          </div>
  )
}

export default BookCard