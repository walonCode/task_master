"use client"

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthProp {
    user: User[];
    userId: string;
    login: (username: string, password: string) => Promise<void>;
    signup: (fullname: string, username: string, email: string, password: string, jobTitle:string) => Promise<void>;
    isAuthenticated:boolean,
    logout:()=>void
}

interface User {
    fullname: string;
    email: string;
    username: string;
    _id:string;
    jobTitle:string
}



const AuthContext = createContext<AuthProp | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const login = async (username: string, password: string): Promise<void> => {
        try {
            const loginUser = {
                username,
                password,
            };
            const res = await axios.post('api/users/login', loginUser)
            setIsAuthenticated(!isAuthenticated)
            console.log(res.data);
            setUser(res.data.userResponse)
            setUserId(res.data.userResponse._id)
        } catch (error: unknown) {
            console.log('error occurred', error);
        }
    };

    const logout = async() => {
        await  axios.get('api/users/logout')
        setIsAuthenticated(!isAuthenticated)
    }

    useEffect(()=>{
        const chechAuth = async() => {
            try{
                const res = await axios.get('api/users/me',{withCredentials:true})
                if(res.data.isAuthenticated){
                    setIsAuthenticated(true);
                    setUser(res.data.user)
                }else{
                    setIsAuthenticated(false)
                }
            }catch(error:unknown){
                console.log('error ocuured',error)
                setIsAuthenticated(false)
            }
        }
        chechAuth()
    },[])

    const signup = async (fullname: string, username: string, email: string, password: string,jobTitle:string): Promise<void> => {
        try {
            const signupUser = {
                fullname,
                username,
                email,
                password,
                jobTitle
            };
            const res = await axios.post('/api/users/signup', signupUser); // Use generics here
            console.log(res.data);
        } catch (error: unknown) {
            console.log('error occurred', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            login,
            user,
            userId,
            signup,
            isAuthenticated,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
