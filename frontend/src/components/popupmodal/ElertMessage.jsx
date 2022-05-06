import "./elertmassage.css";
const ElertMessage = ({ info }) => {
  return (
    <div
      className="elert"
      style={{
        backgroundColor: info.type === "danger" ? "#ED6C02" : "#0288D1",
      }}
    >
      {info.type === "normal" ? (
        <div className="e-wrapper">
          <i className="fa-solid fa-circle-check"></i>
          <span>{info.message}</span>
        </div>
      ) : (
        <div className="e-wrapper">
          <i className="fa-solid fa-exclamation"></i>
          <span>{info.message}</span>
        </div>
      )}
    </div>
  );
};

export default ElertMessage;
