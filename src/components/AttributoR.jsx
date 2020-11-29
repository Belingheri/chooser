import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";

import Attributo from "../model/Attributo";

function AttributoR({ attributo, onChange, onRemove, canRemove }) {
  const [error, setError] = useState("");

  const handleChangeValue = ({ currentTarget: t }) => {
    try {
      Attributo.validatePeso(t.valueAsNumber);
      onChange(attributo, t.valueAsNumber);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ListGroup.Item key={attributo.nome}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>{attributo.nome}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          value={attributo.peso}
          onChange={handleChangeValue}
          onBlur={() => setError("")}
        />
        {canRemove && (
          <InputGroup.Append>
            <Button
              onClick={() => onRemove(attributo.nome)}
              variant="outline-danger"
            >
              <i className="far fa-trash-alt"></i>
            </Button>
          </InputGroup.Append>
        )}
      </InputGroup>

      {error && <Alert variant="warning">{error}</Alert>}
    </ListGroup.Item>
  );
}

AttributoR.propTypes = {
  attributo: PropTypes.instanceOf(Attributo).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool.isRequired,
};

AttributoR.defaultProp = {
  canRemove: true,
};
export default AttributoR;
