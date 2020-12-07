import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

import AttributoValore from "./../model/AttributoValore";

function AttributoElemento({ attributo, onChange }) {
  const [internalAttributo, setInternalAttributo] = useState(attributo);
  const [error, setError] = useState("");

  const handleChange = (valore) => {
    const attAttributo = { ...internalAttributo };
    attAttributo.valore = valore && parseInt(valore);
    setInternalAttributo(attAttributo);
    let attError = "";
    try {
      const valoreToSave = parseInt(valore);
      AttributoValore.validateValore(valoreToSave);
    } catch (error) {
      attError = error.message;
    }
    setError(attError);
  };

  const handleSave = (attributoValore) => {
    console.log(attributoValore);

    let attError = "";
    try {
      const valore = attributoValore.valore;
      onChange(attributoValore, valore);
    } catch (error) {
      attError = error.message;
      const attAttributo = { ...attributoValore };
      attAttributo.valore = AttributoValore.pesoMinimo;
      setInternalAttributo(attAttributo);
    }
    setError(attError);
  };

  useEffect(() => {
    const attAttributo = {};
    attAttributo.nome = attributo.nome;
    attAttributo.peso = attributo.peso;
    attAttributo.valore = attributo.valore;
    setInternalAttributo(attAttributo);
  }, [attributo.nome, attributo.valore, attributo.peso]);

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>{internalAttributo.nome}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          value={internalAttributo.valore}
          onChange={({ currentTarget: t }) => {
            handleChange(t.value);
          }}
          onBlur={() => handleSave(internalAttributo)}
          aria-describedby={`${internalAttributo.descrizione}_${internalAttributo.nome}`}
        />
      </InputGroup>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
}

AttributoElemento.propTypes = {
  attributo: PropTypes.instanceOf(AttributoValore).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AttributoElemento;
