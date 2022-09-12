import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl">
        Hola{" "}
        <span className="font-bold underline decoration-sky-500/30">
          {auth.name}
        </span>
        👋
      </p>
      <p className="py-5">
        Bienvenido a pro-mgmt, donde podrás administrar tus proyectos de una
        forma eficiente y coordenada.
      </p>
      <p className="py-5">
        Echa un vistazo a tus proyectos, o crea uno nuevo en el botón inferior
        👇
      </p>
      <Link
        to="create-project"
        className="bg-violet-400 hover:underline w-full p-3 mt-5 text-center rounded-lg text-white uppercase font-bold block"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
