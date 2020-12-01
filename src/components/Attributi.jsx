import React from "react";
import PropTypes from "prop-types";

import Attributo from "./../model/Attributo";
import AttributoR from "./AttributoR";
import AttributoForm from "./AttributoForm";

function Attributi({ attributi, onAdd, onRemove, onChange }) {
  const attributiOrdinati = attributi.sort((a, b) => b.peso - a.peso);
  return (
    <div>
      <h1>Attributi</h1>
      {attributiOrdinati.map((attributo) => (
        <AttributoR
          key={attributo.nome}
          attributo={attributo}
          onChange={onChange}
          onRemove={onRemove}
          canRemove={attributi.length > 1}
        />
      ))}

      <AttributoForm attributi={attributi} onAdd={onAdd} />
    </div>
  );
}

Attributi.propTypes = {
  attributi: PropTypes.arrayOf(PropTypes.instanceOf(Attributo)).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Attributi;
