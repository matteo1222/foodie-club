const { Service } = require('feathers-knex');

exports.DesiredRestaurant = class DesiredRestaurant extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'desired_restaurant'
    });
  }

  async find (params) {
    if (params.query?.getRestaurants) {
      // find all restaurants a user desires
      if (params.query?.user_id === undefined) {
        throw new Error('No user_id is specified')
      }
      const { Model } = this.options
      const desiredRestaurantsOfSingleUser = await Model('desired_restaurant')
        .join('restaurants', 'restaurant_id', '=', 'restaurants.id')
        .select(
          'desired_restaurant.id',
          'desired_restaurant.user_id',
          'desired_restaurant.restaurant_id',
          'restaurants.name',
          'restaurants.image_source'
        )
      
      return desiredRestaurantsOfSingleUser
    }

    return super.find(params)
  }

  async create (data, params) {
    // create a restaurants a user desires
    if (params.query?.getRestaurants) {
      if (data?.user_id === undefined) {
        throw new Error('No user_id is specified')
      }
      if (data?.restaurant_id === undefined) {
        throw new Error('No restaurant_id is specified')
      }
      try {
        const created = await super.create(data)
        const { Model } = this.options
        const createdDesiredRestaurant = await Model('restaurants')
          .where({id: data.restaurant_id})
          .first()
      
        return {
          id: created.id,
          user_id: created.user_id,
          restaurant_id: created.restaurant_id,
          data: createdDesiredRestaurant
        }
      } catch (err) {
        throw err
      }
    }

    return super.create(data, params)
  }

  async remove (id, params) {
    // find all restaurants a user desires
    if (params.query?.getRestaurants) {
      if (id === undefined) {
        throw new Error('No id is specified')
      }

      try {
        const removed = await super.remove(id)
        const { Model } = this.options
        const removedDesiredRestaurant = await Model('restaurants')
          .where(
            'id',
            Model('desired_restaurant').select('restaurant_id').where('id', id)
          )
          .first()
      
        return {
          id: removed.id,
          user_id: removed.user_id,
          restaurant_id: removed.restaurant_id,
          data: removedDesiredRestaurant
        }
      } catch (err) {
        throw err
      }
    }

    return super.remove(id, params)
  }
};
