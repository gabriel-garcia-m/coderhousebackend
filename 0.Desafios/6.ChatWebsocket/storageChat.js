const fs = require("fs").promises;
const moment = require("moment");

class storageChat {
  constructor(route) {
    this.route = "./public/chat.txt";
    this.message = [];
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
      await fs.writeFile(this.route, JSON.stringify(retrievedMessage, null, 2));
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async retrieveMessage() {
    try {
      const messageHistory = await fs.readFile(this.route);
      if (messageHistory.toString() != "") {
        this.message = JSON.parse(messageHistory);
        //    console.log('contenido de messageHistory', this.message)
      }
      return this.message;
    } catch (e) {
      if (e.code == "ENOENT") {
        fs.writeFile(this.route, "");
        return [];
      }
      throw new Error(e.message);
    }
  }
}

module.exports = storageChat;
