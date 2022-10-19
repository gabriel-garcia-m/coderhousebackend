const fs = require("fs");

class Contenedor {
  constructor(items) {
    this.items = items;
  }

  async getAll() {
    let allProducts = [];
    await fs.promises
      .readFile(this.items, "utf-8")
      .then((contenido) => {
        allProducts = JSON.parse(contenido);
        console.log(
          "Imprimiendo array de objetos - funcion getAll:",
          allProducts
        );
        return allProducts;
      })
      .catch((error) =>
        console.log(`Problema de lectura en archivo: ${error.message}`)
      );
    return allProducts;
  }

  async getById(idR) {
    let allProdById = [];
    await fs.promises
      .readFile(this.items, "utf-8")
      .then((contenido) => {
        allProdById = JSON.parse(contenido);
        let prodById = [];
        prodById = allProdById.filter((myFinder) => myFinder.id === idR);
        if (prodById.length != 0) {
          console.log("Elemento localizado:", prodById);
          return prodById;
        } else {
          console.log("No se localiza elemento con ID:", idR);
          return null;
        }
      })
      .catch((error) =>
        console.log(`Problema de lectura en archivo: ${error.message}`)
      );
  }

  async deleteById(idR) {
    let allProdById = [];
    await fs.promises
      .readFile(this.items, "utf-8")
      .then((contenido) => {
        allProdById = JSON.parse(contenido);
        let prodById = [];
        prodById = allProdById.filter((myFinder) => myFinder.id === idR);
        if (prodById.length != 0) {
          let newProdArray = [];
          newProdArray = allProdById.filter((myFinder) => myFinder.id != idR);
          //console.log("Print newProdArray", newProdArray);
          fs.promises
            .writeFile(this.items, JSON.stringify(newProdArray))
            .then(() =>
              console.log("Archivo actualizado correctamente deleteById")
            )
            .catch((error) =>
              console.log(`Problema de escritura en archivo: ${error.message}`)
            );
        } else {
          console.log("No se localiza elemento con ID:", idR);
        }
      })
      .catch((error) =>
        console.log(`Problema de lectura en archivo: ${error.message}`)
      );
  }

  async deleteAll() {
    let allProducts = "";
    await fs.promises
      .readFile(this.items, "utf-8")
      .then((contenido) => {
       //console.log("Contenido a ser borrado:", JSON.parse(contenido));
        fs.promises
          .writeFile(this.items, JSON.stringify(allProducts))
          .then(() =>
            console.log("Archivo actualizado correctamente deleteAll")
          )
          .catch((error) =>
            console.log(`Problema de escritura en archivo: ${error.message}`)
          );
      })
      .catch((error) =>
        console.log(`Problema de lectura en archivo: ${error.message}`)
      );
  }

  async save(newProd) {
    let allProducts = [];
    let firstProduct = [];
    await fs.promises
      .readFile(this.items, "utf-8")
      .then((contenido) => {
        allProducts = JSON.parse(contenido);
        if (allProducts.length < 1) {
          newProd.id = 1;
          allProducts = newProd;
          firstProduct.push(allProducts);
          fs.promises
            .writeFile(this.items, JSON.stringify(firstProduct))
            .then(() => console.log("Archivo actualizado correctamente: save"))
            .catch((error) =>
              console.log(`Problema de escritura en archivo: ${error.message}`)
            );
        } else {
          allProducts.sort((a, b) => a.id - b.id);
          newProd.id = allProducts[allProducts.length - 1].id + 1;
          allProducts.push(newProd);
          fs.promises
            .writeFile(this.items, JSON.stringify(allProducts))
            .then(() => console.log("Archivo actualizado correctamente: save"))
            .catch((error) =>
              console.log(`Problema de escritura en archivo: ${error.message}`)
            );
        }
      })
      .catch((error) =>
        console.log(`Problema de lectura en archivo: ${error.message}`)
      );
  }
}
module.exports = Contenedor