const SuccessDisplay = ({ success, successMessage }) => {
  return (
    <div className={success ? "show-success" : "hide-success"}>
      {success && <p> {successMessage} </p>}
    </div>
  );
};

export default SuccessDisplay;
