express = require("express");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const Productos = require("./apiProd.js");
const myRoutes = require("./routes.js");
const chatHistory = require("./storageChat.js");
const hC = new chatHistory();

let prodsIni = [];
const p = new Productos(prodsIni);
let prodTemp = p.getAll(prodsIni);

let contM = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(myRoutes);
app.set("view engine", "ejs");
app.set("views", "./public/views");

io.on("connection", async (socket) => {
  console.log("Nueva conexión desde >> " + socket.id);
  socket.emit("productos", prodTemp);

  socket.on("storeNewP", (data) => {
    p.save(data, prodTemp);
    io.sockets.emit("productos", prodTemp);
  });

  socket.emit("messages", contM);
  socket.on("messegesNew", (nuevoMensaje) => {
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
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
