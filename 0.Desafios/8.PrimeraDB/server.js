import Productos from "./apiProd.js";
import chatHistory from "./storageChat.js";

import { options } from "./options/mariaDB.js";
import { config } from "./options/sqlite.js";
import myRoutes from "./routes.js";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const tabla1 = "articles";
let prodsIni = [];
const p = new Productos(prodsIni, options, tabla1);
p.createObject();

const tabla2 = "messages";
const hC = new chatHistory(config, tabla2);
hC.createObject();
let contM = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(myRoutes);
app.set("view engine", "ejs");
app.set("views", "./public/views");

io.on("connection", async (socket) => {
  console.log("Nueva conexión desde >> " + socket.id);
  p.getAll(tabla1).then((arts) => {
    socket.emit("productos", JSON.parse(JSON.stringify(arts)));
  });

  socket.on("storeNewP", (data) => {
    p.save(data).then(() => {
      console.log("Fila insertada...");
      p.getAll(tabla1).then((arts) => {
        io.sockets.emit("productos", JSON.parse(JSON.stringify(arts)));
      });
    });
  });

  socket.emit("messages", contM);
  socket.on("messegesNew", (nuevoMensaje) => {
    console.log("Voy a hacer push de contM", nuevoMensaje);
    contM.push(nuevoMensaje);
    io.sockets.emit("messages", contM);
  });

  const message = await hC.retrieveMessage();
  socket.emit("messages", message);

  socket.on("messegesNew", async (data) => {
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
