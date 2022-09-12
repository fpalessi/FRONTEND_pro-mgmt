import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProjectPreview = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, client, creator } = project;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2 ">
        <p className="flex-1 text-lg">
          {name}{" "}
          <span className="text-sm text-gray-400 uppercase">
            Cliente: {client}
          </span>
        </p>
        {auth._id !== creator && (
          <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
            Colaborador
          </p>
        )}
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-800 hover:text-purple-400 uppercase text-md"
      >
        Ver Proyecto 🧐
      </Link>
    </div>
  );
};

export default ProjectPreview;
