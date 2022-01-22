const { Service } = require('feathers-knex');

exports.Uploads = class Uploads extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'uploads'
    });
  }
};
