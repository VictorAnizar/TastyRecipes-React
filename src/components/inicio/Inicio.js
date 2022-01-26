import React, { useEffect, useState } from "react";
import './inicio.scss'
import persona from '../../styles/img/undraw_cooking_lyxy.svg';
// Importing react bootstrap components
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
// Importing mui component
import RecipeReviewCard from "./RecipeReviewCard";


import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";

const CardRecipe = ({ info }) => {

    if (info == null) {
        return null;
    }
    else return (
        <div className="card-recipe">
            <div className="card-recipe-image-container">
                <img src={info.strMealThumb} style={{ width: "100%" }} />
            </div>
            <div className="card-recipe-short-info">
                <h3>{info.strMeal}</h3>
                <h5>Category: {info['strCategory']}</h5>
            </div>
        </div>
    );
}

const GridCategories = (props) => {
    if (props.categories == null) {
        return null;
    }
    else return (
        <>
            {props.categories.map((category, index) =>
                <CardCategory
                    info={category}
                    key={index}
                    selectCategory={props.selectCategory}
                />
            )}
        </>
    )
}


const GridRecipesCategories = (props) => {
    return (
        <>
            {props.recipesCat.map((recipeCat, index) =>
                <RecipeReviewCard key={index} info={recipeCat} />
            )}
        </>
    )
}


const CardCategory = (props) => {
    let navigate = useNavigate();

    function handleClick() {
    };

    return (
        <div
            // as={Link} to="#grid-selected-category"
            className="card-category"
            onClick={(e) => {
                e.preventDefault()
                props.selectCategory(props.info.strCategory);
                // navigate('/#grid-selected-category');
            }}
        >
            <div className="card-category-image-container">
                <img src={props.info.strCategoryThumb} style={{ width: "100%" }} />
            </div>
            <div className="card-category-short-info">
                <h5>{props.info.strCategory}</h5>
            </div>

        </div>
    )
}



const Inicio = () => {

    // Var for the random recipe 
    const [randomRecipe, setRandomRecipe] = useState(null);
    // Var for the array of categories
    const [categories, setCategories] = useState(null);
    // var for the array of one specific category
    const [selectedCategory, setSelectedCategory] = useState(null);
    // Var just for save the name of the selected category
    const [category, setCategory] = useState(null);
    // Var for save the current value of the form
    const [textField, setTextField] = useState('');
    // Var for the array of the searched meals
    const [searchRecipe, setSearchRecipe] = useState(null);
    // Var just for save the name of the searched name recipe
    const [searchedName, setSearchedName] = useState(null);
    const selectCategory = async (cat) => {
        await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + cat)
            .then(res => res.json())
            .then(data => {
                // console.log("cat seleccionada" + cat);
                // console.log(data.meals);
                setSelectedCategory(data.meals);
                setCategory(cat)
            });
        // console.log(cat);
    }
    const getRandomRecipe = async () => {
        await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(data => {
                setRandomRecipe(data.meals[0]);
                // setLoading(false);
            });
    }
    const getCategories = async () => {
        await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories)
            });
    }

    const searchByName = async (keyword) => {
        keyword = keyword.trim().toLowerCase();
        setSearchedName(keyword);
        await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + keyword)
            .then(res => res.json())
            .then(data => {
                console.log(data.meals);
                setSearchRecipe(data.meals)
            });
    }

    useEffect(() => {
        getRandomRecipe();
        getCategories();

    }, []);
    return (
        <div className="container">
            {/* Section of search recipe */}
            <div className="searcher-div">
                <div className="searcher-info">
                    <h2 >
                        The best meal recipes!
                    </h2>
                    <p >
                        Do you know what to cook? Tons of delightables recipes are waiting for you
                    </p>
                    <Form className="searcher-form" onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <Form.Control className="searcher-form-searcher" type="text" placeholder="Recipe name"
                            value={
                                textField
                            }
                            onChange={
                                (e) => {
                                    e.preventDefault();
                                    // console.log(e.target.value)
                                    setTextField(e.target.value);
                                }}

                        />

                        <Button className="searcher-form-button" variant="outline-warning"
                            onClick={(e) => {

                                e.preventDefault();
                                if (textField != '') {
                                    console.log(textField);
                                    setTextField('');
                                    searchByName(textField);
                                }
                            }}>
                            Search recipe
                        </Button>
                    </Form>
                </div>

                <div className="searcher-image">
                    <img src={persona} style={{ width: "60%" }} />
                </div>
            </div>
            {searchRecipe ?
                <div className="searched-recipes">
                    <h2>Searching by the text: "{searchedName}"</h2>
                    <Button variant="warning" onClick={() => {
                        setSearchRecipe(null);
                    }}>Clean the search...</Button>{' '}
                    <div className="grid-searched-recipes">
                        {searchRecipe.map((recipeSearched, index) =>
                            <RecipeReviewCard key={index} info={recipeSearched} />
                        )}
                    </div>
                </div>
                : null}
            {/* section of daily/random recipe */}
            <div className="daily-recipe">
                <h2 >
                    Get a random recipe!
                </h2>
                <p>
                    Anyone you get, it'll be delicious!
                </p>
                {/* <CardRecipe info={randomRecipe} /> */}
                <RecipeReviewCard info={randomRecipe}></RecipeReviewCard>
            </div>
            {/* section of categories */}

            {selectedCategory ?
                <div className="selected-category" id="grid-selected-category">
                    <h2>Showing by category: {category}</h2>
                    <Button variant="warning" onClick={() => {
                        setSelectedCategory(null);
                    }}>Show all categories...</Button>{' '}

                    <div className="grid-selected-category" >
                        {selectedCategory.map((recipeCat, index) =>
                            <RecipeReviewCard key={index} info={recipeCat} fromCategory={true} />
                        )}
                    </div>
                </div> :
                <>
                    <h2>Our categories</h2>
                    <div className="categories">

                        <GridCategories categories={categories} selectCategory={(selectedCategory) => selectCategory(selectedCategory)} />
                    </div>
                </>
            }

        </div>
    );
}

export default Inicio;