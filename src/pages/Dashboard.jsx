import React from "react";
import HeaderText from "../common/HeaderText";
import Container from "../components/Container";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import useAuth from "../hooks/useAuth";
import useBooks from "../hooks/useBooks";
import "../styles/dashboard.css";
const Dashboard = () => {
  const { auth } = useAuth();
  const { books } = useBooks();
  return (
    <Container>
      <Header />
      <HeaderText>Welcome {auth?.user}</HeaderText>

      <div className="dashboard-card__container">
        <DashboardCard number={books?.books.length} text="Total books"/>      
        <DashboardCard number={books?.books.length} text="Books bought"/>      
        <DashboardCard number={books?.books.length} text="Total Income"/>

      </div>
        {books?.books.map((book, index)=><p key={index}>{book.title}</p>)}
    </Container>
  );
};

export default Dashboard;
