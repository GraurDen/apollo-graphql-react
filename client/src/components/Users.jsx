import React from 'react';



const Users = ({users, deleteUser}) => {


    const onDeleteUser = (userId) => {
        deleteUser(userId)  
    }

    return (
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
                                <td>
                                    <button 
                                        onClick={() => onDeleteUser(user.id)}>
                                        del
                                    </button>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users;