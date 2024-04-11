import React from 'react';
import axios from "axios";
import Select from "react-select";
import { BACKEND_URL } from '../../constants';

const customStyles = {
    option: (defaultStyles, state) => ({
        ...defaultStyles,
        color: state.isSelected ? "orange" : "#021145",
        backgroundColor: state.isSelected ? "blue" : "white",
    }),
    control: (defaultStyles) => ({
        ...defaultStyles,
        backgroundColor: "orange",
        padding: "5px",
        border: "none",
        boxShadow: "none",
        width: '500px'
    }),
    singleValue: (defaultStyles) => ({...defaultStyles, color: "#021145"}),
    dropdownIndicator: (defaultStyles) => ({
        ...defaultStyles,
        color: "#021145",
    }),
};

class IngredientSelect extends React.Component {
    constructor (props) {
        super(props)
        
        this.state = {
            ingredients: [],
            selectedIngredients: []
        }
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    componentDidMount() {
        this.populateIngredients(() => {});
    }

    populateIngredients (callback) {
        axios.get(`${BACKEND_URL}/ingredient/list`).then((response) => {
            const options = response.data.ingredients.map((ingredient) => ({
                value: ingredient.name,
                label: ingredient.name,
                id: ingredient.id
            }));
            this.setState({ingredients: options});
            callback();
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedIngredients !== this.state.selectedIngredients)
            this.props.onChange()
    }

    handleSelectChange(selectedOptions) {
        this.setState({selectedIngredients: selectedOptions})
    }

    render() {
        return (<Select
            id="ingredients"
            value={this.state.selectedIngredients}
            onChange={this.handleSelectChange}
            options={this.state.ingredients}
            isSearchable
            isMulti={this.props.isMulti}
            styles={customStyles}
            filters={this}
        />)
    }
}

export default IngredientSelect;
