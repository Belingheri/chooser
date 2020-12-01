import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl, Button, Alert } from "react-bootstrap";

import Attributo from "../model/Attributo";

function AttributoR({ attributo, onChange, onRemove, canRemove }) {
  const [internalAttributo, setInternalAttributo] = useState(
    attributo.toSimpleObj()
  );
  const [error, setError] = useState("");

  const handleChangeValue = ({ currentTarget: t }) => {
    const attIternalAttributo = { ...internalAttributo };
    attIternalAttributo.peso = t.value;
    setInternalAttributo(attIternalAttributo);
    try {
      const peso = parseInt(t.value);
      Attributo.validatePeso(peso);
      onChange(attributo, peso);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSaveValue = () => {
    try {
      const peso = parseInt(internalAttributo.peso);
      Attributo.validatePeso(peso);
      onChange(attributo, peso);
      setError("");
    } catch (error) {
      const attIternalAttributo = { ...internalAttributo };
      attIternalAttributo.peso = attributo.peso;
      setInternalAttributo(attIternalAttributo);
      setError(error.message);
    }
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>{internalAttributo.nome}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          value={internalAttributo.peso}
          onChange={handleChangeValue}
          onBlur={handleSaveValue}
        />
        {canRemove && (
          <InputGroup.Append>
            <Button
              onClick={() => onRemove(internalAttributo.nome)}
              variant="outline-danger"
            >
              <i className="far fa-trash-alt"></i>
            </Button>
          </InputGroup.Append>
        )}
      </InputGroup>

      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
}

AttributoR.propTypes = {
  attributo: PropTypes.instanceOf(Attributo).isRequired,
  onChange: PropTypes.func.isRequired,
  canRemove: PropTypes.bool.isRequired,
  onRemove: PropTypes.func,
};

AttributoR.defaultProps = {
  canRemove: true,
};
export default AttributoR;
