const _nome = new WeakMap();
const _peso = new WeakMap();

/**
 * Attributo
 * @description attributo, caratteriristica di un elemento
 * @author Belingheri
 *
 */
class Attributo {
  /**
   *  peso minimo possibile
   */
  static pesoMinimo = 1;
  /**
   * peso massimo possibile
   */
  static pesoMassimo = 10;

  /**
   *
   * @param {string} nome nome dell'attributo
   * @param {number} peso peso dell'attributo compreso tra Attributo.pesoMinimo e Attributo.pesoMassimo
   */
  constructor(nome, peso) {
    this.nome = nome;
    this.peso = peso;
  }

  set nome(nome) {
    if (!nome) throw new Error("nome deve essere valorizzato");
    if (typeof nome !== "string")
      throw new Error("nome deve essere una stringa");
    _nome.set(this, nome);
  }
  get nome() {
    return _nome.get(this);
  }
  set peso(peso) {
    if (!peso) throw new Error("peso deve essere valorizzato");
    if (typeof peso !== "number") throw new Error("peso deve essere un numero");
    if (peso < Attributo.pesoMinimo || peso > Attributo.pesoMassimo)
      throw new Error(
        `peso deve essere compreso tra ${Attributo.pesoMinimo} e ${Attributo.pesoMassimo}`
      );
    _peso.set(this, peso);
  }
  get peso() {
    return _peso.get(this);
  }
}

export default Attributo;
