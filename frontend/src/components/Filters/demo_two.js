const handleSelectChange = (selectedOption) => {
    setSelectedIngredient(selectedOption);
  
    // Get the IDs of the selected options
    const selectedIds = selectedOption.map((option) => option.id);
  
    // Send a POST request to the backend with the selected IDs
    axios.post("http://localhost:8080/recipe/search", { ids: selectedIds })
      .then((response) => {
        const recipes = response.data.recipes;
        // Use the recipes data to display the recipes on the page
        console.log(recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  