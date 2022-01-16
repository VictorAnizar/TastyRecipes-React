import React, { useEffect, useState } from "react";
import './inicio.scss'
import persona from '../../styles/img/undraw_cooking_lyxy.svg';
// Importing react bootstrap components
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";




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

const GridCategories = ({categories}) => {
    if(categories==null){
        return null;
    }
    else return (
        <>
            {categories.map((category, index)=>
                <CardCategory info={category} key={index}/>
            )}
        </>
    )
}

const CardCategory = ({info}) => {
    return (
        <div className="card-category">
            <div className="card-category-image-container">
                <img src={info.strCategoryThumb}  style={{ width: "100%" }}/>
            </div>
            <div className="card-category-short-info">
                <h5>{info.strCategory}</h5>
            </div>
        </div>
    )
}


const Inicio = () => {
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [categories, setCategories] = useState(null);
    const [staredRecipes, setStaredCategories] = useState(null);
    // const [loading, setLoading] = useState(true);

    const getRandomRecipe = async () => {
        await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(data => {
                console.log(data.meals[0]);
                setRandomRecipe(data.meals[0]);
                // setLoading(false);
            });
    }

    const getCategories = async () =>{
        await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
            console.log(data.categories);
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
                <CardRecipe info={randomRecipe} />
            </div>
            {/* section of categories */}
            <h2>Nuestras categorías</h2>
            <div className="categories">

                <GridCategories categories={categories}/>
            </div>
        </div>
    );
}

export default Inicio;