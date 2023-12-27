import "../styles/details.css";

const Details = ({ infApi, setConteudo }) => {
  return (
    <>
      <div className="details-body-content">
        <div className="details-content">
          <div className="details-container-img">
            <img src={infApi.img} alt="" />
          </div>
          <div className="details-text">
            <h2 className="details-title">{infApi.title || infApi.name}</h2>
            <p className="details-text-paragraph">{infApi.desc}</p>
          </div>
          <span
            className="details-btn-close-modal"
            onClick={() => {
              setConteudo(null);
            }}
          >
            X
          </span>
        </div>
      </div>
    </>
  );
};

export default Details;
