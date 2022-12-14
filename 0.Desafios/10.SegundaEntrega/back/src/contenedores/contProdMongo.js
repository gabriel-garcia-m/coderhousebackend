const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prodSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  codigo: { type: String, required: true },
  imagenurl: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number },
  timestamp: { type: String, required: true },
});

class ContProdMongo {
  constructor(uriDB) {
    this.uriDB = uriDB;
    
  }

  productsDao = mongoose.model("productos", prodSchema);
  async connect() {
    // console.log('Imp this.uriDB:', `${this.uriDB}`)
    await mongoose.connect("mongodb://localhost:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("DB conectada (connect())");
  }
  async disconnect() {
    await mongoose.disconnect();
  }

  getAll() {
    try {
      this.connect();
      const allProds = this.productsDao.find({});
      console.log("Verifico query en getAll", allProds);
      return allProds;
    } catch (error) {
      console.log(error);
    }
  }

  getById(idR) {
    try {
      this.connect();
      const prod = this.productsDao.find({ _id: idR });
      return prod;
    } catch (error) {
      console.log(error);
    }
  }

  save(prod) {
    try {
      this.connect();
      console.log("Validando prod de save Mongo", prod);
      const newProd = this.productsDao.insertMany(prod);
      console.log("Validando newProd de save Mongo", newProd);
      return newProd;
    } catch (error) {}
  }

  deleteById(idR) {
    try {
      this.connect();
      console.log("Producto a borrar con ID", idR);
      const delProd = this.productsDao.deleteOne({ _id: idR });
      console.log("Validando borrado", delProd);
      return delProd;
    } catch (error) {
      console.log(error);
    }
  }

  updateByID(idR, uProd) {
    try {
      this.connect();
      console.log("Producto a actualizar", idR);
      const updateProd = this.productsDao.updateOne({ _id: idR }, uProd);
      return updateProd;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContProdMongo;
