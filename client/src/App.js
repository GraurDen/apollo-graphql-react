import './App.css';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_USERS, GET_USER } from './query/users';
import { CREATE_USER } from './mutation/mutation'

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const { data: getUser, loading: whileLoading } = useQuery(GET_USER, {
    variables: { id: 1 }
  })
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [username, setUserName] = useState('')
  const [age, setUserAge] = useState(0)

  console.log('%cApp.js line:17 getUser', 'color: #007acc;', getUser);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  // add user
  const createUser = (e) => {
    e.preventDefault()

    newUser({
      variables: {
        input: {
          age, username
        }
      }
    }).then(({ data }) => {
      setUserName('')
      setUserAge(0)
    })
  }

  // get all users
  const getUsers = (e) => {
    e.preventDefault()
    refetch();
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
  }

  if (loading) {
    return <h1>Loading ...</h1>
  }

  return (
    <div className="App">
      <form onSubmit={onSubmitForm}>
        <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} placeholder='username' />
        <input type='number' value={age} onChange={(e) => setUserAge(e.target.valueAsNumber)} placeholder='age' />
        <div className='buttons'>
          <button onClick={(e) => createUser(e)}>создать</button>
          <button onClick={(e) => getUsers(e)}>получить</button>
        </div>
      </form>
      <div className='users'>
        <table border='1'>
          <tbody>
            {
              users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>id: <b>{user.id}</b></td>
                    <td>name: <b>{user.username}</b></td>
                    <td>age: <b>{user.age}</b></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
