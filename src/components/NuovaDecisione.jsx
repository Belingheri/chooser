import { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { InputGroup, FormControl, Button, Alert, Form } from "react-bootstrap";
import * as DecisioniService from "../service/Decisioni";

function NuovaDecisone({ onAdd }) {
  const [nomeDecisione, setNomeDecisione] = useState("");
  const [errore, setErrore] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      DecisioniService.addDecisione(nomeDecisione);
      setErrore("");
      setNomeDecisione("");
      onAdd(nomeDecisione);
      history.push("/attuale");
    } catch (error) {
      setErrore(error.message);
    }
  };

  const handleChangeDecisione = ({ currentTarget: t }) => {
    setNomeDecisione(t.value);
    try {
      DecisioniService.validateNomeDecisione(t.value);
      setErrore("");
    } catch (error) {
      setErrore(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3 my-2">
        <FormControl
          placeholder="Nome Decisione"
          aria-label="Nome Decisione"
          aria-describedby="basic-addon2"
          value={nomeDecisione}
          onChange={handleChangeDecisione}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit">
            Aggiungi
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {errore && <Alert variant="danger">{errore}</Alert>}
    </Form>
  );
}

NuovaDecisone.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NuovaDecisone;
