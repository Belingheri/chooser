import { useState } from "react";

import Attributi from "./components/Attributi";

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
  const [attributiErrors, setAttributiErrors] = useState({});
  const [elementi, setElementi] = useState(defaultElementi);
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
      if (idx < 0) throw new Error(`Attributo ${nomeAttributo} non presente`);
      attAttributi.splice(idx, 1);

      attElementi.forEach((e) => {
        e.removeAttributo(nomeAttributo);
      });

      setAttributi(attAttributi);
      setElementi(attElementi);
    } catch (error) {
      console.log(error);
      alert(error.message);
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

  const handleCreaAttributo = (attributoToAdd) => {
    try {
      const attAttributi = [...attributi];
      // controllo sotto gia
      // const attEx = attAttributi.find((a) => a.nome === attributoToAdd.nome);
      // if (attEx) throw new Error(`Attributo ${attEx.nome} gia essistente`);
      attAttributi.push(attributoToAdd);
      const attElementi = [...elementi];
      attElementi.forEach((el) => {
        el.addAttributo(attributoToAdd);
      });
      setAttributi(attAttributi);
      setElementi(attElementi);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  const elementiOrdinati = elementi.sort((a, b) => b.valore - a.valore);

  return (
    <div className="App">
      <h2>Attributi</h2>
      <div>
        <Attributi
          attributi={attributi}
          onAdd={handleCreaAttributo}
          onChange={handleChangeAttributoValue}
          onRemove={handleDeleteAttributo}
          onFocusOut={resetAttributoError}
          attributiErrors={attributiErrors}
        />
      </div>
      <h3>Oggetti</h3>
      <div>
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
                      <li
                        key={`${elemento.descrizione}_${attributoValore.nome}`}
                      >
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
    </div>
  );
}

export default App;
