import knexLib from 'knex';

class ClienteSql {

  constructor(config) {
    this.knex = knexLib(config);
  }
  
  createTable(tabla) {
    return this.knex.schema.dropTableIfExists(tabla)
    .finally(() => {
      return this.knex.schema.createTable(tabla, table => {
        table.increments('id_articulo').primary();
        table.string('nombre', 50).notNullable();
        table.string('codigo', 10).notNullable();
        table.string('imagen', 100).notNullable();
        table.float('precio');
        table.integer('stock');
      })
    })
  }

  insertArticles(items, tabla) {
    return this.knex(tabla).insert(items);
  }

  getArticles(tabla) {
    return this.knex(tabla).select('*');
  }

  getArticleById(id) {
    return this.knex('articulos').select('*').where('id_articulo', id);
  }

  updateArticle(id, article) {
    return this.knex('articulos').where('id_articulo', id).update(article);
  }

  deleteArticle(id) {
    return this.knex('articulos').where('id_articulo', id).del();
  }

  updateArticleStock(id, newStock) {
    return this.knex('articulos').where('id_articulo', id).update({ stock: newStock });
  }

  close() {
    return this.knex.destroy();
  }

}

export default ClienteSql;