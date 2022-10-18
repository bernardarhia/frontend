const DashboardCard = ({ number, text }) => {
  return (
    <div className="dashboard-card">
      <h3>{text}</h3>
      <p>{number}</p>
    </div>
  );
};

export default DashboardCard;
