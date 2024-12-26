import { getCurrentUser } from '@/lib/appwrite';
import { createContext, useContext, useState, useEffect } from 'react';


const GlobalContext = createContext({});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser
    }, []);

    return (
        <GlobalContext.Provider value={{

        }}>
            {children}
        </GlobalContext.Provider>
    )
};