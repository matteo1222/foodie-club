/* eslint-disable no-console */

// users-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'users';
  
  db.schema.hasTable(tableName).then(exists => {
    // TODO: add text limit for messages and about me
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.text('about_me')
        table.timestamp('created_at').defaultTo(db.fn.now())
        table.timestamp('updated_at').defaultTo(db.fn.now())
        table.string('googleId');
      
        table.string('facebookId');
      
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
