import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import useAuth from "../hooks/useAuth";
import SearchBar from "./SearchBar";

const Header = () => {
  const { handleSearchbar, logOutProjects } = useProjects();
  const { logOutAuth } = useAuth();

  const handleLogOut = () => {
    try {
      if (confirm("Seguro que quieres cerrar sesión?")) {
        logOutAuth();
        logOutProjects();
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <div>
          <Link
            to="/projects"
            className="font-mono text-4xl text-violet-600 font-black text-center mb-5 cursor-default underline decoration-sky-500/30 "
          >
            pro-mgmt
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <button
            type="button"
            className="font-light uppercase text-lg hover:underline"
            onClick={handleSearchbar}
          >
            Buscar Proyecto
          </button>
          <Link
            to="/projects"
            className="font-light uppercase text-lg  hover:underline"
          >
            Mis Proyectos
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-violet-600 hover:bg-purple-400 p-3 rounded-md font-bold uppercase"
            onClick={handleLogOut}
          >
            Cerrar Sesión
          </button>
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
