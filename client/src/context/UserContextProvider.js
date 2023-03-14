import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import jwt_decode from 'jwt-decode';

export const userContext = React.createContext()

// decode the jwt token, extract the user_id and user_email
const initialState = localStorage.getItem('myJwt')
? {
    userId: jwt_decode(localStorage.getItem('myJwt')).userId,
    email: jwt_decode(localStorage.getItem('myJwt')).email,
  }
: {}

const userReducer = (state, action) =>{
    switch(action.type){
      case "LOGIN":
        return {
          userId: action.payload.userId,
          email: action.payload.email,
        };
      case "REGISTER":
        return {
          userId: action.payload.userId,
          email: action.payload.email,
        }
      case "LOGOUT":
        return {};
      default:
        return state;
    }
}

export default function UserContextProvider({children}) {

  const [state, dispatch] = useReducer(userReducer, initialState)

  const value = {
    userInfo: state,
    login: (email, password) =>{
      dispatch({type: 'LOGIN', payload: {email, password}})
    },
    register: ( email, password) =>{
      dispatch({type: 'REGISTER', payload: {email, password}})
    },
    logout: () =>{
      dispatch({type: 'LOGOUT'})
    }
  }

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}
