import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import axiosRequest from "../config/axiosRequest";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({ msg: "Rellena todos los campos", error: true });
      return;
    }
    try {
      const { data } = await axiosRequest.post("/users/login", {
        email,
        password,
      });
      setAlert({});

      localStorage.setItem("token", data.token);

      setAuth(data);
      navigate("/projects");
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alert;

  return (
    <>
      <h1 className="text-purple-600 text-4xl text-center underline decoration-sky-500/30">
        Inicia Sesión
      </h1>
      <p className="pt-5 text-center text-2xl">
        y accede a tus proyectos y tareas 😎
      </p>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 p-7 bg-white shadow rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="my-2">
          <label className=" text-gray-800 block text-lg" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="my-5">
          <label className=" text-gray-800 block text-lg" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-purple-600 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-purple-800 transition-colors"
        ></input>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center text-slate-900 text-md"
          to="/register"
        >
          ¿No estás registrado? Hazlo ya
        </Link>
        <Link
          className="block text-center text-slate-900 text-md"
          to="/forgot-password"
        >
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
