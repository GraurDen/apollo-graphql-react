import './App.css';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_USERS } from './query/users';
import { CREATE_USER, DELETE_USER } from './mutation/mutation'
import Form from './components/Form';
import Users from './components/Users';
import User from './components/User';


function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const [newUser] = useMutation(CREATE_USER)
  const [newAllUsers] = useMutation(DELETE_USER)
  const [users, setUsers] = useState([])


  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])


  // delete user
  const deleteUser = (userId) => {
    newAllUsers({
      variables: {
        id: userId
      }
    }).then(() => {
      refetch();
    })
  }

  // add user
  const createUser = (age, username) => {
    newUser({
      variables: {
        input: {
          age, username
        }
      }
    })
  }


  // get all users
  const getUsers = () => {
    refetch();
  }

  if (loading) {
    return <h1>Loading ...</h1>
  }

  return (
    <div className="App">
      <Form 
        createUser={createUser}
        getUsers={getUsers}
      />

      {/* users */}
      <Users 
        users={users}
        deleteUser={deleteUser}
      />

      {/* user */}
      <User users={users}/>
    </div>
  );
}

export default App;
