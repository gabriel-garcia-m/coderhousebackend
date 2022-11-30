import moment from "moment";
import ClienteSqlChat from "./model/sqlchat.js";

class storageChat {
  constructor(db, tabla) {
    this.db = db;
    this.tabla = tabla;
    const connectaDB = "";
    this.message = [];
  }

  createObject() {
    const sql = new ClienteSqlChat(this.db);
    this.connectaDB = sql;
    return sql;
  }

  createT() {
    this.createObject();
    return this.connectaDB.createTable(this.tabla);
  }

  async storeM(data) {
    try {
      const newMessage = {
        email: data.email,
        texto: data.texto,
        date: moment().format("D/MM/YYYY LTS"),
      };
      const retrievedMessage = await this.retrieveMessage();
      retrievedMessage.push(newMessage);
      return this.connectaDB.insertMessages(newMessage, this.tabla);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async retrieveMessage() {
    try {
      return this.connectaDB.getMessages(this.tabla);
    } catch (e) {
      console.log("Error", e);
    }
  }

  close() {
    return this.connectaDB.close();
  }
}

export default storageChat;
