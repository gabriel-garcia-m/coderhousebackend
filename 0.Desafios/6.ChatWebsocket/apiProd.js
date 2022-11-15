class Productos {
    constructor(items) {
      this.items = items;
    }
  
    getAll(array) {
      return array;
    }
  
    getById(idR, array) {
      let prodById = [];
      const errMess = [{ error: `producto no encontrado ID: ${idR}` }];
      prodById = array.filter((myFinder) => myFinder.id === idR);
      if (prodById.length === 0) {
        console.log("msj2", errMess);
        return errMess;
      } else {
        console.log("Encontrado");
        return prodById;
      }
    }
  
    save(newProd, contenedor) {
      if (contenedor.length === 0) {
        newProd.id = 1;
        contenedor.push(newProd);
        return newProd.id;
      } else {
        contenedor.sort((a, b) => a.id - b.id);
        newProd.id = contenedor[contenedor.length - 1].id + 1;
        contenedor.push(newProd);
        return newProd.id;
      }
    }
  
    deleteById(idR, prods) {
      let prodById = [];
      prodById = prods.filter((myFinder) => myFinder.id === idR);
      if (prodById.length != 0) {
        prodById = prods.filter((myFinder) => myFinder.id != idR);
        console.log("prods", prods);
        return prodById;
      } else {
        return false;
      }
    }
  
    updateByID(idR, uProd, arrayProds) {
      let ind = arrayProds.findIndex((myFinder) => myFinder.id === idR);
      console.log("Imprimo ind", ind);
      if (ind === -1) {
        return false;
      } else {
        arrayProds[ind].title = uProd.title;
        arrayProds[ind].price = uProd.price;
        arrayProds[ind].thumbnail = uProd.thumbnail;
        return true;
      }
    }
  }
  module.exports = Productos;
  