import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Loading } from "./components/Loading";

export const AuthContext = createContext('');

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user)=> {
            setUser(user);
        })
    }, []);
    if (loading) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
    )

}