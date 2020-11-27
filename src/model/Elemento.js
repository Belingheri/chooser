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
    attributiValore.forEach((attributoValore) =>
      this.addAttributoValore(attributiValore)
    );
  }

  set descrizione(descrizione) {
    if (!typeof descrizione !== "string")
      throw new Error("descrizione deve essere una stringa");
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
    if (!attributoValore instanceof AttributoValore)
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
    if (!attributo instanceof Attributo)
      throw new Error("attributo deve essere un istanza di Attributo");
    // assegno il valore minimo possibile
    const attributoValore = AttributoValore.creaAttributoValore(attributo);
    this.addAttributoValore(attributoValore);
  }

  get valore() {
    let dividendo = 0,
      divisore = 0;
    _attributi.get(this).forEach((attributo) => {
      dividendo += attributo.valore * attributo.peso;
      divisore += attributo.peso;
    });
    return dividendo / divisore;
  }
}
