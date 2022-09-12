import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const PublicRoute = () => {
  const { auth, loading } = useAuth();
  if (loading) return <Spinner />;
  return (
    <>
      {auth._id ? (
        <Navigate to="*" />
      ) : (
        <main className="container mx-auto p-2 mt-5 md:mt-20 md:flex md:justify-center">
          <div className="md:w-2/3 lg:w-1/2 xl:w-1/3">
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
};

export default PublicRoute;
