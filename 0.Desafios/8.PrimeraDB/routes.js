
// const express =  require('express')
import express from 'express';
const myRoutes = express.Router()


myRoutes.get('/', (req, res) => {
          res.render('index');
    })


export default myRoutes