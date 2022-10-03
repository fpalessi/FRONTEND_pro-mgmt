import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FormTaskModal from "../components/FormTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import Task from "../components/Task";
import DeleteCollaboratorModal from "../components/DeleteCollaboratorModal";
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";
import Spinner from "../components/Spinner";
import Collaborator from "../components/Collaborator";

const Project = () => {
  const { getProject, project, loading, handleTaskModal } = useProjects();
  const admin = useAdmin();

  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  // const { name } = project;

  if (loading) return <Spinner />;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl">{project?.name}</h1>
        {admin && (
          <div className="flex items-center gap-2 text-gray-700 text-xl hover:text-black">
            <Link
              to={`/projects/edit/${params.id}`}
              className="uppercase font-bold"
            >
              Editar
            </Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          type="button"
          className="text-sm mt-5 px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-violet-400 text-white text-center flex gap-2 items-center justify-center"
          onClick={handleTaskModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <p className="font-bold text-xl mt-10">Tareas del Proyecto 📝</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        {project?.tasks?.length ? (
          project?.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>
      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl">Colaboradores 🤝</p>
            <Link
              to={`/projects/new-collaborator/${project._id}`}
              className="text-gray-700 text-xl hover:text-black uppercase font-bold"
            >
              Añadir
            </Link>
          </div>
          <div className="bg-white shadow mt-10 rounded-lg">
            {project.collaborators?.length ? (
              project.collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}
      <FormTaskModal />
      <DeleteTaskModal />
      <DeleteCollaboratorModal />
    </>
  );
};

export default Project;
