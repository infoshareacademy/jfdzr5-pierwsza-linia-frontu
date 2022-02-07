import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userUID, setUserUID] = useState(null);
  const [userEmail, serUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, userData => {
      setUser(userData);
      if (userData) {
        setUserUID(userData.uid);
        serUserEmail(userData.email);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userUID,
        userEmail,
      }}>
      {children}
    </UserContext.Provider>
  );
};
