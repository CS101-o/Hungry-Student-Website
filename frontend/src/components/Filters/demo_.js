import React, { useState, useEffect } from "react";
import axios from "axios";

function DropdownMenu() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/ingredient/list").then((response) => {
      setIngredients(response.data.ingredients);
    });
  }, []);

  return (
    <div>
      <label htmlFor="ingredients">Select an ingredient:</label>
      <select id="ingredients" name="ingredients">
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.name}>
            {ingredient.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownMenu;
