module.exports = {
  method: 'GET',
  url: /http:\/\/localhost:3000\/invites\//,
  response: function(method, url, data, headers) {
    var inviteHashId = '2a2db2e9-1e17-44a8-8e27-dcf107480ecf';

    var invite = {
      email: 'samantha.jones@example.com',
      first_name: 'Samantha',
      last_name: 'Jones',
      hash_id: inviteHashId
    };

    return [200, { invite: invite }, {}];
  }
};
