const { Service } = require('feathers-knex');

exports.Restaurants = class Restaurants extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'restaurants'
    });
  }
};
