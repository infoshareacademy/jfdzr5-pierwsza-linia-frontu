import {createContext, useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (userData) => {
            setUser(userData);
        })
    }, []);

    return <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
}