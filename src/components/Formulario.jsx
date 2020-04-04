import React from "react";
import { useState } from "react";
import Error from "./Error";
import shortId from "shortid";

const Formulario = ({ saveSetGasto, setCrearGasto }) => {
  // State para nombre y gasto
  const [nombre, saveNombre] = useState("");
  const [gasto, saveGasto] = useState(0);

  // State para Error
  const [error, setError] = useState(false);

  //Agregar un gasto
  const agregarGasto = (e) => {
    e.preventDefault();
    if (gasto < 1 || isNaN(gasto) || nombre.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    const set_gasto = {
      id: shortId.generate(),
      nombre,
      gasto,
    };

    saveSetGasto(set_gasto);

    setCrearGasto(true);

    saveNombre("");
    saveGasto(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos aqui</h2>

      {error ? (
        <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" />
      ) : null}

      <div className="campo">
        <label>Nombre gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej: Comida"
          value={nombre}
          onChange={(e) => saveNombre(e.target.value.trim())}
        />
      </div>
      <div className="campo">
        <label>Cantidad gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej: 100"
          pattern="[0-9]*"
          onChange={(e) => saveGasto(parseInt(e.target.value, 10))}
          value={gasto ? gasto :''}
        />
      </div>
      <input
        type="submit"
        className="button-primary button u-full-width"
        value="Agregar gasto"
      />
    </form>
  );
};

export default Formulario;
