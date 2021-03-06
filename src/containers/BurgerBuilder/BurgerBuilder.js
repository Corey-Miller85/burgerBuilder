import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
	};

	updatePurchaseSate = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => sum + el, 0);
		this.setState({ purchasable: sum > 0 });
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};

		updatedIngredients[type] = updateCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseSate(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount > 0 ? oldCount - 1 : oldCount;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updateCount;
		const oldPrice = this.state.totalPrice;
		const priceSubtration = INGREDIENT_PRICES[type];
		const newPrice = oldPrice - priceSubtration;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseSate(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({
			purchasing: true,
		});
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false,
		});
	};

	purchaseContinueHandler = () => {
		// alert("You Continue!");
		this.setState({
			loading: true,
		});
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Corey Miller",
				address: {
					street: "TestStreet",
					zipCode: "12345",
					country: "US",
				},
				email: "test@test.com",
			},
			delieveryMethod: "fastest",
		};
		axios
			.post("/orders.json", order)
			.then((response) => {
				this.setState({
					loading: false,
					purchasing: false,
				});
			})
			.catch((error) => {
				this.setState({
					loading: false,
					purchasing: false,
				});
			});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = (
			<OrderSummary
				ingredients={this.state.ingredients}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				price={this.state.totalPrice}
			/>
		);
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
