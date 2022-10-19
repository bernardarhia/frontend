import searchIcon from "../assets/svgs/search2.svg";
import shoppingBagIcon from "../assets/svgs/shopping-bag.svg";
import shoppingCartIcon from "../assets/svgs/shopping-cart.svg";
import logoutButton from "../assets/svgs/logout.svg";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
const Header = ({ toggleSearchBar }) => {
  const logout = useLogout();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    const res = await logout();

    if (res.status === 200) {
      setTimeout(() => {
        setAuth(null);
        navigate("/login");
      }, 1500);
    }
  };
  const determineRoute =
    auth && auth?.role === "admin" ? "/dashboard" : !auth ? "/login" : "/";

  const { cart } = useCart();

  return (
    <header>
      <nav>
        <Link to={determineRoute}>
          <h1 className="logo">Bookify</h1>
        </Link>
        <div className="nav-icons">
          {auth?.role === "user" && (
            <>
              <div
                className="nav-icon"
                onClick={toggleSearchBar}
                style={{ cursor: "pointer" }}
              >
                <img src={searchIcon} alt="search icon" />
                <p>Search</p>
              </div>
              <Link to="/orders" className="nav-icon">
                <img src={shoppingBagIcon} alt="checkout icon" />
                <p>Orders</p>
              </Link>

              <Link to="/cart" className="nav-icon">
                <span className="cart-circle">{cart.length}</span>
                <img src={shoppingCartIcon} alt="cart icon" />
                <p>Cart</p>
              </Link>
            </>
          )}
          <div
            className="nav-icon"
            onClick={signOut}
            style={{ cursor: "pointer" }}
          >
            <img src={logoutButton} alt="shopping cart icon" />
            <p>Logout</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
