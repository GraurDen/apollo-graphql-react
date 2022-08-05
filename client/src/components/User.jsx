import React, { useState, useEffect } from 'react';
import { GET_USER } from '../query/users';
import { UPDATE_USER } from '../mutation/mutation'
import { useQuery, useMutation } from '@apollo/client'


const User = ({users}) => {

    const [id, setUserId] = useState(0);
    const [newUserData, setNewUserData] = useState()
    const [editMode, setEditMode] = useState(false);
    const [updatedUserData] = useMutation(UPDATE_USER)
    const [editedUserName, setEditedUserName] = useState()
    const [editedAge, setEditedAge] = useState()
    
    const onChangeUserName = (e) => {
        setEditedUserName(e.currentTarget.value)
    }

    const onChangeAge = (e) => {
        setEditedAge(e.currentTarget.value)
    }

    const user = useQuery(GET_USER, {
        variables: { id: id }
    })

    const editedUser = ( username, age) => {
        updatedUserData({
            variables: {
                input: {
                     username, 
                     age
                }
             }           
        })
    }

    const onSubmitForm2 = (e) => {
        e.preventDefault()
        setNewUserData(user?.data?.getUser)
        setUserId(0)
        setEditMode(false)
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
    
    const toggleEdit = () => {
       setEditMode(true)
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        editedUser(editedAge, editedUserName)
        setEditMode(false)
    }

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
                    {!editMode ?  (
                        <table border='1'>
                            <tbody>                   
                                <tr>
                                    <td>id: <b>{newUserData?.id}</b></td>
                                    <td>name: <b>{newUserData?.username}</b></td>
                                    <td>age: <b>{newUserData?.age}</b></td>
                                    <td>
                                        <button 
                                            onClick={toggleEdit}>
                                            edit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        ):(
                        <form onSubmit={onSubmitForm}>     
                            <input
                                placeholder="username"
                                value={newUserData?.username}
                                type='text'
                                onChange={(e) => onChangeUserName(e)} 
                            /> 
                            <input
                                placeholder="age"
                                value={newUserData?.age}
                                type='number' 
                                onChange={onChangeAge}
                            /> 
                            <button 
                                onClick={onSubmitForm}>
                                save
                            </button>
                        </form>
                        )                    
                    }    
            </div>
        </div>
    )
}

export default User;