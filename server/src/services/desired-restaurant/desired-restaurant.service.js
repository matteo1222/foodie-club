// Initializes the `desiredRestaurant` service on path `/desired-restaurant`
const { DesiredRestaurant } = require('./desired-restaurant.class');
const createModel = require('../../models/desired-restaurant.model');
const hooks = require('./desired-restaurant.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/desired-restaurant', new DesiredRestaurant(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('desired-restaurant');

  service.hooks(hooks);
};
