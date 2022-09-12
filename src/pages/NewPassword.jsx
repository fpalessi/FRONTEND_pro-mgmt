import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosRequest from "../config/axiosRequest";
import Alert from "../components/Alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [modifiedPassword, setModifiedPassword] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosRequest(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({ msg: "Debes introducir mínimo 6 caracteres", error: true });
      return;
    }
    try {
      const url = `/users/forgot-password/${token}`;
      const { data } = await axiosRequest.post(url, { password });
      setAlert({ msg: data.msg, error: false });
      setModifiedPassword(true);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alert;

  return (
    <>
      <h1 className="text-cyan-600 text-3xl text-center">
        Reestablece tu contraseña y no pierdas acceso a tus proyectos
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form
          className="my-10 p-10 bg-white shadow rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="my-2">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu Nuevo Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-700 mb-5 w-full py-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          ></input>
        </form>
      )}

      {modifiedPassword && (
        <Link
          className="block text-center my-5 text-teal-700 text-2xl hover:underline uppercase "
          to="/"
        >
          👉 Inicia Sesión 👈
        </Link>
      )}
    </>
  );
};

export default NewPassword;
