import React from 'react';
import './RecipeList.css';
import Recipe from '../Recipe/Recipe';

class RecipeList extends React.Component {
    render() {
        return (
            <div className="RecipeList">
                {
                    this.props.recipes.length>0 ? 
                    this.props.recipes.map(recipe => {
                        return <Recipe recipe={recipe} />
                    }) : <p>Recipe not found.</p>
                }
            </div>
        );
    }
}

export default RecipeList;
