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

  async create (data, params) {
    // create a group and connect the user and the group
    if (data?.user_id === undefined) {
      throw new Error('No user_id is specified')
    }
    if (data?.restaurant_id === undefined) {
      throw new Error('No restaurant_id is specified')
    }
    if (data?.datetime === undefined) {
      throw new Error('No datetime is specified')
    }
    try {
      const created = await super.create({
        owner_id: data.user_id,
        restaurant_id: data.restaurant_id,
        datetime: data.datetime
      }, params)

      const { Model } = this.options
      await Model('users_groups').insert({
        user_id: data.user_id,
        group_id: created.id
      })
      return created
    } catch (err) {
      throw err
    }

  }
};
