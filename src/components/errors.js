const ErrorName = (props) => {
  function error() {
    if (!props.error.length) {
      return "nazwa powinna mieć co najmniej 3 znaki";
    } else if (!props.error.repeat) {
      return "nazwa nie powinna się powtarzać";
    }
  }
  const txtContent = error();
  return <>{txtContent ? <span className="error">{txtContent}</span> : null}</>;
};

const ErrorDate = (props) => {
  function error() {
    if (!props.error.format) {
      return "data nie ma odpowiedniego formatu";
    } else if (!props.error.choosen) {
      return "wybierz datę";
    } else if (!props.error.past) {
      return "podana data jest przeszła";
    }
  }
  const txtContent = error();
  return <>{txtContent ? <span className="error">{txtContent}</span> : null}</>;
};

export default ErrorName;
export { ErrorDate };
