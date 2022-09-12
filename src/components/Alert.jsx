const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? "from-red-400 to-red-600" : "from-green-400 to-green-600"
      } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-semibold text-md my-10`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
