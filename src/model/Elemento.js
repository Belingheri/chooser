import Attributo from "./Attributo";
import AttributoValore from "./AttributoValore";
const _descrizione = new WeakMap();
const _attributi = new WeakMap([]);

/**
 * Elemento
 * @Belingheri
 * @description elemento in analisi
 */
export default class Elemento {
  /**
   * validateDescrizione
   * @Belingheri
   * @description valida il campo descrizione
   * @param {string} descrizione descrizione dell'elemento
   * @throws {Error} se non rispetta i requisiti richiesti
   */
  static validateDescrizione(descrizione) {
    if (typeof descrizione !== "string")
      throw new Error("descrizione deve essere una stringa");
    if (!/^[\w]+$/.test(descrizione))
      throw new Error(
        "descrizione puo' essere composto solamente da lettere numeri o '_' "
      );
  }

  /**
   * creaElemento
   * @Belingheri
   * @description Crea un nuovo elemento con tutti gli attributi in input
   * @param {string} descrizione descrizione dell'elemento
   * @param  {...Attributo} attributi attributi che devono essere nell'elemento
   * @returns istanza di Elemento
   */
  static creaElemento(descrizione, ...attributi) {
    const attributiValore = attributi.map((attributo) =>
      AttributoValore.creaAttributoValore(attributi)
    );
    return new Elemento(descrizione, attributiValore);
  }

  /**
   * @Belingheri
   * @param {string} descrizione descrizione dell'elemento
   * @param  {...AttributoValore} attributiValore attributo valore
   */
  constructor(descrizione, ...attributiValore) {
    this.descrizione = descrizione;
    if (attributiValore.length === 0)
      throw new Error("E' necessario definire almeno un attibutoValore");
    _attributi.set(this, []);
    attributiValore.forEach((attributoValore) =>
      this.addAttributoValore(attributoValore)
    );
  }

  set descrizione(descrizione) {
    Elemento.validateDescrizione(descrizione);
    _descrizione.set(this, descrizione);
  }
  get descrizione() {
    return _descrizione.get(this);
  }

  get attributi() {
    return _attributi.get(this);
  }

  /**
   * addAttributovalore
   * @Belingheri
   * @description Aggiunge un attributoValore alla lista delgi attributi
   * @param {AttributoValore} attributoValore attributo valore da aggiungere
   */
  addAttributoValore(attributoValore) {
    if (!(attributoValore instanceof AttributoValore))
      throw new Error(
        "attributoValore deve essere un istanza di AttributoValore"
      );
    const attributi = _attributi.get(this);
    attributi.push(attributoValore);
    _attributi.set(this, attributi);
  }
  /**
   * addAttributo
   * @description Aggiunge un attributo valore del attributo in input alla vista degli attributi inizializzandolo con il valore minimo
   * @param {Attributo} attributo attributo da aggiugere
   */
  addAttributo(attributo) {
    if (!(attributo instanceof Attributo))
      throw new Error("attributo deve essere un istanza di Attributo");
    // assegno il valore minimo possibile
    const attributoValore = AttributoValore.creaAttributoValore(attributo);
    this.addAttributoValore(attributoValore);
  }

  /**
   * changeValueAttributo
   * @Belingheri
   * @description cambia il valore dell'attributo in input
   * @param {string} nomeAttributo
   * @param {number} valore
   */
  changeValueAttributo(nomeAttributo, valore) {
    if (typeof nomeAttributo !== "string")
      throw new Error("nomeAttributo deve essere una stringa");
    const attributi = _attributi.get(this);
    const attributo = attributi.find(
      (attributo) => attributo.nome === nomeAttributo
    );
    if (!attributo)
      throw new Error(
        `Attributo ${nomeAttributo} non presente in questo elemento`
      );
    attributo.valore = valore;
    _attributi.set(this, attributi);
  }
  /**
   * getAttributo
   * cerca l'attributo con in nome in input se non c'e' solleva un eccezione
   * @param {string} nomeAttributo nome attributo da cercare
   * @returns AttributoValore richiesto
   * @throws {Error} attributo non esiste
   */
  getAttributo(nomeAttributo) {
    if (typeof nomeAttributo !== "string")
      throw new Error("nomeAttributo deve essere una stringa");
    const attributi = _attributi.get(this);
    const attributo = attributi.find(
      (attributo) => attributo.nome === nomeAttributo
    );
    if (!attributo)
      throw new Error(
        `Attributo ${nomeAttributo} non presente in questo elemento`
      );
    return attributo;
  }

  /**
   * removeAttributo
   * @Belingheri
   * @description rimuove l'attributo
   * @param {string} nomeAttributo
   * @returns attributo rimosso
   */
  removeAttributo(nomeAttributo) {
    if (typeof nomeAttributo !== "string")
      throw new Error("nomeAttributo deve essere una stringa");
    const attributi = _attributi.get(this);
    const idx = attributi.findIndex(
      (attributo) => attributo.nome === nomeAttributo
    );
    if (idx < 0)
      throw new Error(
        `Attributo ${nomeAttributo} non presente in questo elemento`
      );
    const attributoRimosso = attributi.splice(idx, 1);
    _attributi.set(this, attributi);
    return attributoRimosso;
  }

  get valore() {
    let dividendo = 0,
      divisore = 0;
    _attributi.get(this).forEach((attributo) => {
      dividendo += attributo.valore * attributo.peso;
      divisore += attributo.peso;
    });
    return divisore === 0 ? 0 : dividendo / divisore;
  }

  /**
   * toSimpleObj
   * @Belingheri
   * @description ritorna oggetto con i valori come semplice oggetto di valori
   * @returns oggetto contenete i valori attuali
   */
  toSimpleObj() {
    const obj = {
      descrizione: this.descrizione,
      attributi: [],
    };
    this.attributi.forEach((attributoValore) => {
      obj.attributi.push(attributoValore.toSimpleObj());
    });

    return obj;
  }
}
