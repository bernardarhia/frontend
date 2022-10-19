import { Link, useLocation } from "react-router-dom";
import "../styles/orders.css";
const OrderSuccess = () => {
  const location = useLocation();
  return (
    <div className="order-success">
      {location.state ? (
        <div className="success">Order successful</div>
      ) : (
        <h2>Page Not found</h2>
      )}
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default OrderSuccess;
