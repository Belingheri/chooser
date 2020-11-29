import React, { useState } from "react";
import PropTypes from "prop-types";

import Elemento from "../model/Elemento";

function Elementi({
  elementi,
  onAdd,
  onRemove,
  onChange,
  elementiErrors,
  onFocusOut,
}) {
  const elementiOrdinati = elementi.sort((a, b) => b.valore - a.valore);
  return (
    <div>
      <h1>Oggetti</h1>
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
                            onChange(
                              elemento,
                              attributoValore,
                              t.valueAsNumber
                            );
                          }}
                          onBlur={() =>
                            onFocusOut(
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

Elementi.propTypes = {
  elementi: PropTypes.arrayOf(PropTypes.instanceOf(Elemento)).isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocusOut: PropTypes.func.isRequired,
  elementiErrors: PropTypes.object,
};

export default Elementi;
