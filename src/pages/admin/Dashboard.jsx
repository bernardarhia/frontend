import React, { useEffect, useState } from "react";
import HeaderText from "../../common/HeaderText";
import Container from "../../components/Container";
import Header from "../../components/Header";
import DashboardCard from "../../components/DashboardCard";
import useAuth from "../../hooks/useAuth";
import "../../styles/dashboard.css";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const Dashboard = () => {
  const { auth } = useAuth();
  const [books, setBooks] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get("/books", {
          signal: controller.signal,
        });
        isMounted && setBooks(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);
  return (
    <Container>
      <Header />
      <HeaderText>Welcome {auth?.user}</HeaderText>

      <div className="dashboard-card__container">
        <DashboardCard
          number={!books?.books ? 0 : books?.books.length}
          text="Total books"
        />
        <DashboardCard
          number={!books?.books ? 0 : books?.books.length}
          text="Books bought"
        />
        <DashboardCard
          number={!books?.books ? 0 : books?.books.length}
          text="Total Income"
        />
      </div>
      <div className="books-container">
        <div className="link" style={{ textAlign: "right" }}>
          <Link to="/book/create">Add book</Link>
        </div>
      </div>
      {!books?.books ? (
        <h3>No book created</h3>
      ) : (
        <table id="customers">
          <thead>
            <tr>
              <th>TItle</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {books?.books &&
              books?.books.map((book, index) => (
                <tr>
                  <td>{book.title}</td>
                  <td>{book.price}</td>
                  <td>{book.quantity}</td>
                  <td>{book.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};

export default Dashboard;
