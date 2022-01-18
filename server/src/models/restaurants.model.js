/* eslint-disable no-console */

// restaurants-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
const foodTypes = require('../constants/foodTypes')

module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'restaurants';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('price');
        table.enu('type', foodTypes);
        table.float('rating');
        table.string('image_source');
        table.timestamp('created_at').defaultTo(new Date.now().getTime())
        table.timestamp('updated_at').defaultTo(new Date.now().getTime())
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  // TODO: Add access control

  return db;
};
