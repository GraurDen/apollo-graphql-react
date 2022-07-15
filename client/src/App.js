import './App.css';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_USERS, GET_USER } from './query/users';
import { CREATE_USER, DELETE_USER } from './mutation/mutation'

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const [userId, setUserId] = useState(0);
  const [id, setId] = useState(0);
  const [newUserData, setNewUserData] = useState()
  const user = useQuery(GET_USER, {
    variables: { id: id }
  })
  const [newUser] = useMutation(CREATE_USER)
  const [newAllUsers] = useMutation(DELETE_USER)
  const [users, setUsers] = useState([])
  const [username, setUserName] = useState('')
  const [age, setUserAge] = useState(0)

  //delete users
  const [idForDelete, setIdForDelete] = useState(0)


  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }

    if (user) {
      setNewUserData(user?.data?.getUser)
    }

  }, [data, user])


  // delete user
  const deleteUser = (userId) => {
    newAllUsers({
      variables: {
        id: userId
      }
    }).then(({ data }) => {
      refetch();
    })
  }

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

  const handleChange = (e) => {
    setUserId(e.currentTarget.value)
  }

  if (loading) {
    return <h1>Loading ...</h1>
  }

  const onSubmitForm2 = (e) => {
    e.preventDefault()
    setId(userId)
    setUserId(0)
  }
  const onSubmitForm3 = (e) => {
    e.preventDefault()

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

      {/* users */}
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
                    <td><button onClick={() => deleteUser(user.id)}>del</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      {/* user */}
      <div className='user'>
        <form onSubmit={onSubmitForm2}>
          <input type='text' value={userId} onChange={handleChange} placeholder='id' />
          <div className='buttons'>
            <button type='submit' >получить пользователя</button>
          </div>
        </form>
        <div className='users'>
          <table border='1'>
            <tbody>
              {
                <tr>
                  <td>id: <b>{newUserData?.id}</b></td>
                  <td>name: <b>{newUserData?.username}</b></td>
                  <td>age: <b>{newUserData?.age}</b></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
