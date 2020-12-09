const defaultDecisione =
  '{"attributi":[{"nome":"consumo","peso":7},{"nome":"potenza","peso":3}],"elementi":[{"descrizione":"panda","attributi":[{"nome":"consumo","peso":7,"valore":9},{"nome":"potenza","peso":3,"valore":1}]},{"descrizione":"ferrari","attributi":[{"nome":"consumo","peso":7,"valore":1},{"nome":"potenza","peso":3,"valore":10}]},{"descrizione":"fiesta","attributi":[{"nome":"consumo","peso":7,"valore":8},{"nome":"potenza","peso":3,"valore":6}]}]}';
const defaultName = "DEFAULT";

const prefissoVariabiliInterne = `${process.env.REACT_APP_NAME}.`;
const decisioneAttuale = `${prefissoVariabiliInterne}SELECTED_DECISIONE`;

/**
 * get
 * @returns il valore dellla decisione attuale
 */
function get() {
  if (!localStorage.getItem(getSelectedName()))
    localStorage.setItem(getSelectedName(), defaultDecisione);
  return localStorage.getItem(getSelectedName());
}
/**
 * getSelectedName
 * @returns nome della decisione attuale
 */
function getSelectedName() {
  let nomeDecisioneAttuale = localStorage.getItem(decisioneAttuale);
  if (!nomeDecisioneAttuale) {
    setSelectedName();
    nomeDecisioneAttuale = localStorage.getItem(decisioneAttuale);
  }
  return nomeDecisioneAttuale;
}

/**
 *
 * @param {string} nomeDecisione setta nome della decisione attuale
 */
function setSelectedName(nomeDecisione) {
  localStorage.setItem(decisioneAttuale, nomeDecisione || defaultName);
}

/**
 * save
 * @description Salva gli elementi e gli attributi
 * @param {Array<Elemento>} elementi elementi da savlare
 * @param {Array<AttributoValore>} attributi attributi da salvare
 */
function save(elementi, attributi) {
  const elemnt = {
    attributi: attributi.map((a) => a.toSimpleObj()),
    elementi: elementi.map((e) => e.toSimpleObj()),
  };
  localStorage.setItem(getSelectedName(), JSON.stringify(elemnt));
}
/**
 * @returns {Array} tutti i nomi delle decisioni
 */
function getAll() {
  return Object.keys(localStorage).filter(
    (e) => !e.startsWith(prefissoVariabiliInterne)
  );
}

export { get, getSelectedName, setSelectedName, save, getAll };
