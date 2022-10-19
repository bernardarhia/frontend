import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import HeaderText from "../../common/HeaderText";
import Input from "../../common/Input";
import CartCard from "../../components/CartCard";
import Container from "../../components/Container";
import Header from "../../components/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useCart from "../../hooks/useCart";
import "../../styles/cart.css";
const Cart = () => {
  const { cart, setCart } = useCart();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState();
  const navigate = useNavigate();
  // const [totalCartPrice, setTotalCartPrice] = useState(0)

  let totalCartPrice = cart.reduce(function (acc, obj) {
    return acc + obj.price;
  }, 0);

  const handleClearCart = async () => {
    setLoading(true);
    try {
      const clearedCart = await axiosPrivate.delete("/cart/delete/all");
      if (clearedCart.status === 200) {
        setCart(clearedCart?.data.cart);
        alert("cart cleared");
      }
    } catch (error) {
      alert("an error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (e) => {
    if ((totalCartPrice > 0 && checkoutAmount <= 0) || !checkoutAmount) {
      alert("Enter an amount to checkout");
      return;
    }
    if (Number(checkoutAmount) !== totalCartPrice) {
      alert(`Amount entered should be equal to ${totalCartPrice}`);
      return;
    }
    try {
      const checkedOut = await axiosPrivate.post("/cart/checkout", {
        price: checkoutAmount,
      });
      if (checkedOut.status === 200) {
        setCart([]);
        navigate("/order/success", { state: { checkout: true } });
      }
    } catch (error) {
      alert("an error occurred");
    }
  };
  return (
    <Container>
      <Header />
      <HeaderText>Cart</HeaderText>
      <div className="cart-container">
        <div className="cart-card__container">
          {cart.length > 0 && (
            <Button
              style={{
                background: "#ff6e6e",
                color: "#fff",
                padding: ".7rem 1rem",
              }}
              onClick={handleClearCart}
            >
              {loading ? "Loading..." : "Clear cart"}
            </Button>
          )}

          {cart.length < 1 ? (
            <h1>Cart Empty</h1>
          ) : (
            cart &&
            cart.map((item, index) => <CartCard cartItem={item} key={index} />)
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-checkout__container">
            <h4>Cart summary</h4>
            <div className="info">
              <p>Subtotal</p>
              <h4>GH&#8373;{totalCartPrice.toFixed(2)}</h4>
            </div>

            <div className="checkout-amount__input">
              <div className="input-container">
                <label htmlFor="amount">Enter amount</label>
                <Input
                  className="input"
                  type="number"
                  id="amount"
                  value={checkoutAmount}
                  onChange={(e) => setCheckoutAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="checkout-button">
              <Button onClick={handleCheckout}>
                Checkout {totalCartPrice.toFixed(2)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
