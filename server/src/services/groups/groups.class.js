const { Service } = require('feathers-knex');

exports.Groups = class Groups extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'groups'
    });
  }

  async find (params) {
    if (params.query?.isMine) {
      // find all groups of a user
      if (params.query?.user_id === undefined) {
        throw new Error('No user_id is specified')
      }
      const { Model } = this.options
      const groups = await Model('desired_restaurant')
        .join('restaurants', 'restaurant_id', '=', 'restaurants.id')
        .select(
          'desired_restaurant.id',
          'desired_restaurant.user_id',
          'desired_restaurant.restaurant_id',
          'restaurants.name',
          'restaurants.image_source'
        )
      
      return groups
    }

    if (params.query?.isMine === false) {
      // find all groups that the user is not in
      if (params.query?.user_id === undefined) {
        throw new Error('No user_id is specified')
      }
      const { Model } = this.options
      const groups = await Model('desired_restaurant')
        .join('restaurants', 'restaurant_id', '=', 'restaurants.id')
        .select(
          'desired_restaurant.id',
          'desired_restaurant.user_id',
          'desired_restaurant.restaurant_id',
          'restaurants.name',
          'restaurants.image_source'
        )
      
      return groups
    }

    return super.find(params)
  }
};
