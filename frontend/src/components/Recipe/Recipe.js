import React from 'react';
import './Recipe.css';
import {Link} from "react-router-dom";
import axios from 'axios'
import {BACKEND_URL} from "../../constants";

import {diffStatus, budgetStatus} from '../../functions';
import {IoMdTimer} from 'react-icons/io'
import {MdBubbleChart} from 'react-icons/md'

class Recipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ""
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.recipe.id != this.props.recipe.id) {
            this.updateImage();
        }
    }

    componentDidMount() {
        this.updateImage();
    }

    updateImage() {
        axios.get(`${BACKEND_URL}/recipe/image/${this.props.recipe.id}`).then(
            (result) => {
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
    }

    render() {
        return (
            <Link className='link-recipe' to={`/recipe/${this.props.recipe.id}`} >
                <div className="Recipe">
                    <div className="image-container">
                        <img src={this.state.image} alt='' width='400' height='280' />
                    </div>
                    <h2>{this.props.recipe.name}</h2>
                    <div className="Recipe-information">
                        <div className="Recipe-description">
                            <div className="symbols"><IoMdTimer /></div><p>{`${this.props.recipe.time} mins`}</p>
                            <div className="symbols"><MdBubbleChart /></div><p><div className="card-text">{diffStatus(this.props.recipe.difficulty)}</div></p>
                            <div className="card-icon">{budgetStatus(this.props.recipe.budget)}</div>
                        </div>

                    </div>
                </div>
            </Link>
        );
    }
}

export default Recipe;
