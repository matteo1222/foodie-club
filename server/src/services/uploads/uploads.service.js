// Initializes the `uploads` service on path `/uploads`
const { Uploads } = require('./uploads.class');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');
const { authenticate } = require('@feathersjs/express');
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = 'public/profile_images'
    fs.mkdir(dir, err => cb(err, dir))
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${req.user.id}-${file.originalname}`)
})
const upload = multer({
  storage,
  limits: {
    fieldSize: 1e+8,
    fileSize: 1e+7
  }
})

const setQueryAuthentication = (req, res, next) => {
  const { access_token } = req.query;
  
  if (access_token) {
    req.authentication = {
      strategy: 'jwt',
      accessToken: access_token
    }
  }
  next()
}

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  // TODO: handle file upload security, or use a third party system
  app.use(
    '/uploads',
    setQueryAuthentication,
    authenticate('jwt'),
    upload.single('file'),
    (req, _res, next) => {
      const { method } = req
      if (method === 'POST' || method === 'PATCH') {
        req.feathers.file = req.file
      }
      next()
    },
    new Uploads(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
