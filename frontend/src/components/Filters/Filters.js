import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Filters.css";
import Checkbox from "../Checkbox/Checkbox";
import {BACKEND_URL} from "../../constants";
import IngredientSelect from "../IngredientSelect/IngredientSelect";

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

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.select = React.createRef();
        this.state = {
            filters: {
                vegan: false,
                vegetarian: false,
                allergens: false
            }
        }
        this.updateList = this.updateList.bind(this)
    }

    componentDidMount() {
            axios.get(`${BACKEND_URL}/recipe/list`).then((response) => {
                this.props.mainpage.setState(response.data);
            });
    }

    updateList() {
        console.log(this.select.current.state.selectedIngredients)
        const selectedIds = this.select.current.state.selectedIngredients.map(option => option.id);
        axios.get(`${BACKEND_URL}/recipe/list`, {
            params: {
                ingredients: selectedIds,
                ...this.state.filters
            }
        }).then((response) => {
            this.props.mainpage.setState(response.data);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filters !== this.state.filters) {
            this.updateList()
        }
    }

    handleSelectChange = (selectedOptions) => {
        this.setState({selectedIngredient: selectedOptions});
    }


    render () {
        return (
            <div>
                <div className="Checkboxes">
                    <ul>
                        <li><Checkbox 
                            checked={this.state.filters.vegan}
                            onChange={(e) => {
                                e.stopPropagation()
                                this.setState({filters: {vegan: !this.state.filters.vegan}});
                            }}
                            label="Vegan" /></li>
                        <li><Checkbox 
                            checked={this.state.filters.vegetarian}
                            onChange={(e) => {
                                e.stopPropagation()
                                this.setState({filters: {vegetarian: !this.state.filters.vegetarian}});
                            }}
                            label="Vegetarian" /></li>
                        <li><Checkbox 
                            checked={this.state.filters.allergens}
                            onChange={(e) => {
                                e.stopPropagation()
                                this.setState({filters: {allergens: !this.state.filters.allergens}});
                            }}
                            label="Allergens" /></li>
                    </ul>
                </div>
                <div className="center">
                    <IngredientSelect ref={this.select} isMulti onChange={this.updateList}/>
                </div>
            </div>
        );
    }
}

export default DropdownMenu;
