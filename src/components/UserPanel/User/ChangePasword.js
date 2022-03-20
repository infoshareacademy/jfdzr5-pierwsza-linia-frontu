import { CancelButton } from "../../ToDoList/buttons/CancelButton";
import { SaveButton } from "../../ToDoList/buttons/SaveButton";
import { PassowrdTextField } from "../text-field/PasswordTextField";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  getAuth,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";

export const ChangePassword = ({
  userEmail,
  setEditPassword,
  newPassword,
  setNewPassword,
}) => {
  const [newPassowordCheck, setNewPasswordCheck] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const auth = getAuth();

  const credential = EmailAuthProvider.credential(userEmail, currentPassword);
  const hadleSavePassword = () => {
    if (newPassowordCheck.length <= 5) {
      alert("Hasło powinno zawierać co najmniej 6 znaków");
    } else {
      if (newPassword === newPassowordCheck) {
        reauthenticateWithCredential(auth.currentUser, credential)
          .then(() => {
            const user = auth.currentUser;
            updatePassword(user, newPassword)
              .then(() => {
                // Update successful.
                console.log("password changed");
                alert("Hasło zostało zmienione");
                setEditPassword(false);
              })
              .catch(error => {
                console.log(error);
                alert("Nie udało się zmienić hasła");
                // An error ocurred
                // ...
              });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Hasła nie są takie same");
      }
    }
  };

  const handleCancelChangePassword = () => {
    setEditPassword(false);
    setNewPassword("");
    setCurrentPassword("");
  };

  return (
    <>
      <PassowrdTextField
        autoFocus
        type="password"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
        label="Aktualne hasło"
      />
      <PassowrdTextField
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        label="Nowe hasło"
      />
      <PassowrdTextField
        value={newPassowordCheck}
        onChange={e => setNewPasswordCheck(e.target.value)}
        label="Powtórz nowe hasło"
      />
      <SaveButton handleClickSave={hadleSavePassword} id="" />
      <CancelButton handleClickCancel={handleCancelChangePassword} id="" />
    </>
  );
};
