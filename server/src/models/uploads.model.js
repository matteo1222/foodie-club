/* eslint-disable no-console */

// uploads-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'uploads';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.integer('id').unique().primary()
        table
          .integer('user_id')
          .references('id')
          .inTable('users')
          .unique()
        table.string('name').notNullable()
        table.string('path').notNullable()
        table.timestamp('created_at').defaultTo(db.fn.now())
        table.timestamp('updated_at').defaultTo(db.fn.now())
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
