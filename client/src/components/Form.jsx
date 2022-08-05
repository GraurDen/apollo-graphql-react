import React,{useState} from "react";


const Form = ({createUser, getUsers}) => {
    const [username, setUserName] = useState('')
    const [age, setUserAge] = useState(0)

    const onSubmitForm = (e) => {
        e.preventDefault()
    }

    const onCreateUser = (e) => {
        e.preventDefault()
        createUser(age, username)
        setUserName('')
        setUserAge(0)
    }

    const onGetUser = (e) => {
        e.preventDefault();
        getUsers();
    }
    

    return(
        <form onSubmit={onSubmitForm}>
            <input 
                type='text' 
                value={username} 
                onChange={(e) => setUserName(e.target.value)} 
                placeholder='username' 
            />
            <input 
                type='number' 
                value={age} 
                onChange={(e) => setUserAge(e.target.valueAsNumber)} 
                placeholder='age' 
            />

            
            <div className='buttons'>
                <button 
                    onClick={onCreateUser}>
                    создать
                </button>
                <button 
                    onClick={onGetUser}>
                    получить
                </button>
            </div>
        </form>
    )
}

export default Form;