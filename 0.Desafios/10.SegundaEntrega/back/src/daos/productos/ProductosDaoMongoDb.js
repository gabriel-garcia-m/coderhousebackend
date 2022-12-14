const ContProdMongo = require('../../contenedores/contProdMongo')

class ProductosDaoMongoDb extends ContProdMongo {
  constructor(uriDB) {
    super(uriDB);
  }
}

module.exports = ProductosDaoMongoDb;
