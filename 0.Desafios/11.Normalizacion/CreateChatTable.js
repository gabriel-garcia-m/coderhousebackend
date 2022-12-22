import chatHistory from "./storageChat.js";
import { config } from "./options/sqlite.js";

const tabla = "messages";
function createTableChat() {
  const hCObj = new chatHistory(config, tabla);
  return hCObj
    .createT()

    .then((t) => {
      console.log("Tabla creada");
      console.table(t);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      hCObj.close();
    });
}

createTableChat();
