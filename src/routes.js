const Joi = require('joi');
const {
  addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler,
} = require('./handler');

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
        failAction: (request, h, err) => h.response(
          {
            status: 400,
            message: `Gagal menambahkan buku. Mohon isi kolom ${err.details[0].path}`,
          },
        ).takeover(),
      },
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
    options: {
      validate: {
        payload: bookSchema,
        failAction: (request, h, err) => h.response(
          {
            status: 400,
            message: `Gagal memperbarui buku. Mohon isi kolom ${err.details[0].path}`,
          },
        ).takeover(),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
