import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosRequest from "../config/axiosRequest";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState("");
  const [confirmedAcc, setConfirmedAcc] = useState(false);

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;

        const { data } = await axiosRequest(url);

        setAlert({ msg: data.msg, error: false });
        setConfirmedAcc(true);
      } catch (error) {
        console.log(error);
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;
  return (
    <>
      <h1 className="text-purple-600 text-3xl text-center">
        Estamos confirmando tu cuenta... ⏳
      </h1>
      <p className="text-center text-xl pt-5 font-light">
        Es el último paso... ya casi todo está listo
      </p>
      <p className="text-center pt-5">😏</p>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}

        {confirmedAcc && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
