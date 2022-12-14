const ContProdMongo = require ('./contProdMongo.js')
const productsMongo = new ContProdMongo()

let newProd = {
  nombre: 'Modem',
  codigo: '69',
  imagenurl: 'https://cdn3.iconfinder.com/data/icons/computers/256/wifi_modem.png',
  precio: 69,
  stock: 100,
  timestamp: '13/12/2022 8:26:16 PM'
}

let dynamicProds = []

  try {
    dynamicProds = await productsMongo.save(newProd);
    console.log("Verirfico contenido de dynamicProds:", dynamicProds);
  } catch (error) {
    console.log(error);
  }


