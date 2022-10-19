import { useEffect, useState } from "react";
import HeaderText from "../../common/HeaderText";
import Container from "../../components/Container";
import Header from "../../components/Header";
import OrderCard from "../../components/OrderCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState({});
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axiosPrivate.get(`/cart/checkout/all`);
        setOrders(data);
        console.log(data);
      } catch (err) {
        alert("An error occurred");
      }
    };
    getOrders();
  }, [axiosPrivate]);

  return (
    <Container>
      <Header />
      <HeaderText>Orders</HeaderText>
      <div className="cart-container" style={{ display: "block" }}>
        <div className="cart-card__container" style={{ margin: "1rem auto" }}>
          {orders.products?.map((item, index) => (
            <OrderCard key={index} orderItem={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Orders;
