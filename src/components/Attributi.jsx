import React, { useState } from "react";
import PropTypes from "prop-types";

import Attributo from "./../model/Attributo";

function Attributi({
  attributi,
  onAdd,
  onRemove,
  onChange,
  attributiErrors,
  onFocusOut,
}) {
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

  const attributiOrdinati = attributi.sort((a, b) => b.peso - a.peso);
  return (
    <div>
      <ol>
        {attributiOrdinati.map((attributo) => (
          <li key={attributo.nome}>
            {attributo.nome}{" "}
            <span>
              <input
                type="number"
                value={attributo.peso}
                onChange={({ currentTarget: t }) => {
                  onChange(attributo, t.valueAsNumber);
                }}
                onBlur={() => onFocusOut(attributo.nome)}
              />
            </span>
            {attributi.length > 1 && (
              <button onClick={() => onRemove(attributo.nome)}>rimuovi</button>
            )}
            {attributiErrors[attributo.nome] && (
              <span>{attributiErrors[attributo.nome]}</span>
            )}
          </li>
        ))}
      </ol>
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
    </div>
  );
}

Attributi.propTypes = {
  attributi: PropTypes.arrayOf(PropTypes.instanceOf(Attributo)).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
  attributiErrors: PropTypes.object.isRequired,
};

export default Attributi;
