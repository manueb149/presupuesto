import React, { Fragment, useState, useEffect } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  // State para presupuesto
  const [presupuesto, savePresupuesto] = useState(0);
  // State para saldo restante
  const [restante, saveRestante] = useState(0);
  // State para monstar o quitar el formulario Pregunta
  const [pregunta, showPregunta] = useState(true);
  // State para guardar gastos
  const [gastos, saveGastos] = useState([]);
  const [set_gasto, saveSetGasto] = useState({});
  const [creargasto, setCrearGasto] = useState(false);

  // useEffect para actualizar el restante
  useEffect( () => {

    // Agregar gasto
    if(creargasto){
      saveGastos([
        ...gastos,
        set_gasto
      ]);

      // Resta del presupuesto actual
      const presupuestoRestante = restante - set_gasto.gasto;
      saveRestante(presupuestoRestante);
    }
    setCrearGasto(false);

  }, [set_gasto, gastos, restante, creargasto]);

  return (
    <Fragment>
      <div className="container">
        <header>
          <h1>Gasto Semanal</h1>

          <div className="contenido-principal conetido">
            {pregunta
              ? 
                (
                  <Pregunta
                  savePresupuesto={savePresupuesto}
                  saveRestante={saveRestante}
                  showPregunta={showPregunta}
                  />
                )
              :
                (
                  <div className="row">
                    <div className="one-half column">
                      <Formulario
                        saveSetGasto={saveSetGasto}
                        setCrearGasto={setCrearGasto}
                      />
                    </div>
                    <div className="one-half column">
                      <Listado
                        gastos={gastos}
                      />

                      <ControlPresupuesto
                        presupuesto={presupuesto}
                        restante={restante}
                        gastos={gastos}
                      />
                    </div>
                  </div>
                )
            }
          </div>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
