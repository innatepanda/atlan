import React, { useState, useContext, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';

const UserDataContext = createContext();

export const usercontext = () => useContext( DataDataContext );


export default function UserData({children}){
    const [current_user, setCurrentUser] = useState(0)
    const [current_user_role, setCurrentUserRole] = useState("editor")

    const all_users = [
        {
            name: "Andrew Snow",
            role: "editor"
        },
        {
            name: "Noah Kahan",
            role: "viewer"
        }
    ]

    const changeUser = (index) =>{
        setCurrentUser(index)
        setCurrentUserRole(all_users[index].role)
    }

    const value = {
        current_user,
        changeUser,
        current_user_role,
        all_users
    }
    return (
        <UserDataContext.Provider value = { value } >
            { children }
        </UserDataContext.Provider>
    )
}