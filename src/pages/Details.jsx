import "../styles/details.css";

const Details = ({ infApi, setConteudo }) => {
  return (
    <div
      className="details-body-content"
      onClick={(e) => {
        if (e.target.className === "details-body-content") setConteudo(null);
      }}
    >
      <div className="details-content">
        <div className="details-container-img">
          <img
            src={window.innerWidth < "750" ? infApi.backdropPath : infApi.img}
            alt=""
          />
          <div className="details-text">
            <h2 className="details-title">{infApi.title || infApi.name}</h2>
            <p className="details-text-paragraph">{infApi.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
