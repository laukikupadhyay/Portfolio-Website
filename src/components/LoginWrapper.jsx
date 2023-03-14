import styles from "./LoginWrapper.module.css";

const LoginWrapper = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

export default LoginWrapper;
