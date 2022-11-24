const Productos = require("./apiProd.js");
const fs = require("fs").promises;


let prodsIni = [

];
async function retrieveProds() {
  try {
    const prodsInFile = await fs.readFile('./productos.txt');
    if (prodsInFile.toString() != "") {
      prodsIni = JSON.parse(prodsInFile);
      //    console.log('contenido de messageHistory', this.message)
    }
    return prodsIni;
  } catch (e) {
    if (e.code == "ENOENT") {
      fs.writeFile('./productos.txt', "");
      return [];
    }
    throw new Error(e.message);
  }
}
retrieveProds()
console.log('Reviso prodsIni', prodsIni)
const p = new Productos(prodsIni);
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
const arrayProds = [];

routerProductos.get("/", (req, res) => {
  res.send({ Productos: p.getAll(prodsIni) });
});

routerProductos.get("/react", (req, res) => {
  res.send({express: p.getAll(prodsIni)});
  console.log('Entro a getSend de Reac', JSON.stringify(p.getAll(prodsIni)))
});

routerProductos.get("/:id", (req, res) => {
  const idP = parseInt(req.params.id);
  console.log('Imprimo idP', req.params.id)
  res.send({ ResultadoID: p.getById(idP, prodsIni) });
});

routerProductos.post("/", (req, res) => {
  console.log('Entro a POST')
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
  console.log("entra a delete", req.params.idDelete);
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
