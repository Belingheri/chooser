import { useState } from "react";
import { InputGroup, FormControl, Button, Alert, Form } from "react-bootstrap";
import * as DecisioniService from "../service/Decisioni";

function NuovaDecisone() {
  const [nomeDecisione, setNomeDecisione] = useState("");
  const [errore, setErrore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      DecisioniService.addDecisione(nomeDecisione);
      setErrore("");
      setNomeDecisione("");
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

export default NuovaDecisone;
