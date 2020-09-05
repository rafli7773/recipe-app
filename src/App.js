import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
  const APP_ID = "4a9cc9eb";
  const APP_KEY = "dac00490e8a51cba76b7fa6354fe665f";
  // const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }


  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  useEffect(() => {
    getRecipes();
  }, [query]);

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button type="submit" className="search-button" >Search</button>
      </form>
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.calories} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} />
      ))}
    </div>
  );
}

export default App;
