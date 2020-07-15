import React from "react";
import style from "./BuildControl.module.css";

const BuildControl = (props) => {
	return (
		<div className={style.BuildControl}>
			<div>{props.label}</div>
			<button>Less</button>
			<button>More</button>
		</div>
	);
};

export default BuildControl;
