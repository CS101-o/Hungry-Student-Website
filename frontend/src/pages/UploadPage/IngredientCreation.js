import React from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {BACKEND_URL} from "../../constants";
import axios from "axios";
import Checkbox from '../../components/Checkbox/Checkbox';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class IngredientCreation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            success: false,
            modalIsOpen: false,
            name: "",
            vegan: false,
            vegetarian: false,
            allergen: false
        }
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true})
        this.setState({
            success: false,
            name: "",
            vegan: false,
            vegetarian: false,
            allergen: false
        }
        )
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }

    handleSubmit(event) {
        event.preventDefault();
        // send ingredient POST to /upload/ingredient
        axios.post(`${BACKEND_URL}/ingredient/add`, {ingredient: this.state}).then((response) => {
            this.setState({success: true})
            setTimeout(() => {
                if (this.props.onClose) {
                    this.props.onClose()
                }
                this.closeModal();
            }, 2000);
        });
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        this.setState({
            [name]: type === "checkbox" ? checked : value
        })
    }

    render() {
        return (
            <Modal
                open={this.state.modalIsOpen}
                onClose={this.closeModal}
            >
                {this.state.success && <div>Ingredient Created</div>}
                <h3>Create New Ingredient</h3>
                <div>
                    <label> Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <br />

                    <ul>
                        <li><Checkbox
                            name="vegan"
                            checked={this.state.vegan}
                            onChange={this.handleChange}
                            label="Vegan" /></li>
                        <li><Checkbox
                            name="vegetarian"
                            checked={this.state.vegetarian}
                            onChange={this.handleChange}
                            label="Vegetarian" /></li>
                        <li><Checkbox
                            name="allergen"
                            checked={this.state.allergen}
                            onChange={this.handleChange}
                            label="Allergen" /></li>
                    </ul>
                    <input onClick={this.handleSubmit} type="submit" value="Submit" />
                </div>
            </Modal>
        )
    }
}

export default IngredientCreation;
