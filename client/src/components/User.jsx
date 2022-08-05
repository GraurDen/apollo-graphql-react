import React, { useState, useEffect } from 'react';
import { GET_USER } from '../query/users';
import { useQuery } from '@apollo/client'


const User = ({users}) => {

    const [id, setUserId] = useState(0);
    const [newUserData, setNewUserData] = useState()
    const user = useQuery(GET_USER, {
        variables: { id: id }
    })

    console.log('%cUser.jsx line:14 users', 'color: white; background-color: #007acc;', users);

    const onSubmitForm2 = (e) => {
        e.preventDefault()
        setNewUserData(user?.data?.getUser)
        setUserId(0)
    }

    const handleChange = (e) => {
        setUserId(e.currentTarget.value)
    }

    useEffect(() => {
        if (!users.includes(newUserData)) {
            setNewUserData(null)
        }
    
        console.log('newUserData', newUserData);
    }, [users])
    
    
    return(
        <div className='user'>
            <form onSubmit={onSubmitForm2}>
                <input 
                    type='text' 
                    value={id} 
                    onChange={handleChange} 
                    placeholder='id' 
                />

                <div className='buttons'>
                    <button 
                        type='submit'>
                        получить пользователя
                    </button>
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
    )
}

export default User;