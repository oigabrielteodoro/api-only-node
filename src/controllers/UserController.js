let users = require('../mocks/users')

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((x, y) => {
      if (order === 'desc') {
        return x.id < y.id ? 1 : -1
      }

      return x.id > y.id ? 1 : -1
    })

    response.send(200, sortedUsers);
  },
  
  getUserById(request, response) {
    let { id } = request.params;
    id = Number(id);

    const user = users.find((user) => user.id === id);

    if (!user) {
      return response.send(400, { error: 'User not found' });
    } 
    
    response.send(200, user);
  },

  createUser(request, response) {
    const { name } = request.body;

    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: name,
    };

    users.push(newUser);

    response.send(200, newUser);
  },

  updateUser(request, response) {
    let { id } = request.params;
    const { name } = request.body;

    id = Number(id);

    const userExists = users.find((user) => user.id === id);

    if (!userExists) {
      response.send(400, { error: 'User not found' });
    }

    users = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
        };
      }

      return user;
    });

    response.send(200, { id, name });
  },

  deleteUser(request, response) {
    let { id } = request.params;
    id = Number(id);

    users = users.filter((user) => user.id !== id);

    response.send(200, { deleted: true });
  }
};