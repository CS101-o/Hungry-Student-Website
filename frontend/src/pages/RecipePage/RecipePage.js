import React from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios'

import Card from "./Card";
import "../../components/App/App.css";
import {Link} from "react-router-dom";
import {BACKEND_URL} from "../../constants";

import { AiOutlineArrowLeft } from 'react-icons/ai';


class RecipePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemLoaded: false,
            recipeItem: {},
            stepsLoaded: false,
            recipeSteps: [],
            image: ""
        };
    }

    componentDidMount() {
        axios.get(`${BACKEND_URL}/recipe/info/${this.props.params.id}`).then(
            (result) => {
                this.setState({
                    itemLoaded: true,
                    recipeItem: result.data
                });
            },
            (error) => {
                this.setState({
                    itemLoaded: false,
                    error
                });
            }
        )
        axios.get(`${BACKEND_URL}/recipe/image/${this.props.params.id}`).then(
            (result) => {
                console.log(result)
                this.setState({
                    image: result.data.image
                });
            },
            (error) => {
                this.setState({
                    image: "",
                    error
                });
            }
        )

        axios.get(`${BACKEND_URL}/recipe/body/${this.props.params.id}`).then(
            (result) => {
                this.setState({
                    stepsLoaded: true,
                    recipeSteps: result.data.steps
                });
            },
            (error) => {
                this.setState({
                    stepsLoaded: false,
                    error
                });
            }
        )
    }

    render() {
        const {itemLoaded, recipeItem, stepsLoaded, recipeSteps, image} = this.state;
        return (
            <>
                <Link className='link' to="/">
                    <p className='back-text'><AiOutlineArrowLeft/> Back</p>
                </Link>
                <div className="container-fluid">
                    <div className="row">
                        <Card
                            title={recipeItem.name}
                            date={recipeItem.date}
                            time={recipeItem.time}
                            difficulty={recipeItem.difficulty}
                            budget={recipeItem.budget}
                            image={image}
                        />
                    </div>
                </div>

                <div className="tools-column">
                    <ul className="list-unstyled">
                        <h3 className='titles'>Ingredients</h3>
                        <ul>
                            {
                                itemLoaded && recipeItem.ingredients.map(ingredient => {
                                    return <li>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
                                })
                            }
                        </ul>
                    </ul>
                </div>
                <div class="instructions-column">
                    <ol type="1"><h3 className='titles'>Instructions</h3>
                        {
                            stepsLoaded && recipeSteps.map(step => {
                                return <li>{step}</li>
                            })
                        }
                    </ol>
                </div>
            </>
        )
    }
};

export default (props) => (
    <RecipePage
        {...props}
        params={useParams()}
    />
);

