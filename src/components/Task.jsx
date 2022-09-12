import useAdmin from "../hooks/useAdmin";
import useProjects from "../hooks/useProjects";
import { formatDate } from "../helpers/formatDate";

const Task = ({ task }) => {
  const { handleEditTaskModal, handleRemoveTaskModal, completeTask } =
    useProjects();
  const admin = useAdmin();
  const { description, name, priority, deliveryDate, state, _id } = task;

  return (
    <div className="border-b my-2 p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-md text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-md">Fecha límite: {formatDate(deliveryDate)}</p>
        <p className="mb-1 text-red-500 font-bold">Prioridad: {priority}</p>
        {state && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            {" "}
            Completada por: {task.completed.name}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleEditTaskModal(task)}
          >
            Editar
          </button>
        )}
        <button
          className={`${
            state ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg
            `}
          onClick={() => completeTask(_id)}
        >
          {state ? "Completa ✔" : "Incompleta ⏳"}
        </button>
        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleRemoveTaskModal(task)}
          >
            Eliminar ❌
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
