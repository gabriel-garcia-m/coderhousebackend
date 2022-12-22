
// const express =  require('express')
import express from 'express';
const myRoutes = express.Router()


myRoutes.get('/', (req, res) => {
          res.render('index');
    })

    myRoutes.get('/api/productos-test', (req, res) => {
        res.render('index2');
  })


export default myRoutes