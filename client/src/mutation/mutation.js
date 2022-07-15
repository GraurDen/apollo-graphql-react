import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($input: UserInput){
    createUser(input: $input){
      id, username, age
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: ID){
    deleteUser(id: $id){
      id, username, age 
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $id: ID){
    updateUser(username: $username, id: $id){
      id, username, age 
    }
  }
`