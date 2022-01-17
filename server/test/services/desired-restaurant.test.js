const app = require('../../src/app');

describe('\'desiredRestaurant\' service', () => {
  it('registered the service', () => {
    const service = app.service('desired-restaurant');
    expect(service).toBeTruthy();
  });
});
