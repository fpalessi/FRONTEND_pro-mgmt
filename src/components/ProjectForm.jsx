import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const ProjectForm = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [client, setClient] = useState("");
  const params = useParams();
  const { showAlert, alert, submitProject, project } = useProjects();

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeliveryDate(project.deliveryDate?.split("T")[0]);
      setClient(project.client);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, description, deliveryDate, client].includes("")) {
      showAlert({ msg: "Rellene todos los campos porfavor", error: true });
      return;
    }

    await submitProject({ id, name, description, deliveryDate, client });

    setId(null);
    setName("");
    setDescription("");
    setDeliveryDate("");
    setClient("");
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {alert.msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label className="text-gray-800 block text-lg" htmlFor="name">
          Nombre del proyecto{" "}
        </label>
        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="mb-5">
        <label className="text-gray-800 block text-lg" htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label className="text-gray-800 block text-lg" htmlFor="delivery-date">
          Fecha de Entrega
        </label>
        <input
          id="delivery-date"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        ></input>
      </div>
      <div className="mb-5">
        <label className="text-gray-800 block text-lg" htmlFor="client">
          Nombre del Cliente
        </label>
        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        ></input>
      </div>
      <input
        type="submit"
        value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
        className="bg-violet-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-purple-700 transition-colors"
      />
    </form>
  );
};

export default ProjectForm;
