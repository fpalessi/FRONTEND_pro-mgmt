import useProjects from "../hooks/useProjects";
import ProjectPreview from "../components/ProjectPreview";

const Projects = () => {
  const { projects } = useProjects();

  return (
    <>
      <h1 className="text-4xl font-light">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg p-3">
        {projects?.length ? (
          projects.map((project) => (
            <ProjectPreview key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay proyectos aún
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
