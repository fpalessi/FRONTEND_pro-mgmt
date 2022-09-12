import { useState } from "react";
import axiosRequest from "../config/axiosRequest";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({ msg: "Rellene todos los campos porfavor", erro: true });
      return;
    }
    if (password !== repeatPassword) {
      setAlert({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }
    setAlert({});

    try {
      const { data } = await axiosRequest.post(`/users`, {
        name,
        email,
        password,
      });
      setAlert({ msg: data.msg, error: false });
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alert;
  return (
    <>
      <h1 className="text-purple-600 text-4xl text-center underline decoration-sky-500/30">
        Crea tu cuenta
      </h1>
      <p className="pt-5 text-center text-2xl">
        y empieza a administrar tus proyectos ✌️
      </p>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 p-7 bg-white shadow rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="my-2">
          <label className="text-gray-800 block text-lg" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="text-gray-800 block text-lg" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="text-gray-800 block text-lg" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="text-gray-800 block text-lg" htmlFor="password2">
            Repite tu Password
          </label>
          <input
            id="password2"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-purple-600 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-purple-800 transition-colors"
        ></input>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center text-slate-900 text-md" to="/">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          className="block text-center text-slate-900 text-md"
          to="/forgot-password"
        >
          Olvidaste la contraseña?
        </Link>
      </nav>
    </>
  );
};

export default Register;
