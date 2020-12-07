import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

import Attributo from "./../model/Attributo";
import Elemento from "./../model/Elemento";
import AttributoElemento from "./AttributoElemento";
import AttributoValore from "../model/AttributoValore";

function ElementoForm({ attributi, onAdd }) {
  const [elemento, setElemento] = useState({ descrizione: "", attributi: [] });
  const [errorDescrizione, setErrorDescrizione] = useState("");
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    const attElemento = {};
    if (!attElemento.descrizione) attElemento.descrizione = "";
    const attAttributi = [...attributi];
    attElemento.attributi = attAttributi.map((a) =>
      AttributoValore.creaAttributoValore(a)
    );
    setElemento(attElemento);
  }, [attributi.length, attributi]);

  const handleChangeDescrizione = ({ currentTarget: t }) => {
    const attElemento = { ...elemento };
    attElemento.descrizione = t.value;
    setElemento(attElemento);
    try {
      Elemento.validateDescrizione(t.value);
      setErrorDescrizione("");
    } catch (error) {
      setErrorDescrizione(error.message);
    }
  };

  const handleChangeAttributo = (attributo, valore) => {
    const attElemento = { ...elemento };
    const idx = attElemento.attributi.findIndex(
      (e) => e.nome === attributo.nome
    );
    attElemento.attributi[idx].valore = valore;
    setElemento(attElemento);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let attErrorForm = "";
    try {
      onAdd(elemento.descrizione, elemento.attributi);
      const attElemento = { ...elemento };
      attElemento.descrizione = "";
      setElemento(attElemento);
    } catch (error) {
      attErrorForm = error.message;
    }
    setErrorForm(attErrorForm);
  };

  return (
    <div>
      <h2>Nuovo Oggetto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formPlaintextNomeOggetto">
          <Form.Label column sm="2">
            Nome
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Oggetto..."
              type="text"
              value={elemento.descrizione}
              onChange={handleChangeDescrizione}
              name="descrizione"
            />
          </Col>
          {errorDescrizione && (
            <Alert variant="danger">{errorDescrizione}</Alert>
          )}
        </Form.Group>
        {elemento.attributi.map((attributo) => {
          return (
            <AttributoElemento
              key={attributo.nome}
              attributo={attributo}
              onChange={handleChangeAttributo}
            />
          );
        })}

        {errorForm && <Alert variant="danger">{errorForm}</Alert>}
        <Button variant="info" type="submit">
          Crea<i className="mx-2 fas fa-clipboard-check"></i>
        </Button>
      </Form>
    </div>
  );
}

ElementoForm.propTypes = {
  attributi: PropTypes.arrayOf(PropTypes.instanceOf(Attributo)).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ElementoForm;
