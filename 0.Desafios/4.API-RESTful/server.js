const Productos = require("./apiProd.js");
let prodsIni = [
  {
    title: "Monitor",
    price: 150.5,
    thumbnail:
      "https://www.pexels.com/photo/space-gray-iphone-6-on-top-of-laptop-computer-119550/",
    id: 1,
  },
];
const p = new Productos(prodsIni);
const express = require("express");
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let methodOverride = require("method-override");
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
const arrayProds = [];

routerProductos.get("/", (req, res) => {
  res.send({ Productos: p.getAll(prodsIni) });
});

routerProductos.get("/:id", (req, res) => {
  const idP = parseInt(req.params.id);
  res.send({ ResultadoID: p.getById(idP, prodsIni) });
});

routerProductos.post("/", (req, res) => {
  p.save(req.body, prodsIni);
  res.send({ ProductoAñadido: prodsIni[prodsIni.length - 1] });
});

routerProductos.put("/:idPut", urlencodedParser, (req, res) => {
  console.log("entra a put");
  if (p.updateByID(parseInt(req.params.idPut), req.body, prodsIni)) {
    res.send({ ProductoActualizado: `${req.params.idPut}` });
  } else {
    res.send({ Resultado: `No se localiza producto: ${req.params.idPut}` });
  }
});

routerProductos.delete("/:idDelete", urlencodedParser, (req, res) => {
  console.log("entra a delete");
  if ((prodsIni = p.deleteById(parseInt(req.params.idDelete), prodsIni))) {
    console.log("Imprimo prodsIni despues de deleteById", prodsIni);
    res.send({ ProductoBorradoID: `${req.params.idDelete}` });
  } else {
    res.send({ Resultado: `No se localiza producto: ${req.params.idDelete}` });
  }
});

app.use("/api/productos/", routerProductos);
const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on("error", (err) => console.log("Error en el servidor:", err));
