import Productos from "./apiProd.js";
import { options } from "./options/mariaDB.js";

const tabla = "articles";
const emptyArr = []
function createArticlesTable() {
  const prodObj = new Productos(emptyArr,options, tabla);
  return prodObj
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
      prodObj.close();
    });
}

createArticlesTable();
