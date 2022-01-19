const { Service } = require('feathers-knex');

exports.Messages = class Messages extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'messages'
    });
  }

  async find (params) {
    // find all messages in a group
    if (params.query?.group_id === undefined) {
      throw new Error('No group_id is specified')
    }
    const { Model } = this.options

    try {
      const messages = await Model('messages')
        .select('messages.text', 'created_at', 'users.name as username', 'users.id as userId')
        .where('messages.group_id', params.query.group_id)
        .innerJoin('users', 'users.id', 'messages.user_id')
      return messages
    } catch (err) {
      throw err
    }
  }

  async create (data, params) {
    // create a group and connect the user and the group
    if (data?.user_id === undefined) {
      throw new Error('No user_id is specified')
    }
    if (data?.group_id === undefined) {
      throw new Error('No group_id is specified')
    }
    if (data?.text === undefined) {
      throw new Error('No text')
    }
    // is joining a group
    const { Model } = this.options

    try {
      const created = await super.create(data, params)
      const createdMessage = await Model('messages')
        .select('messages.text', 'created_at', 'users.name as username', 'users.id as userId')
        .where('messages.id', created.id)
        .innerJoin('users', 'users.id', 'messages.user_id')
      return createdMessage
    } catch (err) {
      throw err
    }
  }
};
