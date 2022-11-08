const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Homepage';
    },
  },
  {
    method: '*',
    path: '/',
    handler: (request, h) => {
      return 'Halaman tidak dapat diakses dengan method tersebut';
    },
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, h) => {
      return 'About page';
    },
  },
  {
    method: '*',
    path: '/about',
    handler: (request, h) => {
      return 'Halaman tidak dapat diakses dengan method';
    },
  },
  /* Path Parameter & Query Parameter */
  {
    method: 'GET',
    path: '/about/users/{username?}',
    handler: (request, h) => {
      const { username = 'Anonymous' } = request.params;
      const { lang } = request.query;

      if (lang === 'id') {
        return `Halaman profil ${username}`;
      }

      return `${username} Profile Page`;
    },
  },
  /* Payload Request */
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const { username, password } = request.payload;
      console.log(username, password);
      return `Welcome ${username}`;
    },
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return h.response('<h1>Halaman Tidak Ditemukan!</h1>').code(404);
    },
  },
];

module.exports = routes;
