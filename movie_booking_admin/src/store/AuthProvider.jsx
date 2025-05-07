import { createContext, useState } from "react";

export const AuthStore=createContext({});
export function AuthProvider({children}){


    const  userInfo=JSON.parse(localStorage.getItem("userInfo"))||{}
    const [userData,setUserData]=useState(userInfo);


    return <AuthStore.Provider value={{userData,setUserData}}>{children}</AuthStore.Provider>

}