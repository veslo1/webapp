var email = 'test@example.com';
var password = 'password123';

var authToken = 'some.auth.token';

module.exports = {
  method: 'POST',
  url: 'http://localhost:3000/sessions',
  data: {
    email: email,
    password: password
  },
  response: {
    user: {
      id: 5,
      email: email,
      first_name: 'Robert',
      last_name: 'Palmer'
    },
    auth_token: authToken
  }
};
