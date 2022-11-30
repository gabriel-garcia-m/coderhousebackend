const Productos = require("./apiProd.js");
const Carritos = require("./apiCarrito.js");
const fs = require("fs").promises;

let prodsIni = [];

let carritosIni = [];
async function retrieveProds() {
  try {
    const prodsInFile = await fs.readFile("./productos.txt");
    if (prodsInFile.toString() != "") {
      prodsIni = JSON.parse(prodsInFile);
      //    console.log('contenido de messageHistory', this.message)
    }
    return prodsIni;
  } catch (e) {
    if (e.code == "ENOENT") {
      fs.writeFile("./productos.txt", "");
      return [];
    }
    throw new Error(e.message);
  }
}
retrieveProds();


async function retrieveCarts() {
  try {
    const cartsInFile = await fs.readFile("./carritos.txt");
    if (cartsInFile.toString() != "") {
      carritosIni = JSON.parse(cartsInFile);
    }
    return carritosIni;
  } catch (e) {
    if (e.code == "ENOENT") {
      fs.writeFile("./carritos.txt", "");
      return [];
    }
    throw new Error(e.message);
  }
}
retrieveCarts();





console.log("Reviso prodsIni", prodsIni);
const p = new Productos(prodsIni);
const c = new Carritos(carritosIni);

const express = require("express");
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let methodOverride = require("method-override");
const { connectFirestoreEmulator } = require("firebase/firestore");
const { Router } = express;
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(methodOverride("_method"));
const routerProductos = new Router();
routerProductos.use(express.json());
const routerCarrito = new Router();
routerCarrito.use(express.json());

const arrayProds = [];

routerProductos.get("/", (req, res) => {
  res.send({ Productos: p.getAll(prodsIni) });
});

routerProductos.get("/productos/react", (req, res) => {
  res.send({ express: p.getAll(prodsIni) });
  console.log("Entro a getSend de React", JSON.stringify(p.getAll(prodsIni)));
});

routerProductos.get("/productos/:id", (req, res) => {
  const idP = parseInt(req.params.id);
  console.log("Imprimo idP", req.params.id);
  res.send({ ResultadoID: p.getById(idP, prodsIni) });
});

routerProductos.post("/productos/", (req, res) => {
  console.log("Entro a POST");
  p.save(req.body, prodsIni);
  res.send({ ProductoAñadido: prodsIni[prodsIni.length - 1] });
});

routerProductos.put("/productos/:idPut", urlencodedParser, (req, res) => {
  console.log("entra a put");
  if (p.updateByID(parseInt(req.params.idPut), req.body, prodsIni)) {
    res.send({ ProductoActualizado: `${req.params.idPut}` });
  } else {
    res.send({ Resultado: `No se localiza producto: ${req.params.idPut}` });
  }
});

routerProductos.delete("/productos/:idDelete", urlencodedParser, (req, res) => {
  console.log("entra a delete", req.params.idDelete);
  if ((prodsIni = p.deleteById(parseInt(req.params.idDelete), prodsIni))) {
    console.log("Imprimo prodsIni despues de deleteById", prodsIni);
    res.send({ ProductoBorradoID: `${req.params.idDelete}` });
  } else {
    res.send({ Resultado: `No se localiza producto: ${req.params.idDelete}` });
  }
});

routerCarrito.get("/reactcarrito", (req, res) => {
  res.send({ Carrito: "Aqui el carrito" });
});

routerCarrito.post("/reactcarrito", (req, res) => {
  console.log("Entro a POST de carrito");
  c.save(req.body, carritosIni);
  res.send({ CarritoAgregado: carritosIni[carritosIni.length - 1] });
});

routerCarrito.get("/reactcarrito/:id", (req, res) => {
  const idP = parseInt(req.params.id);
  console.log("Imprimo idP carrito", req.params.id);
  res.send({ ResultadoID: c.getById(idP, carritosIni) });
});

routerCarrito.delete("/reactcarrito/:idDelete", urlencodedParser, (req, res) => {
  console.log("Entra a delete de carrito", req.params.idDelete);
  if ((carritosIni = c.deleteById(parseInt(req.params.idDelete), carritosIni))) {
    console.log("Imprimo carritosIni despues de deleteById", carritosIni);
    res.send({ CarritoBorradoID: `${req.params.idDelete}` });
  } else {
    res.send({ Resultado: `No se localiza producto: ${req.params.idDelete}` });
  }
});

routerCarrito.put("/reactcarrito/:idPut", urlencodedParser, (req, res) => {
  console.log("entra a put de carrito");
  if (c.updateByID(parseInt(req.params.idPut), req.body, carritosIni)) {
    res.send({ CarritoActualizado: `${req.params.idPut}` });
  } else {
    res.send({ Resultado: `No se localiza producto: ${req.params.idPut}` });
  }
});

app.use("/api/", routerProductos);
app.use("/api/", routerCarrito);

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on("error", (err) => console.log("Error en el servidor:", err));
