/* eslint-disable no-console */

// groups-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'groups';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id').primary()
        table.datetime('datetime').notNullable()
        table
          .integer('owner_id')
          .references('id')
          .inTable('users')
        table
          .integer('restaurant_id')
          .references('id')
          .inTable('restaurants')
        table.timestamp('created_at').defaultTo(db.fn.now())
        table.timestamp('updated_at').defaultTo(db.fn.now())
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  const relationTableName = 'users_groups'
  db.schema.hasTable(relationTableName).then(exists => {
    if(!exists) {
      db.schema.createTable(relationTableName, table => {
        table.increments('id').primary()
        table
          .integer('user_id')
          .references('id')
          .inTable('users')
        table
          .integer('group_id')
          .references('id')
          .inTable('groups')
        table.unique(['user_id', 'group_id'])
        table.timestamp('created_at').defaultTo(db.fn.now())
      })
        .then(() => console.log(`Created ${relationTableName} table`))
        .catch(e => console.error(`Error creating ${relationTableName} table`, e));
    }
  });
  

  return db;
};
