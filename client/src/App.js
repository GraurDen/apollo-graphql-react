import './App.css';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from './query/users';

function App() {
  //const [data, loading, error] = useQuery(GET_ALL_USERS)
  const [users, setUsers] = useState([])

  console.log(GET_ALL_USERS);

  // useEffect(() => {

  // }, [data])

  return (
    <div className="App">
      <form>
        <input type='text' />
        <input type='number' />
        <div className='buttons'>
          <button>создать</button>
          <button>получить</button>
        </div>
      </form>
      <div className='users'>
        {/* <table>
          {
            users.map(user => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.age}</td>
                </tr>
              )
            })
          }
        </table> */}
      </div>
    </div>
  );
}

export default App;
