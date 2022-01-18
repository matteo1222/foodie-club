/* eslint-disable no-console */

// desiredRestaurant-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'desired_restaurant';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table
          .integer('user_id')
          .references('id')
          .inTable('users')
        table
          .integer('restaurant_id')
          .references('id')
          .inTable('restaurants')
        
        table.unique(['user_id', 'restaurant_id'])
        table.timestamp('created_at').defaultTo(new Date.now().getTime())
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  

  return db;
};
