// const dotenv = require('dotenv');
dotenv.config();

// const express = require('express');
import express from "express";
// const cookieParser = require('cookie-parser');
import cookieParser from 'parser'
// const session = require('express-session');
import session from 'express-session'

// const MongoStore = require('connect-mongo');
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };


const mongoURlString = `mongodb+srv://panchito:panchito123@cluster0.hbxl81g.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({ mongoUrl: mongoURlString, 
      mongoOptions: advancedOptions}),
    secret: 'coder19dic',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.send('Servidor Express Ok!');
});

let contador = 0;
app.get('/sin-session', (req, res) => {
  res.send({ contador: ++contador});
});

app.get('/con-session', (req, res) => {
  if(req.session.contador){
    req.session.contador++;
    res.send(`Hola! visitaste la pagina ${req.session.contador} veces`);
  } else {
    req.session.contador = 1;
    res.send(`Hola! Te damos la bienvenida`);
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err){
      res.json({ error: 'olvidar', body: err })
    } else {
      res.send(`Hasta luego`)
    }
  })
});

app.get('/info', (req, res) => {
  console.log('----- req.session -----\n');
  console.log(req.session);
  console.log('----------\n');

  console.log('----- req.sessionID -----\n');
  console.log(req.sessionID);
  console.log('----------\n');

  console.log('----- req.Cookies -----\n');
  console.log(req.cookies);
  console.log('----------\n');

  console.log('----- req.sessionStore -----\n');
  console.log(req.sessionStore);
  console.log('----------\n');

  res.send('Info en consola');
});

app.get('/info-web', (req, res) => {
  res.send({ session: req.session,
            sessionID: req.sessionID,
            cookies: req.cookies
            });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));