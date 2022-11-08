const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const id = nanoid(16);
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const readStatus = () => {
    if (pageCount === readPage) {
      return true;
    }
    return false;
  };
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readStatus(),
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  }).code(501);
};

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name) {
    return h.response({
      status: 'success',
      data: {
        books: books.filter((book) => {
          const bookName = book.name.toLowerCase();
          return bookName.includes(name.toLowerCase());
        }).map((result) => ({ id: result.id, name: result.name, publisher: result.publisher })),
      },
    });
  }

  if (Number(reading) === 0) {
    return h.response({
      status: 'success',
      data: {
        books: books.filter((book) => book.reading === false)
          .map((result) => ({ id: result.id, name: result.name, publisher: result.publisher })),
      },
    });
  } if (Number(reading) === 1) {
    return h.response({
      status: 'success',
      data: {
        books: books.filter((book) => book.reading === true)
          .map((result) => ({ id: result.id, name: result.name, publisher: result.publisher })),
      },
    });
  }

  if (Number(finished) === 0) {
    return h.response({
      status: 'success',
      data: {
        books: books.filter((book) => book.finished === false)
          .map((result) => ({ id: result.id, name: result.name, publisher: result.publisher })),
      },
    });
  } if (Number(finished) === 1) {
    return h.response({
      status: 'success',
      data: {
        books: books.filter((book) => book.finished === true)
          .map((result) => ({ id: result.id, name: result.name, publisher: result.publisher })),
      },
    });
  }

  return h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher })),
    },
  });
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const targetBook = books.filter((book) => book.id === id)[0];

  if (!targetBook) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book: targetBook,
    },
  }).code(200);
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const readStatus = () => {
    if (pageCount === readPage) {
      return true;
    }
    return false;
  };
  const updatedAt = new Date().toISOString();

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readStatus(),
    reading,
    updatedAt,
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  books.splice(index, 1);
  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
