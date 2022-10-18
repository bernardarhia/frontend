import React from "react";
import searchIcon from "../assets/svgs/search2.svg";
import userIcon from "../assets/svgs/user.svg";
import shoppingCartIcon from "../assets/svgs/shopping-bag.svg";
import logoutButton from "../assets/svgs/logout.svg";
import Button from "../common/Button";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
const Header = ({ toggleSearchBar }) => {
  const logout = useLogout();
  const {auth} = useAuth()

  const signOut = async () => {
    await logout();
   
  };
  return (
    <header>
      <nav>
        <h1 className="logo">Bookify</h1>
        <div className="nav-icons">
          {
            auth?.role === "user" && (
              <>
              <img src={searchIcon} alt="search icon" onClick={toggleSearchBar} />
              <img src={userIcon} alt="user icon" />
              <img src={shoppingCartIcon} alt="shopping cart icon" />
              </>
            )
          }
          <img src={logoutButton} alt="shopping cart icon" onClick={signOut} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
