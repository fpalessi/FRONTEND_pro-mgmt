import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      {" "}
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x1_5"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
      </div>
      <div className="c">
        <div className="_404">404</div>
        <div className="_1">PAGE NOT FOUND</div>

        <Link to="/projects" className="btn404">
          VOLVER A MIS PROYECTOS
        </Link>
      </div>
    </>
  );
};

export default NotFound;
