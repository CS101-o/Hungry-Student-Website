import React from "react";
import IngredientSelect from "../../components/IngredientSelect/IngredientSelect";
import IngredientCreation from './IngredientCreation';

class IngredientAdder extends React.Component {

    constructor(props) {
        super(props)
        this.ingredientSelector = React.createRef();
        this.ingredientCreation = React.createRef()

        this.state = {
            id: -1,
            name: "",
            quantity: "0",
            unit: "grams",
            ingredients: []
        }
        this.addIngredient = this.addIngredient.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIngredientSelectChange = this.handleIngredientSelectChange.bind(this);
        this.createIngredient = this.createIngredient.bind(this);
        this.updateIngredients = this.updateIngredients.bind(this);
    }

    handleIngredientSelectChange() {
        const ingredient = this.ingredientSelector.current.state.selectedIngredients
        this.setState({id: ingredient.id, name: ingredient.value})
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        this.setState(
            {
                [name]: type === "checkbox" ? checked : value
            }
        )
    }

    addIngredient(event) {
        event.preventDefault();
        const newIngredient = {
            id: this.state.id,
            name: this.state.name,
            unit: this.state.unit,
            quantity: this.state.quantity
        }
        if (newIngredient.id != -1 && newIngredient.quantity != 0) {
            this.setState({
                id: -1,
                name: "",
                quantity: "0",
                ingredients: [...this.state.ingredients,
                    newIngredient]
            })
            this.ingredientSelector.current.setState({selectedIngredients: []})
        }
    }

    createIngredient(event) {
        event.preventDefault();
        this.ingredientCreation.current.openModal()
    }

    updateIngredients() {
        this.ingredientSelector.current.populateIngredients(() => {})
    }

    render() {
        return (<>
            <IngredientCreation onClose={this.updateIngredients} ref={this.ingredientCreation} />
            <table>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                </tr>
                {this.state.ingredients.map((ingredient) => {
                    return (
                        <tr>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.quantity}</td>
                            <td>{ingredient.unit}</td>
                        </tr>
                    )
                })}
                <tr>
                    <td>
                        <IngredientSelect isMulti={false} ref={this.ingredientSelector} onChange={this.handleIngredientSelectChange} />
                    </td>
                    <td>
                        <input type="text" name="quantity" value={this.state.quantity} onChange={this.handleChange} />

                    </td>
                    <td>
                        <input type="text" name="unit" value={this.state.unit} onChange={this.handleChange} /></td>
                    <td>
                        <button onClick={this.addIngredient}>+</button>
                    </td>
                </tr>
            </table>
            <br />
            <button onClick={this.createIngredient}>Create New Ingredient</button>
        </>)
    }

}

export default IngredientAdder;
