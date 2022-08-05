
let users = [
    { id: 1, username: 'Zina', age: 23 },
    { id: 2, username: 'Arlold', age: 45 },
    { id: 3, username: 'Jack', age: 24 },
    { id: 4, username: 'Mary', age: 56 },
  ];
  


// Create User
const createUser = (input) => {
    const id = Date.now();
    return {
        id, ...input
    }
}

// Update User
const updateUser = (id, input) => {
    users = users.map((item) => {
        return item.id == id ? { ...item, ...input } : { ...item }
    })
    return {
        id, ...input
    }
}


 const resolvers = {
    // Query
    getAllUsers: () => {
      return users;
    },
  
    getUser: ({ id }) => {
      return users.find(user => user.id == id)
    },
  
    // Mutation
    createUser: ({ input }) => {
      const user = createUser(input)
      users.push(user)
      return user
    },
  
    deleteUser: ({ id }) => {
      users = users.filter(user => user.id != id)
      return users;
    },
  
    updateUser: ({ id, input }) => {
      users = updateUser(id, input)
      return users;
    }
  }
  
  module.exports = resolvers;