import React from "react";
import PropTypes from "prop-types";

import ElementoR from "./ElementoR";

import Elemento from "../model/Elemento";
import { Button } from "react-bootstrap";

function Elementi({ elementi, onChange, onSaveDecisione }) {
  const elementiOrdinati = elementi.sort((a, b) => b.valore - a.valore);
  return (
    <div>
      <h1>
        Oggetti{" "}
        <Button variant="success" className="mx-4" onClick={onSaveDecisione}>
          Salva Selezione
        </Button>
      </h1>
      {elementiOrdinati.map((elemento) => {
        return (
          <ElementoR
            key={elemento.descrizione}
            elemento={elemento}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
}

Elementi.propTypes = {
  elementi: PropTypes.arrayOf(PropTypes.instanceOf(Elemento)).isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
  onSaveDecisione: PropTypes.func.isRequired,
  elementiErrors: PropTypes.object,
};

export default Elementi;
