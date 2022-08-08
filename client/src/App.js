import './App.css';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_USERS } from './query/users';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from "./mutation/mutation";
import Form from "./components/Form";
import Users from "./components/Users";
import User from "./components/User";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [newAllUsers] = useMutation(DELETE_USER);
  const [users, setUsers] = useState([]);
  const [editUser] = useMutation(UPDATE_USER);
  const [id, setUserId] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const onSetUserId = (id) => {
    setUserId(id);
  };

  // delete user
  const deleteUser = (userId) => {
    newAllUsers({
      variables: {
        id: userId,
      },
    }).then(() => {
      refetch();
    });
  };

  // add user
  const createUser = (age, username) => {
    newUser({
      variables: {
        input: {
          age,
          username,
        },
      },
    });
  };

  // update user
  const updateUser = (id, username, age) => {
    editUser({
      variables: {
        id,
        input: {
          username,
          age,
        },
      },
    });
  };

  // get all users
  const getUsers = () => {
    refetch();
  };

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="App">
      <Form createUser={createUser} getUsers={getUsers} />

      {/* users */}
      <Users users={users} deleteUser={deleteUser} />

      {/* user */}
      <User
        users={users}
        updateUser={updateUser}
        id={id}
        onSetUserId={onSetUserId}
      />
    </div>
  );
}

export default App;
