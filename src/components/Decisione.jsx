import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

import Attributi from "./Attributi";
import Elementi from "./Elementi";
import ElementoForm from "./ElementoForm";

import AttributoValore from "../model/AttributoValore";
import Elemento from "../model/Elemento";
import Attributo from "./../model/Attributo";

import * as DecisioniService from "../service/Decisioni";

function Decisione({ decisione }) {
  const [internalAttributi, setInternalAttributi] = useState([]);
  const [internalElementi, setInternalElementi] = useState([]);
  const [elementiErrors, setElementiErrors] = useState({});

  useEffect(() => {
    try {
      const decisioneObj = JSON.parse(decisione);
      const attAttributi = decisioneObj.attributi.map(
        (a) => new Attributo(a.nome, a.peso)
      );

      const defaultElementi = decisioneObj.elementi.map((e) => {
        return new Elemento(
          e.descrizione,
          ...e.attributi.map((a) =>
            AttributoValore.creaAttributoValore(
              new Attributo(a.nome, a.peso),
              a.valore
            )
          )
        );
      });

      setInternalAttributi(attAttributi);
      setInternalElementi(defaultElementi);
    } catch (error) {
      console.log(error.message);
    }
  }, [decisione]);

  const handleChangeAttributoValue = (attributo, valore) => {
    const attualiAttributi = [...internalAttributi];
    const idx = attualiAttributi.findIndex(
      (attr) => attr.nome === attributo.nome
    );
    attualiAttributi[idx].peso = valore;
    const attualiElementi = [...internalElementi];
    attualiElementi.forEach((elemento) => {
      const idx = elemento.attributi.findIndex(
        (el) => el.nome === attributo.nome
      );
      elemento.attributi[idx].peso = valore;
    });
    setInternalElementi(attualiElementi);
    setInternalAttributi(attualiAttributi);
  };

  const handleDeleteAttributo = (nomeAttributo) => {
    try {
      const attAttributi = [...internalAttributi],
        attElementi = [...internalElementi];
      const idx = attAttributi.findIndex((a) => a.nome === nomeAttributo);
      if (idx < 0) throw new Error(`Attributo ${nomeAttributo} non presente`);
      attAttributi.splice(idx, 1);

      attElementi.forEach((e) => {
        e.removeAttributo(nomeAttributo);
      });

      setInternalAttributi(attAttributi);
      setInternalElementi(attElementi);
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
      const attualiElementi = [...internalElementi];
      const idx = attualiElementi.findIndex(
        (el) => el.descrizione === elemento.descrizione
      );

      attualiElementi[idx].changeValueAttributo(attributoValore.nome, valore);

      setInternalElementi(attualiElementi);
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
      const attAttributi = [...internalAttributi];
      // controllo sotto gia
      // const attEx = attAttributi.find((a) => a.nome === attributoToAdd.nome);
      // if (attEx) throw new Error(`Attributo ${attEx.nome} gia essistente`);
      attAttributi.push(attributoToAdd);
      const attElementi = [...internalElementi];
      attElementi.forEach((el) => {
        el.addAttributo(attributoToAdd);
      });
      setInternalAttributi(attAttributi);
      setInternalElementi(attElementi);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const handleCreaElemento = (descrizione, listaAttributi) => {
    const el = internalElementi.find((e) => e.descrizione === descrizione);
    if (el) throw new Error(`Elemento ${descrizione} gia' esistente`);
    const listaAttributiValore = listaAttributi.map((a) => {
      const peso = internalAttributi.find((e) => e.nome === a.nome).peso;
      return new AttributoValore(a.nome, peso, a.valore);
    });
    const elementoToSave = new Elemento(descrizione, ...listaAttributiValore);
    const attElementi = [...internalElementi];
    attElementi.push(elementoToSave);
    setInternalElementi(attElementi);
  };

  const handleSave = () => {
    try {
      DecisioniService.save(internalElementi, internalAttributi);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Row>
        <Col sm={4}>
          <Attributi
            attributi={internalAttributi}
            onAdd={handleCreaAttributo}
            onChange={handleChangeAttributoValue}
            onRemove={handleDeleteAttributo}
          />
          <ElementoForm
            attributi={internalAttributi}
            onAdd={handleCreaElemento}
          />
        </Col>
        <Col>
          <Elementi
            elementi={internalElementi}
            onChange={handleChangeElementoValue}
            onFocusOut={resetElementiError}
            onSaveDecisione={handleSave}
          />
        </Col>
      </Row>
    </div>
  );
}

Decisione.propTypes = {
  decisione: PropTypes.string.isRequired,
};

export default Decisione;
