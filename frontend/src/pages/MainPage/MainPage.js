import React from 'react';
import '../../components/App/App.css';
import RecipeList from '../../components/RecipeList/RecipeList';
import FilterBar from '../../components/FilterBar/FilterBar';
import axios from "axios";
import chopboard from './chopboard2.jpg';

const recipe = {
    imageSrc: 'https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204.jpg',
    name: 'Spaghetti Bolognese',
    cookingTime: 30,
    rating: 4.7,
    reviewCount: 6,
    desc: "A quick, easy and tasty spaghetti bolognese.",
    category: "Italian",
    fiveADay: 2
};


class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };
    }

    render() {
        return (
            <div className="App">
                <FilterBar mainpage={this} />
                <RecipeList recipes={this.state.recipes} />
            </div>
        );
    }
}

export default MainPage;
