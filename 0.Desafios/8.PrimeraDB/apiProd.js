import ClienteSql from './model/sql.js';

class Productos {
  constructor(items, db, tabla) {
    this.items = items;
    this.db = db;
    this.tabla = tabla;
    const connectaDB =''
  }
  createObject(){
    const sql = new ClienteSql(this.db);
    this.connectaDB = sql
    return sql
  }

  createT() {
    this.createObject()
    return this.connectaDB.createTable(this.tabla);
  }

  getAll(tabla) {
    return this.connectaDB.getArticles(tabla);
  }

  save(newProd){
    return this.connectaDB.insertArticles(newProd, this.tabla)
  }

  close() {
    return this.connectaDB.close();
  }
}
export default Productos
  