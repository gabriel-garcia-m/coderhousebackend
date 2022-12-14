const Productos = require("./src/contenedores/apiProd.js");
const Carritos = require("./src/contenedores/apiCarrito.js");
const ProductosDaoMongoDb = require ('./src/daos/productos/ProductosDaoMongoDb.js')
const configMongo = require('./options/configMongo.js')
console.log('Imprimo config', `"${configMongo}"`)
const productsMongo = new ProductosDaoMongoDb(`"${configMongo}"`)
const fs = require("fs").promises;

const controllerDataSource = 'mongo'

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
const { json } = require("body-parser");
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
let dynamicProds = []

routerProductos.get("/", async (req, res) => {
  try {
    dynamicProds = await productsMongo.getAll();
    console.log("Verirfico contenido de dynamicProds:", dynamicProds);
    res.send({Productos: dynamicProds});
  } catch (error) {
    console.log(error);
  }
});

switch (controllerDataSource) {
  case "archivos":
    routerProductos.get("/productos/react", async (req, res) => {
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

    routerProductos.delete(
      "/productos/:idDelete",
      urlencodedParser,
      (req, res) => {
        console.log("entra a delete", req.params.idDelete);
        if (
          (prodsIni = p.deleteById(parseInt(req.params.idDelete), prodsIni))
        ) {
          console.log("Imprimo prodsIni despues de deleteById", prodsIni);
          res.send({ ProductoBorradoID: `${req.params.idDelete}` });
        } else {
          res.send({
            Resultado: `No se localiza producto: ${req.params.idDelete}`,
          });
        }
      }
    );

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

    routerCarrito.delete(
      "/reactcarrito/:idDelete",
      urlencodedParser,
      (req, res) => {
        console.log("Entra a delete de carrito", req.params.idDelete);
        if (
          (carritosIni = c.deleteById(
            parseInt(req.params.idDelete),
            carritosIni
          ))
        ) {
          console.log("Imprimo carritosIni despues de deleteById", carritosIni);
          res.send({ CarritoBorradoID: `${req.params.idDelete}` });
        } else {
          res.send({
            Resultado: `No se localiza producto: ${req.params.idDelete}`,
          });
        }
      }
    );

    routerCarrito.put("/reactcarrito/:idPut", urlencodedParser, (req, res) => {
      console.log("entra a put de carrito");
      if (c.updateByID(parseInt(req.params.idPut), req.body, carritosIni)) {
        res.send({ CarritoActualizado: `${req.params.idPut}` });
      } else {
        res.send({ Resultado: `No se localiza producto: ${req.params.idPut}` });
      }
    });

    break;
  case "mongo":
    routerProductos.get("/productos/react", async (req, res) => {
      try {
        dynamicProds = await productsMongo.getAll();
        console.log("Verirfico contenido de dynamicProds:", dynamicProds);
        res.send({ express: dynamicProds });
      } catch (error) {
        console.log(error);
      }
    });

    routerProductos.get("/productos/:id", async (req, res) => {
      try {
        const idP = req.params.id;
        console.log("Imprimo idP Mongo", req.params.id);
        dynamicProds = await productsMongo.getById(idP);
        res.send({ ResultadoID: dynamicProds });
      } catch (error) {
        console.log(error);
      }
    });

    routerProductos.post("/productos/", async (req, res) => {
      try {
        console.log("Entro a POST Mongo");
        dynamicProds = await productsMongo.save(req.body);
        console.log("Imprimp dynamicProds POST Mongo", dynamicProds);
        res.send({ ProductoAñadido: dynamicProds });
      } catch (error) {
        console.log(error);
      }
    });

    routerProductos.delete(
      "/productos/:idDelete",
      urlencodedParser,
      async (req, res) => {
        console.log("entra a delete", req.params.idDelete);
        dynamicProds = await productsMongo.deleteById(req.params.idDelete);
        res.send({ ProductoBorradoID: `${req.params.idDelete}` });
      }
    );

    routerProductos.put(
      "/productos/:idPut",
      urlencodedParser,
      async (req, res) => {
        console.log("Entra a put de Mongo");
        dynamicProds = await productsMongo.updateByID(
          req.params.idPut,
          req.body
        );
        res.send({ ProductoActualizado: `${req.params.idPut}` });
      }
    );

    break;
}

app.use("/api/", routerProductos);
app.use("/api/", routerCarrito);

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on("error", (err) => console.log("Error en el servidor:", err));
