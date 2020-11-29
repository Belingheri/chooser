import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl, Button, Alert, Badge } from "react-bootstrap";

import Elemento from "./../model/Elemento";
import AttributoValore from "./../model/AttributoValore";

function ElementoR({ elemento, onChange }) {
  const [errors, setErrors] = useState({});
  const handleChange = (attributoValore, valore) => {
    const attErrors = { ...errors };
    try {
      AttributoValore.validateValore(valore);
      onChange(elemento, attributoValore, valore);
      delete attErrors[attributoValore.nome];
    } catch (error) {
      attErrors[attributoValore.nome] = error.message;
    }
    setErrors(attErrors);
  };

  return (
    <div>
      <h2>
        {elemento.descrizione}{" "}
        <Badge variant="secondary">
          {Math.round(elemento.valore * 100) / 100}
        </Badge>{" "}
      </h2>
      {elemento.attributi.map((att) => {
        return (
          <div key={att.nome}>
            <InputGroup className="mb-3" key={att.nome}>
              <InputGroup.Prepend>
                <InputGroup.Text id={`${elemento.descrizione}_${att.nome}`}>
                  {att.nome}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="number"
                value={att.valore}
                onChange={({ currentTarget: t }) => {
                  handleChange(att, t.valueAsNumber);
                }}
                aria-describedby={`${elemento.descrizione}_${att.nome}`}
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
