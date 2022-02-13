import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userUID, setUserUID] = useState(null);
  const [userEmail, serUserEmail] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, userData => {
      setUser(userData);
      if (userData) {
        setUserUID(userData.uid);
        serUserEmail(userData.email);
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${userData.uid}`);
        getDownloadURL(storageRef)
          .then(url => {
            setAvatarUrl(url);
          })
          .catch(err => {
            setAvatarUrl(null);
          });
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userUID,
        userEmail,
        avatarUrl,
        setAvatarUrl,
      }}>
      {children}
    </UserContext.Provider>
  );
};
