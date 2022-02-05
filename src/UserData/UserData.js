import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserData = createContext(null);

export const UserDataProvider = ({ children }) => {
  const [userDataDetails, setUserDataDetails] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserDataDetails({ uid: user.uid, email: user.email });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <UserData.Provider value={userDataDetails}>{children}</UserData.Provider>
  );
};
