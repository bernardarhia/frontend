const ErrorDisplay = ({ error }) => {
  return (
    <div className={error ? "show-error" : "hide-error"}>
      {error?.map((err, index) => (
        <p key={index}>{err}</p>
      ))}
    </div>
  );
};

export default ErrorDisplay;
