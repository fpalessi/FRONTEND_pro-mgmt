import { useState, useEffect, createContext } from "react";
import axiosRequest from "../config/axiosRequest";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [loading, setLoading] = useState(false);
  const [searcher, setSearcher] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);

  const navigate = useNavigate();

  const { auth } = useAuth();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosRequest("/projects", config);
        // Send projects to the state
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [auth]);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => setAlert({}), 5000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.put(
        `/projects/${project.id}`,
        project,
        config
      );

      const updatedProjects = projects.map((projectState) =>
        projectState._id == data._id ? data : projectState
      );

      setProjects(updatedProjects);

      setAlert({ msg: "El proyecto ha sido actualizado", error: false });

      setTimeout(() => {
        setAlert({}); // Re-set the alert
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.post("/projects", project, config);
      // With this line below we won't need to refresh the page to see the new project added!
      setProjects([...projects, data]);
      setAlert({
        msg: `El proyecto "${data.name}" ha sido creado`,
        error: false,
      });
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest(`/projects/${id}`, config);

      setProject(data);

      setAlert({});
    } catch (error) {
      navigate("/projects");
      setAlert({ msg: error.response.data.msg, error: true });
      setTimeout(() => {
        setAlert({});
      }, 3000);
      console.log(error);
    }
    setLoading(false);
  };

  const removeProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosRequest.delete(`/projects/${id}`, config);

      const updatedProjects = projects.filter(
        (projectState) => projectState._id !== id
      );

      setProjects(updatedProjects);
      setAlert({ msg: data.msg, error: false });
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskModal = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.post("/tasks", task, config);

      const updatedProject = { ...project };
      updatedProject.tasks = [...project.tasks, data];

      setProject(updatedProject);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {}
  };

  const editTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.put(
        `/tasks/${task.id}`,
        task,
        config
      );
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );
      setProject(updatedProject);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTaskModal = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  const handleRemoveTaskModal = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const removeTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.delete(`/tasks/${task._id}`, config);
      setAlert({ msg: data.msg, error: false });

      // Taking a copy for updating the state purposes
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.filter(
        (taskState) => taskState._id !== task._id
      );
      setProject(updatedProject);

      setModalDeleteTask(false);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch {
      console.log(error);
    }
  };

  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.post(
        "/projects/collaborators",
        { email },
        config
      );
      setCollaborator(data);
      setAlert({});
    } catch (error) {
      console.log(error);
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
    setLoading(false);
  };

  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );
      setAlert({ msg: data.msg, error: false });
      setCollaborator({});
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const handleRemoveCollaboratorModal = (collaborator) => {
    setCollaborator(collaborator);
    setModalDeleteCollaborator(!modalDeleteCollaborator);
  };

  const removeCollaborator = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );
      const updatedProject = { ...project };

      updatedProject.collaborators = updatedProject.collaborators.filter(
        (collaboratorState) => collaboratorState._id !== collaborator._id
      );

      setProject(updatedProject);

      setAlert({
        msg: data.msg,
        error: false,
      });
      setCollaborator({});
      setModalDeleteCollaborator(false);
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosRequest.post(
        `/tasks/state/${id}`,
        {},
        config
      );

      const updatedProject = { ...project };

      updatedProject.tasks = updatedProject.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );
      setProject(updatedProject);
      setTask({});
      setAlert({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchbar = () => {
    setSearcher(!searcher);
  };

  const logOutProjects = () => {
    setProject();
    setProjects();
    setAlert();
  };

  return (
    <ProjectsContext.Provider
      value={{
        alert,
        projects,
        showAlert,
        submitProject,
        getProject,
        project,
        loading,
        removeProject,
        modalFormTask,
        handleTaskModal,
        submitTask,
        handleEditTaskModal,
        task,
        modalDeleteTask,
        removeTask,
        handleRemoveTaskModal,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleRemoveCollaboratorModal,
        modalDeleteCollaborator,
        removeCollaborator,
        completeTask,
        searcher,
        handleSearchbar,
        logOutProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
