import { useState } from "react";

import Attributo from "./model/Attributo";
import AttributoValore from "./model/AttributoValore";
import Elemento from "./model/Elemento";

const defaultAttributi = [];

const attrConsumo = new Attributo("consumo", 7);
defaultAttributi.push(attrConsumo);
const attrPotenza = new Attributo("potenza", 3);
defaultAttributi.push(attrPotenza);

const defaultElementi = [];

let elemento = new Elemento(
  "panda",
  AttributoValore.creaAttributoValore(attrConsumo, 9),
  AttributoValore.creaAttributoValore(attrPotenza, 1)
);
defaultElementi.push(elemento);

elemento = new Elemento(
  "ferrari",
  AttributoValore.creaAttributoValore(attrConsumo, 1),
  AttributoValore.creaAttributoValore(attrPotenza, 10)
);
defaultElementi.push(elemento);

elemento = new Elemento(
  "fiesta",
  AttributoValore.creaAttributoValore(attrConsumo, 8),
  AttributoValore.creaAttributoValore(attrPotenza, 6)
);
defaultElementi.push(elemento);

function App() {
  const [attributi, setAttributi] = useState(defaultAttributi);
  const [elementi, setElementi] = useState(defaultElementi);
  const [attributiErrors, setAttributiErrors] = useState({});
  const [attributoForm, setAttributoForm] = useState({
    nome: "",
    peso: Attributo.pesoMinimo,
  });
  const [elementiErrors, setElementiErrors] = useState({});

  const handleChangeAttributoValue = (attributo, valore) => {
    try {
      const attualiAttributi = [...attributi];
      const idx = attualiAttributi.findIndex(
        (attr) => attr.nome === attributo.nome
      );
      attualiAttributi[idx].peso = valore;
      const attualiElementi = [...elementi];
      attualiElementi.forEach((elemento) => {
        const idx = elemento.attributi.findIndex(
          (el) => el.nome === attributo.nome
        );
        elemento.attributi[idx].peso = valore;
      });
      setElementi(attualiElementi);
      setAttributi(attualiAttributi);
      resetAttributoError(attributo.nome);
    } catch (error) {
      const actualErrors = { ...attributiErrors };
      actualErrors[attributo.nome] = error.message;
      setAttributiErrors(actualErrors);
    }
  };
  const resetAttributoError = (nomeAttributo) => {
    const actualErrors = { ...attributiErrors };
    delete actualErrors[nomeAttributo];
    setAttributiErrors(actualErrors);
  };

  const handleDeleteAttributo = (nomeAttributo) => {
    try {
      const attAttributi = [...attributi],
        attElementi = [...elementi];
      const idx = attAttributi.findIndex((a) => a.nome === nomeAttributo);
      if (idx < 1) throw new Error(`Attributo ${nomeAttributo} non presente`);
      attAttributi.splice(idx, 1);

      attElementi.forEach((e) => {
        e.removeAttributo(nomeAttributo);
      });

      setAttributi(attAttributi);
      setElementi(attElementi);
    } catch (error) {
      console.log(error);
    }
  };

  const resetElementiError = (nomeElemento, nomeAttributo) => {
    const actualErrors = { ...elementiErrors };
    if (!actualErrors[nomeElemento]) return;
    delete actualErrors[nomeElemento][nomeAttributo];
    setElementiErrors(actualErrors);
  };

  const handleChangeElementoValue = (elemento, attributoValore, valore) => {
    try {
      const attualiElementi = [...elementi];
      const idx = attualiElementi.findIndex(
        (el) => el.descrizione === elemento.descrizione
      );

      attualiElementi[idx].changeValueAttributo(attributoValore.nome, valore);

      setElementi(attualiElementi);
      resetElementiError(elemento.descrizione, attributoValore.nome);
    } catch (error) {
      const actualErrors = { ...elementiErrors };
      if (!actualErrors[elemento.descrizione])
        actualErrors[elemento.descrizione] = {};
      actualErrors[elemento.descrizione][attributoValore.nome] = error.message;
      setElementiErrors(actualErrors);
    }
  };

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
      const attAttributi = [...attributi];

      const attEx = attAttributi.find((a) => a.nome === attr.nome);
      if (attEx) throw new Error(`Attributo ${attEx.nome} gia essistente`);

      attAttributi.push(attr);

      const attElementi = [...elementi];

      attElementi.forEach((el) => {
        el.addAttributo(attr);
      });

      setAttributi(attAttributi);
      setElementi(attElementi);
      setAttributoForm({ nome: "", peso: Attributo.pesoMinimo });
    } catch (error) {
      attributo.error = error.message;
      setAttributoForm(attributo);
    }
  };
  const elementiOrdinati = elementi.sort((a, b) => b.valore - a.valore);
  const attributiOrdinati = attributi.sort((a, b) => b.peso - a.peso);

  return (
    <div className="App">
      <h2>Attributi</h2>
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
                    handleChangeAttributoValue(attributo, t.valueAsNumber);
                  }}
                  onBlur={() => resetAttributoError(attributo.nome)}
                />
              </span>
              <button onClick={() => handleDeleteAttributo(attributo.nome)}>
                rimuovi
              </button>
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
      <h3>Oggetti</h3>
      <ol>
        {elementiOrdinati.map((elemento) => {
          return (
            <li key={elemento.descrizione}>
              {elemento.descrizione} -
              <span>
                <b> {elemento.valore}</b>
              </span>
              <ol key={elemento.descrizione + "_ol"}>
                {elemento.attributi.map((attributoValore) => {
                  return (
                    <li key={`${elemento.descrizione}_${attributoValore.nome}`}>
                      {attributoValore.nome} -{" "}
                      <span>
                        <input
                          type="number"
                          value={attributoValore.valore}
                          onChange={({ currentTarget: t }) => {
                            handleChangeElementoValue(
                              elemento,
                              attributoValore,
                              t.valueAsNumber
                            );
                          }}
                          onBlur={() =>
                            resetElementiError(
                              elemento.descrizione,
                              attributoValore.nome
                            )
                          }
                        />
                      </span>
                      {elementiErrors &&
                        elementiErrors[elemento.descrizione] &&
                        elementiErrors[elemento.descrizione][
                          attributoValore.nome
                        ] && (
                          <span>
                            {
                              elementiErrors[elemento.descrizione][
                                attributoValore.nome
                              ]
                            }
                          </span>
                        )}
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default App;
