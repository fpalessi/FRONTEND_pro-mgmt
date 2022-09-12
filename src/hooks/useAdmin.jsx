import useProjects from "./useProjects";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { project } = useProjects();
  const { auth } = useAuth();

  // If the authenticated user (auth._id) is the creator (project.creator) -> admin
  return project.creator === auth._id;
};

export default useAdmin;
