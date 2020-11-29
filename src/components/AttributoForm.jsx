import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <form onSubmit={handleCreaAttributo}>
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        placeholder="Nome Attributo"
        value={attributoForm.nome}
        onChange={changeFormAttributo}
      />
      <br />
      <label htmlFor="peso">Peso:</label>
      <input
        type="number"
        id="peso"
        name="peso"
        value={attributoForm.peso}
        onChange={changeFormAttributo}
      />
      <br />
      <button type="submit">aggiungi</button>
      {attributoForm.error && <span>{attributoForm.error}</span>}
    </form>
  );
}

AttributoForm.propTypes = {
  attributi: PropTypes.arrayOf(PropTypes.instanceOf(Attributo)).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AttributoForm;
