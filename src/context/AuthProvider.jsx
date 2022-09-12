import { useState, useEffect, createContext } from "react";

import axiosRequest from "../config/axiosRequest";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        // User auth : requires a bearer token
        const { data } = await axiosRequest("/users/profile", config);
        console.log(data);
        setAuth(data);
      } catch (error) {
        setAuth({});
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    authenticateUser();
  }, []);

  const logOutAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logOutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
