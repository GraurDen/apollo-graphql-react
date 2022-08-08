import React, { useState, useEffect } from 'react';
import { GET_USER } from '../query/users';
import { useQuery } from "@apollo/client";

const User = ({ users, updateUser, onSetUserId, id }) => {
  const [newUserData, setNewUserData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [editedUserName, setEditedUserName] = useState();
  const [editedAge, setEditedAge] = useState();

  const onChangeUserName = (e) => {
    setEditedUserName(e.currentTarget.value);
  };

  const onChangeAge = (e) => {
    const editedAgeToNumber = Number(e.currentTarget.value);
    setEditedAge(editedAgeToNumber);
  };

  const user = useQuery(GET_USER, {
    variables: { id },
  });

  const onSubmitForm2 = (e) => {
    e.preventDefault();
    setNewUserData(user?.data?.getUser);
    //setUserId(0);
    setEditMode(false);
  };

  const handleChange = (e) => {
    onSetUserId(e.currentTarget.value);
  };

  useEffect(() => {
    if (!users.includes(newUserData)) {
      setNewUserData(null);
    }
  }, [users]);

  const toggleEdit = () => {
    setEditMode(true);
  };

  const onSubmitForm = (e) => {
    updateUser(id, editedUserName, editedAge);
    setEditMode(false);
  };

  return (
    <div className="user">
      <form onSubmit={onSubmitForm2}>
        <input
          type="text"
          value={id}
          onChange={handleChange}
          placeholder="id"
        />

        <div className="buttons">
          <button type="submit">получить пользователя</button>
        </div>
      </form>
      <div className="users">
        {!editMode ? (
          <table border="1">
            <tbody>
              <tr>
                <td>
                  id: <b>{newUserData?.id}</b>
                </td>
                <td>
                  name: <b>{newUserData?.username}</b>
                </td>
                <td>
                  age: <b>{newUserData?.age}</b>
                </td>
                <td>
                  <button onClick={toggleEdit}>edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <form onSubmit={onSubmitForm}>
            <input
              placeholder={newUserData?.username}
              value={editedUserName || ""}
              type="text"
              onChange={(e) => onChangeUserName(e)}
            />
            <input
              placeholder={newUserData?.age}
              value={editedAge || ""}
              type="number"
              onChange={(e) => onChangeAge(e)}
            />
            <button onClick={onSubmitForm}>save</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default User;