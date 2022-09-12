import useProjects from "../hooks/useProjects";

const Collaborator = ({ collaborator }) => {
  const { handleRemoveCollaboratorModal } = useProjects();

  const { name, email } = collaborator;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="font-bold text-lg">{name}</p>
        <p className="text-sm text-gray-700 uppercase py-2">Email: {email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleRemoveCollaboratorModal(collaborator)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Collaborator;
