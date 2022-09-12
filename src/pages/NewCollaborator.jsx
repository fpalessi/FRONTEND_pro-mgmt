import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CollaboratorForm from "../components/CollaboratorForm";
import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const NewCollaborator = () => {
  const { getProject, project, loading, collaborator, addCollaborator, alert } =
    useProjects();

  const params = useParams();
  useEffect(() => {
    getProject(params.id);
  }, []);

  if (!project?._id) return <Alert alert={alert}></Alert>;

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir colaborador a: {project.name}
      </h1>
      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        collaborator?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Hemos encontrado los siguientes colaboradores
              </h2>
              <div className="flex justify-between items-center gap-2">
                <p>{collaborator.name}</p>
                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() => addCollaborator({ email: collaborator.email })}
                >
                  Agregar al Proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewCollaborator;
