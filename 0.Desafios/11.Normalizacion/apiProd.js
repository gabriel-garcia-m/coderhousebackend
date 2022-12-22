import ClienteSql from "./model/sql.js";
import { faker } from "@faker-js/faker";

class Productos {
  constructor(items, db, tabla) {
    this.items = items;
    this.db = db;
    this.tabla = tabla;
    const connectaDB = "";
  }
  createObject() {
    const sql = new ClienteSql(this.db);
    this.connectaDB = sql;
    return sql;
  }

  createT() {
    this.createObject();
    return this.connectaDB.createTable(this.tabla);
  }

  getAll(tabla) {
    return this.connectaDB.getArticles(tabla);
  }

  getRandomProduct() {
    return {
      nombre: faker.commerce.productName(),
      precio: faker.commerce.price(100),
      codigo: faker.finance.account(5),
      imagen: faker.image.imageUrl(80, 80, "computer", true),
    };
  }
  getAllFaker(productQty) {
    let products = [];
    for (let i = 0; i < productQty; i++) {
      products.push(this.getRandomProduct());
    }

    return {
      products,
    };
  }

  save(newProd) {
    return this.connectaDB.insertArticles(newProd, this.tabla);
  }

  close() {
    return this.connectaDB.close();
  }
}
export default Productos;
