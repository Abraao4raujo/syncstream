import "../styles/details.css";

const Details = ({ imgPath, title, desc }) => {
  return (
    <>
      <div className="details-body-content">
        <div className="details-container-img">
          <img src={imgPath} alt="" />
        </div>
        <div className="details-text">
          <h2 className="details-title">{title}</h2>
          <p className="details-text-paragraph">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
