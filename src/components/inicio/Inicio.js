import React, { useEffect, useState } from "react";
import './inicio.scss'
import persona from '../../styles/img/undraw_cooking_lyxy.svg';
// Importing react bootstrap components
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
// Importing mui component
import RecipeReviewCard from "./RecipeReviewCard";
import { Skeleton } from "@mui/material";
import { Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
                <h5>Categoría: {info['strCategory']}</h5>
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

    const [randomRecipe, setRandomRecipe] = useState(null);
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [category, setCategory] = useState(null);
    // const [staredRecipes, setStaredRecipes] = useState(null);
    // const [loading, setLoading] = useState(true);
    const selectCategory = async (cat) => {
        await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + cat)
            .then(res => res.json())
            .then(data => {
                console.log("cat seleccionada" + cat);
                console.log(data.meals);
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
                        Las mejores recetas de cocina
                    </h2>
                    <p >
                        ¿No sabes qué cocinar? Decenas de exquisitas recetas te esperan a tan solo una búsqueda
                    </p>
                    <Form className="searcher-form">
                        <Form.Control className="searcher-form-searcher" type="text" placeholder="Nombre de la receta" />

                        <Button className="searcher-form-button" variant="outline-warning" type="submit">
                            Buscar receta
                        </Button>
                    </Form>
                </div>
                <div className="searcher-image">
                    <img src={persona} style={{ width: "60%" }} />
                </div>
            </div>

            {/* section of daily/random recipe */}
            <div className="daily-recipe">
                <h2 >
                    ¡Obtén una receta aleatoria!
                </h2>
                <p>
                    ¡Cualquiera que obtengas, será deliciosa!
                </p>
                {/* <CardRecipe info={randomRecipe} /> */}
                <RecipeReviewCard info={randomRecipe}></RecipeReviewCard>
            </div>
            {/* section of categories */}

            {selectedCategory ?
                <div className="selected-category" id="grid-selected-category">
                    <h2>Mostrando por categoría {category}</h2>
                    <Button variant="warning" onClick={() => {
                        setSelectedCategory(null);
                    }}>Limpiar</Button>{' '}

                    <div className="grid-selected-category" >
                        {selectedCategory.map((recipeCat, index) =>
                            <RecipeReviewCard key={index} info={recipeCat} fromCategory={true} />
                        )}
                    </div>
                </div> :
                <>
                    <h2>Nuestras categorías</h2>
                    <div className="categories">

                        <GridCategories categories={categories} selectCategory={(selectedCategory) => selectCategory(selectedCategory)} />
                    </div></>
            }

        </div>
    );
}

export default Inicio;