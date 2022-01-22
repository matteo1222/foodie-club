const users = require('./users/users.service.js');
const restaurants = require('./restaurants/restaurants.service.js');
const desiredRestaurant = require('./desired-restaurant/desired-restaurant.service.js');
const groups = require('./groups/groups.service.js');
const messages = require('./messages/messages.service.js');
const uploads = require('./uploads/uploads.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(restaurants);
  app.configure(desiredRestaurant);
  app.configure(groups);
  app.configure(messages);
  app.configure(uploads);
};
