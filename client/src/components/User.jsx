import React, { useState, useEffect } from 'react';
import { GET_USER } from '../query/users';
import { useQuery } from "@apollo/client";

const User = ({ users, updateUser, onSetUserId, id }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUserName, setEditedUserName] = useState();
  const [editedAge, setEditedAge] = useState();

  const user = useQuery(GET_USER, {
    variables: { id },
  });

  const userData = user?.data?.getUser;

  const [newUserData, setNewUserData] = useState(userData);

  const onChangeUserName = (e) => {
    setEditedUserName(e.currentTarget.value);
  };

  const onChangeAge = (e) => {
    const editedAgeToNumber = Number(e.currentTarget.value);
    setEditedAge(editedAgeToNumber);
  };

  const handleChange = (e) => {
    onSetUserId(e.currentTarget.value);
  };

  useEffect(() => {
    if (!users.includes(newUserData)) {
      setNewUserData(null);
    }
  }, [users]);

  console.log(
    "%cUser.jsx line:40 newUserData",
    "color: white; background-color: #007acc;",
    newUserData,
  );

  // get user data
  const onSubmitForm2 = (e) => {
    e.preventDefault();
    setNewUserData(user?.data?.getUser);
    if (newUserData) {
      console.log("get user dat");
    }
    setEditMode(false);
  };

  // edit
  const toggleEdit = () => {
    setEditMode(true);
    setEditedUserName(newUserData?.username);
    setEditedAge(newUserData?.age);
  };

  // save
  const onSubmitForm = (e) => {
    e.preventDefault();
    updateUser(id, editedUserName, editedAge);
    if (newUserData) {
      console.log("hello");
    }
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
                  id: <b>{newUserData?.id || "hello"}</b>
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
};;;;;;;;;;;;

export default User;