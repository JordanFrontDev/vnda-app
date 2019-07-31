import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { User } from '../interfaces/index';


interface UserContextProps {
    users: User[]
    isLoading: boolean
    onDeleteUser(id: number): void
    getUsers(): void
}


export const UserContext = createContext<UserContextProps>({
    users: [],
    isLoading: false,
    onDeleteUser: null,
    getUsers: null
})

export function UserProvider (props){
    const [isLoading, setIsloading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        setIsloading(true);
        try {
            const fetch = await axios('http://localhost:3000/users');
            const usersData = fetch.data;
            setUsers(usersData);
        } catch (e) {
            console.log(e);
        }
        setIsloading(false);
    }

    const onDeleteUser = (id: number): void => {
        axios.delete(`http://localhost:3000/users/${id}`);
        const filteredUsers = users.filter((user) => {
            return user.id !== id;
        })
        setUsers(filteredUsers);
    }

    return (
        <UserContext.Provider value={{ users, isLoading, onDeleteUser, getUsers }}>
            {props.children}
        </UserContext.Provider>
    );

};
