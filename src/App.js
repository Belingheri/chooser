import { useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";

import Attributi from "./components/Attributi";
import Elementi from "./components/Elementi";
import ElementoForm from "./components/ElementoForm";

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
  const [elementiErrors, setElementiErrors] = useState({});

  const handleChangeAttributoValue = (attributo, valore) => {
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

  const handleCreaElemento = (descrizione, listaAttributi) => {
    const el = elementi.find((e) => e.descrizione === descrizione);
    if (el) throw new Error(`Elemento ${descrizione} gia' esistente`);
    const listaAttributiValore = listaAttributi.map((a) => {
      const peso = attributi.find((e) => e.nome === a.nome).peso;
      return new AttributoValore(a.nome, peso, a.valore);
    });
    const elementoToSave = new Elemento(descrizione, ...listaAttributiValore);
    const attElementi = [...elementi];
    attElementi.push(elementoToSave);
    setElementi(attElementi);
  };

  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Be Prometeo</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col sm={4}>
            <Attributi
              attributi={attributi}
              onAdd={handleCreaAttributo}
              onChange={handleChangeAttributoValue}
              onRemove={handleDeleteAttributo}
            />
            <ElementoForm attributi={attributi} onAdd={handleCreaElemento} />
          </Col>
          <Col>
            <Elementi
              elementi={elementi}
              onChange={handleChangeElementoValue}
              onFocusOut={resetElementiError}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
