/* eslint-disable no-console */

// messages-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'messages';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id').primary()
        table.string('text').notNullable()
        table
          .integer('user_id')
          .references('id')
          .inTable('users')
        table
          .integer('group_id')
          .references('id')
          .inTable('groups')
        
        table.timestamp('created_at').defaultTo(db.fn.now())
        table.timestamp('updated_at').defaultTo(db.fn.now())
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
