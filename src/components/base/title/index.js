import React from "react";
import styles from "./title.module.css";

const Logo = (className, title) => {
  return <h1 className={styles[className]}>{title}</h1>;
};

export default Logo;
