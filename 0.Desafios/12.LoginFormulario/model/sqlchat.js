import knexLib from 'knex';

class ClienteSqlChat {

  constructor(config) {
    this.knex = knexLib(config);
  }

  createTable(tabla) {
    return this.knex.schema.dropTableIfExists(tabla)
    .finally(() => {
      return this.knex.schema.createTable(tabla, table => {
        table.string('email', 50).notNullable();
        table.string('texto', 200).notNullable();
        table.string('date', 50).notNullable();
      })
    })
  }

  insertMessages(messages, tabla) {
    return this.knex(tabla).insert(messages);
  }

  getMessages(tabla) {
    return this.knex(tabla).select('*');
  }

  close() {
    return this.knex.destroy();
  }

}

export default ClienteSqlChat;