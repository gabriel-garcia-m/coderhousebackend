const Contenedor = require("./contenedor.js");
const c = new Contenedor("productos.txt");

// Quitar comentarios para ejecutar la funcion deseada
//  c.deleteAll()
  c.getAll();
//  c.deleteById(1);
//  c.getById(11);

const nuevoProd = {
  title: "Monitor",
  price: 150.5,
  thumbnail:
    "https://www.pexels.com/photo/space-gray-iphone-6-on-top-of-laptop-computer-119550/",
};
c.save(nuevoProd);
