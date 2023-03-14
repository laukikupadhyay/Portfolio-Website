import "./LoginWrapper.module.css";

const LoginWrapper = (props) => {
  return <div className="wrapper">{props.children}</div>;
};

export default LoginWrapper;
