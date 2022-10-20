const fs = require("fs").promises;

class Contenedor {
  constructor(items) {
    this.items = items;
  }

  async getAll() {
    let allProducts = [];
    try {
      const data = await fs.readFile(this.items, "utf-8");
      allProducts = JSON.parse(data);
      console.log(
        "Imprimiendo array de objetos - funcion getAll:",
        allProducts
      );
      return allProducts;
    } catch (error) {
      console.log(`Problema de lectura en archivo: ${error.message}`);
    }
    return allProducts;
  }

  async getById(idR) {
    let allProdById = [];
    try {
      const data = await fs.readFile(this.items, "utf-8");
      allProdById = JSON.parse(data);
      let prodById = [];
      prodById = allProdById.filter((myFinder) => myFinder.id === idR);
      if (prodById.length != 0) {
        console.log("Elemento localizado:", prodById);
        return prodById;
      } else {
        console.log("No se localiza elemento con ID:", idR);
        return null;
      }
    } catch (error) {
      console.log(`Problema de lectura en archivo: ${error.message}`);
    }
  }

  async deleteById(idR) {
    let allProdById = [];
    try {
      const data = await fs.readFile(this.items, "utf-8");
      allProdById = JSON.parse(data);
      let prodById = [];
      prodById = allProdById.filter((myFinder) => myFinder.id === idR);
      if (prodById.length != 0) {
        let newProdArray = [];
        newProdArray = allProdById.filter((myFinder) => myFinder.id != idR);
        try {
          fs.writeFile(this.items, JSON.stringify(newProdArray));
          console.log("Archivo actualizado correctamente deleteById");
        } catch (error) {
          console.log(`Problema de escritura en archivo: ${error.message}`);
        }
      } else {
        console.log("No se localiza elemento con ID:", idR);
      }
    } catch (error) {
      console.log(`Problema de lectura en archivo: ${error.message}`);
    }
  }

  async deleteAll() {
    let allProducts = "";
    try {
      await fs.readFile(this.items, "utf-8");
      try {
        await fs.writeFile(this.items, JSON.stringify(allProducts));
        console.log("Archivo actualizado correctamente deleteAll");
      } catch (error) {
        console.log(`Problema de escritura en archivo: ${error.message}`);
      }
    } catch (error) {
      console.log(`Problema de lectura en archivo: ${error.message}`);
    }
  }

  async save(newProd) {
    let allProducts = [];
    let firstProduct = [];
    try {
      const data = await fs.readFile(this.items, "utf-8");
      allProducts = JSON.parse(data);
      if (allProducts.length < 1) {
        newProd.id = 1;
        allProducts = newProd;
        firstProduct.push(allProducts);
        try {
          await fs.writeFile(this.items, JSON.stringify(firstProduct));
          console.log("Archivo actualizado correctamente: save");
        } catch (error) {
          console.log(`Problema de escritura en archivo: ${error.message}`);
        }
      } else {
        allProducts.sort((a, b) => a.id - b.id);
        newProd.id = allProducts[allProducts.length - 1].id + 1;
        allProducts.push(newProd);
        try {
          await fs.writeFile(this.items, JSON.stringify(allProducts));
          console.log("Archivo actualizado correctamente: save");
        } catch (error) {
          console.log(`Problema de escritura en archivo: ${error.message}`);
        }
      }
    } catch (error) {
      console.log(`Problema de lectura en archivo: ${error.message}`);
    }
  }
}
module.exports = Contenedor