import React from 'react';
import IngredientAdder from './IngredientAdder';
import axios from "axios";
import {BACKEND_URL} from "../../constants";
import {Navigate} from "react-router-dom";
import {diffStatus, budgetStatus} from '../../functions';
import './UploadPage.css'

const getBase64 = file => {
    return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();

        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            resolve(baseURL);
        };
    });
};
class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.ingredientAdder = React.createRef()
        this.state = {
            id: false,
            name: "",
            difficulty: 1,
            budget: 2,
            time: 0,
            image: "",
            steps: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    handleSubmit(event) {
        const request = {
            ...this.state,
            ingredients: this.ingredientAdder.current.state.ingredients
        }
        axios.post(`${BACKEND_URL}/recipe/add`, {recipe: request}).then((response) => {
            this.setState({id: response.data.id})
        });


        event.preventDefault();
    }

    handleChangeImage(event) {
        if (event.target.files.length > 0)
            getBase64(event.target.files[0])
                .then(result => {
                    this.setState({
                        image: result
                    });
                })
                .catch(err => {
                    console.log(err);
                });
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        this.setState(
            {
                [name]: type === "checkbox" ? checked : value
            }
        )
    }

    render() {
        return <>
            {
                this.state.id ? (
                    <Navigate to={`/recipe/${this.state.id}`} />
                ) : (
             <div id="uploadPage">
                        <form onSubmit={this.handleSubmit}>
                            <h2>Upload Recipe</h2>
                            <h3>Name</h3>
                            <label>
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                            </label>
                            <br />

                            <h3>Time (Minutes)</h3>
                            <label>
                                <input type="text" name="time" value={this.state.time} onChange={this.handleChange} />
                            </label>
                            <br />

                            <h3>Difficulty</h3>
                            <ul>
                                {[...Array(3)].map((x, i) => {
                                    const d = i + 1;
                                    return <li><label>
                                        <input type="radio" name="difficulty" value={d} checked={this.state.difficulty === `${d}`} onChange={this.handleChange} />
                                        <span><div class="radio-label">{diffStatus(d)}</div></span>
                                    </label></li>;
                                })}
                            </ul>
                            <h3>Budget</h3>
                            <ul>
                                {[...Array(3)].map((x, i) => {
                                    const d = i + 1;
                                    return <li><label>
                                        <input type="radio" name="budget" value={d} checked={this.state.budget === `${d}`} onChange={this.handleChange} />
                                        <span><div class="radio-label">{budgetStatus(d)}</div></span>
                                    </label></li>;
                                })}
                            </ul>

                            <br />
                            <h3>Ingredients</h3>
                            <IngredientAdder ref={this.ingredientAdder} />
                            <br />
                            <h3>Cover Image</h3>
                            <input type="file" name="image" accept="image/*" onChange={this.handleChangeImage} />
                            <br />

                            <h3>Steps</h3>
                            <label>
                                <textarea onChange={(event) => this.setState({steps: event.target.value.split("\n")})} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>

                    </div>)
            }
        </>
    }
}

export default UploadPage;
