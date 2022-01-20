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
      const groups = await Model('groups')
        .select(
          'groups.datetime',
          'groups.id',
          'restaurants.name as restaurant',
          'restaurants.price as price',
          'restaurants.image_source as image_source',
          Model.raw('ARRAY_AGG (users.name) users')
        )
        .from('groups')
        .whereIn('groups.id', 
          Model('users_groups').select('group_id').where('user_id', params.query.user_id)
        )
        .innerJoin('restaurants', 'restaurants.id', 'groups.restaurant_id')
        .innerJoin('users_groups', 'groups.id', 'users_groups.group_id')
        .innerJoin('users', 'users.id', 'users_groups.user_id')
        .groupBy('groups.datetime')
        .groupBy('groups.id')
        .groupBy('restaurant')
        .groupBy('price')
        .groupBy('image_source')
      
      return groups
    }

    if (params.query?.isMine === false) {
      // find all groups that the user is not in
      if (params.query?.user_id === undefined) {
        throw new Error('No user_id is specified')
      }
      const { Model } = this.options
      const groups = await Model('groups')
        .select(
          'groups.datetime',
          'groups.id',
          'restaurants.name as restaurant',
          'restaurants.price as price',
          'restaurants.image_source as image_source',
          Model.raw('ARRAY_AGG (users.name) users')
        )
        .from('groups')
        .whereNotIn('groups.id', 
          Model('users_groups').select('group_id').where('user_id', params.query.user_id)
        )
        .innerJoin('restaurants', 'restaurants.id', 'groups.restaurant_id')
        .innerJoin('users_groups', 'groups.id', 'users_groups.group_id')
        .whereNot('users_groups.user_id', params.query.user_id)
        .innerJoin('users', 'users.id', 'users_groups.user_id')
        .groupBy('groups.datetime')
        .groupBy('groups.id')
        .groupBy('restaurant')
        .groupBy('price')
        .groupBy('image_source')
      
      return groups
    }

    return super.find(params)
  }

  async create (data, params) {
    // create a group and connect the user and the group
    if (data?.user_id === undefined) {
      throw new Error('No user_id is specified')
    }
    // is joining a group
    if (params.query?.join) {
      if (data?.group_id === undefined) {
        throw new Error('No group_id is specified')
      }
      const { Model } = this.options

      try {
        const created = await Model('users_groups').insert({
          user_id: data.user_id,
          group_id: data.group_id
        })
        return created
      } catch (err) {
        throw err
      }
    }

    // is creating a group
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
