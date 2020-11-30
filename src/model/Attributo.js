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
   * validatePeso
   * @Belingheri
   * @description valida il peso se invalido solleva un eccezione
   * @param {number} peso peso da validare
   * @throws causa di non validita'
   */
  static validatePeso(peso) {
    if (!peso) throw new Error("peso deve essere valorizzato");
    if (typeof peso !== "number") throw new Error("peso deve essere un numero");
    if (peso < Attributo.pesoMinimo || peso > Attributo.pesoMassimo)
      throw new Error(
        `peso deve essere compreso tra ${Attributo.pesoMinimo} e ${Attributo.pesoMassimo}`
      );
  }

  /**
   * validateNome
   * @Belingheri
   * @description valida il peso se invalido solleva un eccezione
   * @param {string} nome nome da validare
   * @throws causa di non validita'
   */
  static validateNome(nome) {
    if (!nome) throw new Error("nome deve essere valorizzato");
    if (typeof nome !== "string")
      throw new Error("nome deve essere una stringa");
  }

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
    Attributo.validateNome(nome);
    _nome.set(this, nome);
  }
  get nome() {
    return _nome.get(this);
  }
  set peso(peso) {
    Attributo.validatePeso(peso);
    _peso.set(this, peso);
  }
  get peso() {
    return _peso.get(this);
  }
  /**
   * toSimpleObj
   * @Belingheri
   * @description ritorna oggetto con i valori come semplice oggetto di valori
   * @returns oggetto contenete i valori attuali
   */
  toSimpleObj() {
    return { peso: this.peso, nome: this.nome };
  }
}

export default Attributo;
