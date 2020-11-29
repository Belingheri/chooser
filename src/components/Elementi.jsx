import React, { useState } from "react";
import PropTypes from "prop-types";

import ElementoR from "./ElementoR";

import Elemento from "../model/Elemento";

function Elementi({
  elementi,
  onAdd,
  onRemove,
  onChange,
  elementiErrors,
  onFocusOut,
}) {
  const elementiOrdinati = elementi.sort((a, b) => b.valore - a.valore);
  return (
    <div>
      <h1>Oggetti</h1>
      <ol>
        {elementiOrdinati.map((elemento) => {
          return (
            <ElementoR
              key={elemento.descrizione}
              elemento={elemento}
              onChange={onChange}
            />
          );
        })}
      </ol>
    </div>
  );
}

Elementi.propTypes = {
  elementi: PropTypes.arrayOf(PropTypes.instanceOf(Elemento)).isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
  elementiErrors: PropTypes.object,
};

export default Elementi;
