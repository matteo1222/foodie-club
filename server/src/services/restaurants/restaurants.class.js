const axios = require('axios');
const { Service } = require('feathers-knex');

exports.Restaurants = class Restaurants extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'restaurants'
    });
  }

  async setup(app, path){
    await super.setup && super.setup(app, path)
    this.app = app
  }

  async find (params) {
    if (params.query?.mode) {
      if (params.query.mode === 'popular') {
        // query recommendation engine
        const { Model } = this.options

        const recommendationUrl = `http://${this.app.get('recommendationUrl')}/recommendations?mode=popular`

        try {
          const res = await axios.get(recommendationUrl)
          const indices = res.data
          const restaurants = await Model('restaurants')
            .select()
            .whereIn('id', indices)
          return restaurants
        } catch (err) {
          throw err
        }
      }

      if (params.query.mode === 'similar') {
        if (!params.query.id) {
          throw new Error('No restaurant id specified using similar mode')
        }
        // query recommendation engine to find similar restaurants
        const { Model } = this.options
        const recommendationUrl = `http://${this.app.get('recommendationUrl')}/recommendations?mode=similar&id=${params.query.id}`

        try {
          const res = await axios.get(recommendationUrl)
          const indices = res.data.map(el => Number(el[0]))
          const restaurants = await Model('restaurants')
            .select()
            .whereIn('id', indices)
          return restaurants
        } catch (err) {
          throw err
        }
      }
    }

    return super.find(params)
  }
};
