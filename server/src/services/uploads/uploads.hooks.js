const { authenticate } = require('@feathersjs/authentication').hooks;
const convertToUploadModelShape = require('../../hooks/convertToUploadModelShape')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ convertToUploadModelShape ],
    update: [],
    patch: [ convertToUploadModelShape ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ function (context) {
      console.log('error hook', context)
    } ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
