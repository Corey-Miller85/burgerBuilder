import React from "react";
import style from "./Logo.module.css";
import burgerLogo from "../../assets/images/burger-logo.png";
const Logo = (props) => (
	<div className={style.Logo}>
		<img src={burgerLogo} alt='MyBurger Logo' />
	</div>
);

export default Logo;
