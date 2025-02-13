import React, { createContext, useState } from "react";
import axios from "axios";

interface AuthProp {
    user: User[];
    userId: string;
    login: (username: string, password: string) => Promise<void>;
    signup: (fullname: string, username: string, email: string, password: string) => Promise<void>;
}

interface User {
    fullname: string;
    email: string;
    username: string;
    _id:string
}



const AuthContext = createContext<AuthProp | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User[]>([]);
    const [userId, setUserId] = useState<string>("");

    const login = async (username: string, password: string): Promise<void> => {
        try {
            const loginUser = {
                username,
                password,
            };
            const res = await axios.post('api/user/login', loginUser)
            console.log(res.data);
            setUser(res.data.userRespnse)
            setUserId(res.data.userRespnse._id)
        } catch (error: unknown) {
            console.log('error occurred', error);
        }
    };

    const signup = async (fullname: string, username: string, email: string, password: string): Promise<void> => {
        try {
            const signupUser = {
                fullname,
                username,
                email,
                password,
            };
            const res = await axios.post('/api/user/signup', signupUser); // Use generics here
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
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
