import React from "react";
import style from "./Modal.module.css";

const Modal = (props) => {
	return <div className={style.Modal}>{props.children}</div>;
};

export default Modal;
