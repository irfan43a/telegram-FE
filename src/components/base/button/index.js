import styles from "./Button.module.css";

const Button = ({ title, btn, color, type }) => {
  return (
    <button className={`${styles[btn]} ${styles[color]}`} type={type}>
      {title}
    </button>
  );
};

export default Button;
