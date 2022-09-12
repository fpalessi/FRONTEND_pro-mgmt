import { useState } from "react";
import { Link } from "react-router-dom";
import axiosRequest from "../config/axiosRequest";
import Alert from "../components/Alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlert({ msg: "Debes de introducir tu email", error: true });
      return;
    }

    try {
      const { data } = await axiosRequest.post(`/users/forgot-password`, {
        email,
      });
      setAlert({ msg: data.msg, error: false });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alert;

  return (
    <>
      <h1 className="text-purple-600 text-4xl text-center underline decoration-sky-500/30">
        Recupera tu contraseña
      </h1>
      <p className="pt-5 text-center text-2xl">
        Te enviaremos un correo para que obtengas una nueva 📧
      </p>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 p-7 bg-white shadow rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="my-2">
          <label className="text-gray-800 block text-lg" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Introduce aquí el email con el que te has registrado"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-purple-600 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-purple-800 transition-colors"
        ></input>
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center text-slate-900 text-md" to="/">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          className="block text-center text-slate-900 text-md"
          to="/register "
        >
          Regístrate aquí
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
