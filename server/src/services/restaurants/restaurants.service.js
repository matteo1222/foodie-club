// Initializes the `restaurants` service on path `/restaurants`
const { Restaurants } = require('./restaurants.class');
const createModel = require('../../models/restaurants.model');
const hooks = require('./restaurants.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/restaurants', new Restaurants(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('restaurants');

  service.hooks(hooks);
};
