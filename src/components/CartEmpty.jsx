import React from 'react'
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';
const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
    <h2>
      Cart Empty <span>😕</span>
    </h2>
    <p>
      Probably you haven't ordered a pizza yet...
      <br />
      Wanna order a pizza? Go to the main page!
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Go Back</span>
    </Link>
  </div>
  )
}

export default CartEmpty
