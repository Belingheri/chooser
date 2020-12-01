import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl, Button, Alert, Badge } from "react-bootstrap";

import Elemento from "./../model/Elemento";
import AttributoValore from "./../model/AttributoValore";

function ElementoR({ elemento, onChange }) {
  const [internalElemento, setInternalElemento] = useState(
    elemento.toSimpleObj()
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setInternalElemento(elemento.toSimpleObj());
  }, [elemento, elemento.attributi.length]);

  const handleChange = (attributoValore, valore) => {
    const attInternalElemento = { ...internalElemento };
    const idx = attInternalElemento.attributi.findIndex(
      (e) => e.nome === attributoValore.nome
    );
    attInternalElemento.attributi[idx].valore = valore;
    setInternalElemento(attInternalElemento);
    const attErrors = { ...errors };
    try {
      const valoreToSave = parseInt(valore);
      AttributoValore.validateValore(valoreToSave);
      onChange(elemento, attributoValore, valoreToSave);
      delete attErrors[attributoValore.nome];
    } catch (error) {
      attErrors[attributoValore.nome] = error.message;
    }
    setErrors(attErrors);
  };

  const handleSave = (attributoValore) => {
    const attErrors = { ...errors };
    try {
      const idx = internalElemento.attributi.findIndex(
        (e) => e.nome === attributoValore.nome
      );
      const valore = parseInt(internalElemento.attributi[idx].valore);
      AttributoValore.validateValore(valore);
      onChange(elemento, attributoValore, valore);
      delete attErrors[attributoValore.nome];
    } catch (error) {
      attErrors[attributoValore.nome] = error.message;
      const attInternalElemento = { ...internalElemento };
      const idx = internalElemento.attributi.findIndex(
        (e) => e.nome === attributoValore.nome
      );
      attInternalElemento.attributi[idx].valore = elemento.getAttributo(
        attInternalElemento.attributi[idx].nome
      ).valore;
      setInternalElemento(attInternalElemento);
    }
    setErrors(attErrors);
  };

  return (
    <div>
      <h2>
        {internalElemento.descrizione}{" "}
        <Badge variant="secondary">
          {Math.round(elemento.valore * 100) / 100}
        </Badge>{" "}
      </h2>
      {internalElemento.attributi.map((att) => {
        return (
          <div key={att.nome}>
            <InputGroup className="mb-3" key={att.nome}>
              <InputGroup.Prepend>
                <InputGroup.Text
                  id={`${internalElemento.descrizione}_${att.nome}`}
                >
                  {att.nome}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="number"
                value={att.valore}
                onChange={({ currentTarget: t }) => {
                  handleChange(att, t.value);
                }}
                onBlur={() => handleSave(att)}
                aria-describedby={`${internalElemento.descrizione}_${att.nome}`}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleChange(att, att.valore - 1)}
                  disabled={att.valore === AttributoValore.pesoMinimo}
                >
                  <i className="fas fa-minus"></i>
                </Button>

                <Button
                  variant="outline-info"
                  onClick={() => handleChange(att, att.valore + 1)}
                  disabled={att.valore === AttributoValore.pesoMassimo}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {errors[att.nome] && (
              <Alert variant="danger">{errors[att.nome]}</Alert>
            )}
          </div>
        );
      })}
    </div>
  );
}

ElementoR.propTypes = {
  elemento: PropTypes.instanceOf(Elemento).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ElementoR;
