import React from "react";
import style from "./BuildContols.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
	return (
		<div className={style.BuildControls}>
			<p>
				Current Price: <strong>${props.price.toFixed(2)}</strong>
			</p>
			{controls.map((ctrl) => (
				<BuildControl
					key={ctrl.label}
					label={ctrl.label}
					ingredientAdded={() => props.ingredientAdded(ctrl.type)}
					ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
				/>
			))}
			<button
				className={style.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}
			>
				ORDER NOW
			</button>
		</div>
	);
};

export default BuildControls;
