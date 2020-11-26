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
   *
   * @param {string} nome nome dell'attributo
   * @param {number} peso peso dell'attributo compreso tra 1 e 10
   */
  constructor(nome, peso) {
    this.nome = nome;
    this.peso = peso;
  }

  set nome(nome) {
    if (typeof nome !== "string")
      throw new Error("nome deve essere una stringa");
    _nome.set(this, nome);
  }
  get nome() {
    return _nome.get(this);
  }
  set peso(peso) {
    if (typeof peso !== "number") throw new Error("peso deve essere un numero");
    if (peso < 1 || peso > 10)
      throw new Error("peso deve essere compreso tra 1 e 10");
    _peso.set(this, peso);
  }
  get peso() {
    return _peso.get(this);
  }
}

export default Attributo;
