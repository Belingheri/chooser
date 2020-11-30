import Attributo from "./Attributo";

const _valore = new WeakMap();

/**
 * AttributoValore
 * @description valore di un attributo
 * @author Belingheri
 * @extends Attributo
 */
export default class AttributoValore extends Attributo {
  /**
   * creaAttributoValore
   * @Belingheri
   * @description restituisce un istanza della classe AttributoValore
   * @param {Attributo} attributo attributo da includere
   * @param {number} valore valore dell'attributo
   * @returns {AttributoValore} istanza di AttributoValore
   */
  static creaAttributoValore(attributo, valore = Attributo.pesoMinimo) {
    if (!attributo instanceof Attributo)
      throw new Error("attributo deve essere un istanza di Attributo");
    return new AttributoValore(attributo.nome, attributo.peso, valore);
  }

  /**
   * validateValore
   * @Belingheri
   * @description valida il valore se invalido solleva un eccezione
   * @param {number} valore valore da validare
   * @throws causa di non validita'
   */
  static validateValore(valore) {
    if (typeof valore !== "number" || !valore)
      throw new Error("valore deve essere un numero");
    if (valore < Attributo.pesoMinimo || valore > Attributo.pesoMassimo)
      throw new Error(
        `valore deve essere compreso tra ${Attributo.pesoMinimo} e ${Attributo.pesoMassimo}`
      );
  }

  /**
   *
   * @param {string} nome nome dell'attributo
   * @param {number} peso peso dell'attributo
   * @param {valore} valore valore dell'attributo
   */
  constructor(nome, peso, valore) {
    super(nome, peso);
    this.valore = valore;
  }

  set valore(valore) {
    AttributoValore.validateValore(valore);
    _valore.set(this, valore);
  }

  get valore() {
    return _valore.get(this);
  }

  /**
   * toSimpleObj
   * @Belingheri
   * @description ritorna oggetto con i valori come semplice oggetto di valori
   * @returns oggetto contenete i valori attuali
   */
  toSimpleObj() {
    const obj = super.toSimpleObj();
    obj.valore = this.valore;
    return obj;
  }
}
