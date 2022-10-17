import React from 'react'
import searchIcon from "../assets/svgs/search2.svg"
import userIcon from "../assets/svgs/user.svg"
import shoppingCartIcon from "../assets/svgs/shopping-bag.svg"
const Header = ({toggleSearchBar}) => {
  return (
    <header>
    <nav>
        <h1 className="logo">Bookify</h1>
        <ul>
            <li><a href="/" className="active">Books</a></li>
            <li><a href="/">Audio</a></li>
            <li><a href="/">Stationery & Gifts</a></li>
            <li><a href="/">Blog</a></li>
        </ul>
        <div className="nav-icons">
            <img src={searchIcon} alt="search icon" onClick={toggleSearchBar} />
            <img src={userIcon} alt="user icon" />
            <img src={shoppingCartIcon} alt="shopping cart icon" />

        </div>
    </nav>
</header>
  )
}

export default Header