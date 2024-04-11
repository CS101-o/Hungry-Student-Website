import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "./Filters.css";

function DropdownMenu() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [recipeBody, setRecipeBody] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/ingredient/list").then((response) => {
      const options = response.data.ingredients.map((ingredient) => ({
        value: ingredient.name,
        label: ingredient.name,
        id: ingredient.id
      }));
      setIngredients(options);
    });
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedIngredient(selectedOption);
    const selectedIds = selectedOption.map(option => option.id);
    // Add code to fetch recipe JSON file and display it
    if (selectedIds.length > 0) {
      axios.get("http://localhost:8080/recipe/body/10").then((response) => {
        setRecipeBody(response.data);
      });
    } else {
      setRecipeBody(null);
    }
  };

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
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#021145" }),
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "#021145",
    }),
  };

  return (
    <div>
      <div className="center">
        <Select 
          id="ingredients"
          value={selectedIngredient}
          onChange={handleSelectChange}
          options={ingredients}
          isSearchable
          isMulti
          styles={customStyles}
        />
      </div>
      {recipeBody && (
        <div>
          <h3>Recipe Body:</h3>
          <pre>{JSON.stringify(recipeBody, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
