import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Col, Button, Alert } from "react-bootstrap";

import Attributo from "./../model/Attributo";

function AttributoForm({ attributi, onAdd }) {
  const [attributoForm, setAttributoForm] = useState({
    nome: "",
    peso: Attributo.pesoMinimo,
  });
  const changeFormAttributo = ({ currentTarget: t }) => {
    const attributo = { ...attributoForm };
    attributo[t.name] = t.name === "nome" ? t.value : t.valueAsNumber;
    setAttributoForm(attributo);
  };

  const handleCreaAttributo = (e) => {
    e.preventDefault();
    const attributo = { ...attributoForm };
    try {
      const attr = new Attributo(attributoForm.nome, attributoForm.peso);
      const giaPresente = attributi.find((e) => e.nome === attr.nome);
      if (giaPresente) throw new Error(`Attributo ${attr.nome} gia presente`);
      onAdd(attr);
      setAttributoForm({ nome: "", peso: Attributo.pesoMinimo });
    } catch (error) {
      attributo.error = error.message;
      setAttributoForm(attributo);
    }
  };

  return (
    <Form onSubmit={handleCreaAttributo} className="my-4">
      <Form.Row>
        <Form.Group as={Col} controlId="nomeAttributo">
          <Form.Label>Attributo</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            placeholder="Nome attributo"
            value={attributoForm.nome}
            onChange={changeFormAttributo}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="pesoAttributo">
          <Form.Label>Peso</Form.Label>
          <Form.Control
            type="number"
            name="peso"
            value={attributoForm.peso}
            onChange={changeFormAttributo}
          />
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        Aggiungi
      </Button>
      {attributoForm.error && (
        <Alert variant="danger">{attributoForm.error}</Alert>
      )}
    </Form>
  );
}

AttributoForm.propTypes = {
  attributi: PropTypes.arrayOf(PropTypes.instanceOf(Attributo)).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AttributoForm;
