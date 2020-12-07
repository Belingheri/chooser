const defaultDecisione =
  '{"attributi":[{"nome":"consumo","peso":7},{"nome":"potenza","peso":3}],"elementi":[{"descrizione":"panda","attributi":[{"nome":"consumo","peso":7,"valore":9},{"nome":"potenza","peso":3,"valore":1}]},{"descrizione":"ferrari","attributi":[{"nome":"consumo","peso":7,"valore":1},{"nome":"potenza","peso":3,"valore":10}]},{"descrizione":"fiesta","attributi":[{"nome":"consumo","peso":7,"valore":8},{"nome":"potenza","peso":3,"valore":6}]}]}';
const defaultName = "DEFAULT";

const decisioneAttuale = "SELECTED_DECISIONE";

function get() {
  if (!getSelectedName()) setSelectedName();
  if (!localStorage.getItem(getSelectedName()))
    localStorage.setItem(getSelectedName(), defaultDecisione);
  return localStorage.getItem(getSelectedName());
}

function getSelectedName() {
  return localStorage.getItem(decisioneAttuale);
}

function setSelectedName(nomeDecisione) {
  localStorage.setItem(decisioneAttuale, nomeDecisione || defaultName);
}

function save(elementi, attributi) {
  const elemnt = {
    attributi: attributi.map((a) => a.toSimpleObj()),
    elementi: elementi.map((e) => e.toSimpleObj()),
  };
  localStorage.setItem(getSelectedName(), JSON.stringify(elemnt));
}

export { get, getSelectedName, setSelectedName, save };
