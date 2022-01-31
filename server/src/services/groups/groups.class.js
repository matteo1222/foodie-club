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

      if (params.query?.isUpcoming === true) {
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
          .where('datetime', '>', Model.fn.now())
          .innerJoin('restaurants', 'restaurants.id', 'groups.restaurant_id')
          .innerJoin('users_groups', 'groups.id', 'users_groups.group_id')
          // .whereNot('users_groups.user_id', params.query.user_id)
          .innerJoin('users', 'users.id', 'users_groups.user_id')
          .groupBy('groups.datetime')
          .groupBy('groups.id')
          .groupBy('restaurant')
          .groupBy('price')
          .groupBy('image_source')
          .orderBy('datetime', 'asc')
          .limit(6)
        return groups
      }

      else if (params.query?.isPopular === true) {
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
          // .whereNot('users_groups.user_id', params.query.user_id)
          .innerJoin('users', 'users.id', 'users_groups.user_id')
          .groupBy('groups.datetime')
          .groupBy('groups.id')
          .groupBy('restaurant')
          .groupBy('price')
          .groupBy('image_source')
          .count('users.id as usersCount')
          .orderBy('usersCount', 'desc')
          .limit(6)
        return groups
      }

      else if (params.query?.type) {
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
          .where('restaurants.type', params.query.type)
          .modify((queryBuilder) => {
            if (params.query?.price) {
              queryBuilder.whereIn('restaurants.price', params.query?.price)
            }
            // TODO: add groupRange filter
            // if (params.query?.groupRange
            //     && Number.isInteger(params.query?.groupRange[0])
            //     && Number.isInteger(params.query?.groupRange[1])
            //   ) {
            //   queryBuilder
            //     .count('users.id as usersCount')
            //     .havingBetween('userCount', params.query?.groupRange)
            // }
          })
          .innerJoin('restaurants', 'restaurants.id', 'groups.restaurant_id')
          .innerJoin('users_groups', 'groups.id', 'users_groups.group_id')
          // .whereNot('users_groups.user_id', params.query.user_id)
          .innerJoin('users', 'users.id', 'users_groups.user_id')
          .groupBy('groups.datetime')
          .groupBy('groups.id')
          .groupBy('restaurant')
          .groupBy('price')
          .groupBy('image_source')
        
        return groups
      }

      else {
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
          // .whereNot('users_groups.user_id', params.query.user_id)
          .innerJoin('users', 'users.id', 'users_groups.user_id')
          .groupBy('groups.datetime')
          .groupBy('groups.id')
          .groupBy('restaurant')
          .groupBy('price')
          .groupBy('image_source')
        
        return groups
      }
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
        await Model('users_groups').insert({
          user_id: data.user_id,
          group_id: data.group_id
        })
        return {
          user_id: data.user_id,
          group_id: data.group_id
        }
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
