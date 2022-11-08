const Joi = require('joi');
const { addBookHandler, getAllBookHandler } = require('./handler');

const bookSchema = Joi.object().keys({
  name: Joi.string(),
  year: Joi.number(),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number(),
  readPage: Joi.number(),
  reading: Joi.boolean(),
});

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    options: {
      validate: {
        payload: bookSchema,
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
];

module.exports = routes;
