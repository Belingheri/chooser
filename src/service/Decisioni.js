import Attributo from "../model/Attributo";
import Elemento from "../model/Elemento";
import AttributoValore from "../model/AttributoValore";
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
  const element = {
    attributi: attributi.map((a) => a.toSimpleObj()),
    elementi: elementi.map((e) => e.toSimpleObj()),
  };
  localStorage.setItem(getSelectedName(), JSON.stringify(element));
}
/**
 * @returns {Array} tutti i nomi delle decisioni
 */
function getAll() {
  return Object.keys(localStorage).filter(
    (e) => !e.startsWith(prefissoVariabiliInterne)
  );
}

/**
 * @description Aggiunge una nuova decisione
 * @param {string} nomeDecisione nome della nuova decisione
 */
function addDecisione(nomeDecisione) {
  validateNomeDecisione(nomeDecisione);
  // creo degli attributi fittizzi
  const attributo = new Attributo("attr", Attributo.pesoMinimo);
  const elementi = [
    new Elemento("elem", AttributoValore.creaAttributoValore(attributo)),
  ];
  const oldSelectedName = getSelectedName();
  try {
    setSelectedName(nomeDecisione);
    save(elementi, [attributo]);
  } catch (error) {
    setSelectedName(oldSelectedName);
  }
}
/**
 * @desciprion controlla se il nome da assegnare è valido
 * @param {string} nomeDecisione
 * @throw errore per la quale non è valido
 */
function validateNomeDecisione(nomeDecisione) {
  if (!nomeDecisione) throw new Error("Decisione deve essere valorizzato");
  if (typeof nomeDecisione !== "string")
    throw new Error("Decisione deve esere una stringa");
  if (!nomeDecisione.match(/^\w+$/i))
    throw new Error("Il nome può comprendere solo lettere, numeri e _");
  if (getAll().includes(nomeDecisione))
    throw new Error("Decisione già presente");
}
/**
 * rimuove la decisione e setta una decisione tra quelle presenti
 * @param {string} nomeDecisione
 */
function remove(nomeDecisione) {
  if (!getAll().includes(nomeDecisione))
    throw new Error(`${nomeDecisione} non trovato`);
  localStorage.removeItem(nomeDecisione);
  if (nomeDecisione === getSelectedName()) {
    const nuovoSelezionato = getAll()[0];
    setSelectedName(nuovoSelezionato);
  }
}

export {
  get,
  getSelectedName,
  setSelectedName,
  save,
  getAll,
  addDecisione,
  validateNomeDecisione,
  remove,
};
