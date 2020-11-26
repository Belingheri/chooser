import { useState } from "react";
import Attributo from "./model/Attributo";

const defaultAttributi = [];

const a = new Attributo("consumo", 7);
const b = new Attributo("potenza", 3);

defaultAttributi.push(a);
defaultAttributi.push(b);

//   { nome: "consumo", valore: 7 },
//   { nome: "potenza", valore: 3 },
// ];

const defaultElementi = [
  {
    descrizione: "panda",
    attributi: {
      consumo: 9,
      potenza: 1,
    },
  },
  {
    descrizione: "ferrari",
    attributi: {
      consumo: 1,
      potenza: 10,
    },
  },
  {
    descrizione: "fiesta",
    attributi: {
      consumo: 8,
      potenza: 6,
    },
  },
];

function App() {
  const [attributi, setAttributi] = useState(defaultAttributi);
  const [elementi, setElementi] = useState(defaultElementi);
  const [attributiErrors, setAttributiErrors] = useState({});

  const getValore = (oggetto, attributi) => {
    let dividendo = 0,
      divisore = 0;
    Object.keys(oggetto.attributi).forEach((nomeAttributo) => {
      const attributo = attributi.find((attr) => attr.nome === nomeAttributo);
      dividendo += oggetto.attributi[nomeAttributo] * attributo.peso;
      divisore += attributo.peso;
    });
    return dividendo / divisore;
  };

  const handleChangeAttributoValue = (attributo, valore) => {
    try {
      const attualiAttributi = [...attributi];
      const idx = attualiAttributi.findIndex(
        (attr) => attr.nome === attributo.nome
      );
      attualiAttributi[idx].peso = valore;
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

  const handleChangeElementoValue = (elemento, nomeAttributo, valore) => {
    const attualiElementi = [...elementi];
    const idx = attualiElementi.findIndex((el) => el === elemento);
    const attualiAttributi = { ...attualiElementi[idx].attributi };
    attualiAttributi[nomeAttributo] = valore;
    attualiElementi[idx].attributi = attualiAttributi;
    setElementi(attualiElementi);
  };

  return (
    <div className="App">
      <h2>Attributi</h2>
      <ol>
        {attributi.map((attributo) => (
          <li key={attributo.nome}>
            {attributo.nome}{" "}
            <span>
              <input
                type="number"
                min="1"
                value={attributo.peso}
                onChange={({ currentTarget: t }) => {
                  handleChangeAttributoValue(attributo, t.valueAsNumber);
                }}
                onBlur={() => resetAttributoError(attributo.nome)}
              />
            </span>
            {attributiErrors[attributo.nome] && (
              <span>{attributiErrors[attributo.nome]}</span>
            )}
          </li>
        ))}
      </ol>
      <h3>Oggetti</h3>
      <ol>
        {elementi.map((elemento) => {
          return (
            <li key={elemento.descrizione}>
              {elemento.descrizione} -
              <span>
                <b> {getValore(elemento, attributi)}</b>
              </span>
              <ol key={elemento.descrizione + "_ol"}>
                {Object.keys(elemento.attributi).map((nomeChiave) => {
                  return (
                    <li key={elemento.descrizione + nomeChiave}>
                      {nomeChiave} -{" "}
                      <span>
                        <input
                          type="number"
                          min="1"
                          value={elemento.attributi[nomeChiave]}
                          onChange={({ currentTarget: t }) => {
                            if (!t.valueAsNumber || t.valueAsNumber < 1) return;
                            handleChangeElementoValue(
                              elemento,
                              nomeChiave,
                              t.valueAsNumber
                            );
                          }}
                        />
                      </span>
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
