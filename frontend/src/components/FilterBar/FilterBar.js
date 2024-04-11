import React from "react";
import './FilterBar.css';
import Filters from '../../components/Filters/Filters'

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};

class FilterBar extends React.Component {
    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption];
            return <li key={sortByOptionValue}>{sortByOption}</li>;
        });
    }
    render() {
        return (
            <div className="FilterBar">
                <div className="FilterBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <Filters mainpage={this.props.mainpage} />
            </div>
        );
    }
}


export default FilterBar;
