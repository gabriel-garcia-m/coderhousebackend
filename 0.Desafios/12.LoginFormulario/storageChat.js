import * as fs from "fs";
import moment from "moment";

class storageChat {
  constructor(route) {
    this.route = "./public/chat.txt";
    this.message = [];
  }

  async storeM(data) {
    try {
      const newMessage = {
        author: {
          correo: data.author.correo,
          nombre: data.author.nombre,
          apellido: data.author.apellido,
          edad: data.author.edad,
          alias: data.author.alias,
          avatar: data.author.avatar,
        },
        texto: data.texto,
        date: moment().format("D/MM/YYYY LTS")
      };
      console.log('Printing newMessage de storeM', newMessage)
      const retrievedMessage = await this.retrieveMessage();
      retrievedMessage.push(newMessage);
      await fs.writeFileSync(
        this.route,
        JSON.stringify(retrievedMessage, null, 2)
      );
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async retrieveMessage() {
    try {
      const messageHistory = await fs.readFileSync(this.route);
      if (messageHistory.toString() != "") {
        this.message = JSON.parse(messageHistory);
        console.log("contenido de messageHistory", this.message);
      }
      return this.message;
    } catch (e) {
      if (e.code == "ENOENT") {
        fs.writeFile(this.route, "");
        return [];
      }
      // throw new Error(e.message);
    }
  }
}

export default storageChat;
