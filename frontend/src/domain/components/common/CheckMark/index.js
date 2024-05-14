import "./style.css";

const CheckMark = () => {
  return (
    <div className="success-container">
      <img src="./favicon.png" alt="Success" className="success-image" />
      <h2 className="check-successfull">Successful!</h2>
    </div>
  );
};

export default CheckMark;
