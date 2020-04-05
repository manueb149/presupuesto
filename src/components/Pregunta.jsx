import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Pregunta = ({ savePresupuesto, saveRestante, showPregunta }) => {
  // State de cantidad
  const [cantidad, saveCantidad] = useState(0);
  // State de arror
  const [error, saveError] = useState(false);

  // Obtener valor del presupuesto
  const getBudget = (e) => {
    saveCantidad(parseInt(e.target.value, 10));
  };

  // Enviar valor del presupuesto
  const setBudget = (e) => {
    e.preventDefault();

    // Validar cantidad
    if (cantidad < 1 || isNaN(cantidad)) {
      saveError(true);
      return;
    }
    saveError(false);

    //Guardar valores
    savePresupuesto(cantidad);
    saveRestante(cantidad);
    showPregunta(false);
  };

  return (
    <Fragment>
      <h2>Coloca tu presupuesto</h2>

      {error ? <Error mensaje="El presupuesto es incorrecto" /> : null}

      <form onSubmit={setBudget}>
        <input
          type="number"
          className="u-full-width"
          placeholder="Coloca tu presupuesto"
          pattern="[0–9]*"
          onChange={getBudget}
        />
        <input
          type="submit"
          className="button-primary u-full-width"
          value="Definir Presupuesto"
        />
      </form>
    </Fragment>
  );
};

Pregunta.propTypes = {
  savePresupuesto: PropTypes.number.isRequired,
  saveRestante: PropTypes.number.isRequired,
  showPregunta: PropTypes.bool.isRequired
}

export default Pregunta;
