
import Productos from "./apiProd.js";
import chatHistory from "./storageChat.js";
import { normalize, schema,denormalize } from 'normalizr';
import util from "util";

import { options } from "./options/mariaDB.js";
import { config } from "./options/sqlite.js";
import myRoutes from "./routes.js";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const hC = new chatHistory();
let prodsIni = [];
const p = new Productos(prodsIni);

let contM = [];

//Normalizr
const aut = new schema.Entity("authors",{},{ idAttribute: 'correo' });
const posteo = new schema.Entity("mensajes", {
  author: aut,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(myRoutes);
app.set("view engine", "ejs");
app.set("views", "./public/views");

function print(obj) {
  console.log(util.inspect(obj, false, null, true));
}

io.on("connection", async (socket) => {
  console.log("Nueva conexión desde >> " + socket.id);
  socket.emit("productosFkr", JSON.parse(JSON.stringify(p.getAllFaker(5))));
  // console.log('imprimo faker product', p.getAllFaker(5))

  socket.emit("messages", contM);
  socket.on("messegesNew", (nuevoMensaje) => {
    contM.push(nuevoMensaje);
    io.sockets.emit("messages", contM);
  });

  const message = await hC.retrieveMessage();
  const normalizedData = normalize(message, posteo);
  console.log("-----------   Normalizado:");
  print(normalizedData);
  console.log("original", JSON.stringify(message).length);
  console.log("normalized", JSON.stringify(normalizedData).length);
  socket.emit("messages", message);

  socket.on("messegesNew", async (data) => {
    console.log('Verifico data en socket de messagesNew', data)
    await hC.storeM(data);

    const message2 = await hC.retrieveMessage();
    io.sockets.emit("messages", message2);
  });
});

const port = 8080;
const server = httpServer.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
