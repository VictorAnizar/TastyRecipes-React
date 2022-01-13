import React from "react";
import './inicio.scss'
import persona from '../../styles/img/undraw_cooking_lyxy.svg';
// Importing react bootstrap components
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const Inicio = () => {
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
            </div>
        </div>
    );
}

export default Inicio;