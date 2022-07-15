const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors')
const schema = require('./schema')
const app = express();
app.use(cors())

let users = [
  { id: 1, username: 'Hello', age: 20 }
];

const createUser = (input) => {
  const id = Date.now();
  return {
    id, ...input
  }
}

const resolver = {
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

  updateUser: ({ id, username }) => {
    users = users.map((item) => {
      return item.id == id ? { ...item, username } : { ...item }
    })
    return users;
  }
}


app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: resolver
}))


app.listen(5000, () => console.log('server started on port 5000'))