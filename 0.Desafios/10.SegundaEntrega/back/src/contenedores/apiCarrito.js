const fs = require("fs").promises;

class Carritos {
  constructor(items) {
    this.items = items;
    this.route = "../../carritos.txt";
  }

  getAll(array) {
    return array;
  }

  getById(idR, array) {
    let cartById = [];
    const errMess = [{ error: `carrito no encontrado ID: ${idR}` }];
    cartById = array.filter((myFinder) => myFinder.id === idR);
    if (cartById.length === 0) {
      console.log("msj2", errMess);
      return errMess;
    } else {
      console.log("Carrito encontrado");
      return cartById;
    }
  }

  save(newCarrito, contenedor) {
    if (contenedor.length === 0) {
        newCarrito.id = 1;
      contenedor.push(newCarrito);
      fs.writeFile(this.route, JSON.stringify(contenedor));
      return newCarrito.id;
    } else {
      contenedor.sort((a, b) => a.id - b.id);
      newCarrito.id = contenedor[contenedor.length - 1].id + 1;
      contenedor.push(newCarrito);
      fs.writeFile(this.route, JSON.stringify(contenedor));
      return newCarrito.id;
    }
  }

  deleteById(idR, cart) {
    let cartById = [];
    cartById = cart.filter((myFinder) => myFinder.id === idR);
    if (cartById.length != 0) {
      cartById = cart.filter((myFinder) => myFinder.id != idR);
      console.log("carts", cart);
      fs.writeFile(this.route, JSON.stringify(cartById));
      return cartById;
    } else {
      return false;
    }
  }

  updateByID(idR, newCart, arrayCarts) {
    let ind = arrayCarts.findIndex((myFinder) => myFinder.id === idR);
    console.log("Imprimo ind", ind);
    if (ind === -1) {
      return false;
    } else {
      arrayCarts[ind].total = newCart.nombre;
      arrayCarts[ind].buyer = newCart.buyer;
      arrayCarts[ind].date = newCart.date;
      fs.writeFile(this.route, JSON.stringify(arrayCarts));
      return true;
    }
  }
}
module.exports = Carritos;
