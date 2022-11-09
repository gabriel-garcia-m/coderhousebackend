const express = require('express');
const Productos = require("./apiProd.js");
let prodsIni = [
];
const p = new Productos(prodsIni);
let prodTemp = p.getAll(prodsIni);
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', '../views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('tabla',{ prodTemp });
  console.log('Imprimo p', prodTemp)
});

app.post('/productos', (req, res) => {

  p.save(req.body,prodTemp);
  console.log(p);
  res.redirect('/');
});

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});