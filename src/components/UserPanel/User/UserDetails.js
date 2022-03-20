import { Button, Container, FormGroup, Typography } from "@mui/material";

import styled from "styled-components";

import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { SaveButton } from "../../../common/buttons/SaveButton";
import { CancelButton } from "../../../common/buttons/CancelButton";
import { TextFieldReadOnly } from "../text-field/TextFieldReadOnly";
import { TextFieldView } from "../text-field/TextFieldView";
import { EditTextField } from "../text-field/EditTextField";
import { useContext } from "react";
import { UserContext } from "../../../userContext/UserContext";
import { UserAvatar } from "./UserAvatar";
import { Theme } from "../../../common/theme/theme";

import { ChangePassword } from "./ChangePasword";
import { DeleteUser } from "./DeleteUser";

const DetailsContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px;
  padding: 20px;
  background-color: ${Theme.palette.backgroundColor.main};
`;
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UserDetails = ({ userData, db }) => {
  const { userUID, userEmail } = useContext(UserContext);
  //get user uid and email from use context
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (userUID) {
      setEmail(userEmail);
    }
  }, [userEmail, userUID]);

  const [takenValue, setTakenValue] = useState("");
  const [telephoneEdit, setTelephoneEdit] = useState(false);
  const [streetEdit, setStreetEdit] = useState(false);
  const [houseNumberEdit, setHouseNumberEdit] = useState(false);
  const [cityEdit, setCityEdit] = useState(false);
  const [postCodeEdit, setPostCodeEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleClickEditTelephone = e => {
    handleClickCancel();
    userData.map(element => {
      switch (e.target.value) {
        case element.telephone:
          setTakenValue(element.telephone);
          setTelephoneEdit(true);
          break;
      }
    });
  };
  const handleClickEditStreet = e => {
    handleClickCancel();
    userData.map(element => {
      switch (e.target.value) {
        case element.street:
          setTakenValue(element.street);
          setStreetEdit(true);
          break;
      }
    });
  };
  const handleClickEditHouseNumber = e => {
    handleClickCancel();
    userData.map(element => {
      switch (e.target.value) {
        case element.houseNumber:
          setTakenValue(element.houseNumber);
          setHouseNumberEdit(true);
          break;
      }
    });
  };
  const handleClickEditCity = e => {
    handleClickCancel();
    userData.map(element => {
      switch (e.target.value) {
        case element.city:
          setTakenValue(element.city);
          setCityEdit(true);
          break;
      }
    });
  };
  const handleClickEditPostcode = e => {
    handleClickCancel();
    userData.map(element => {
      switch (e.target.value) {
        case element.postcode:
          setTakenValue(element.postcode);
          setPostCodeEdit(true);
          break;
      }
    });
  };

  const handleClickSave = async id => {
    const docRef = doc(db, "user-data", id);
    switch (true) {
      case telephoneEdit:
        await updateDoc(docRef, {
          telephone: takenValue,
        });
        setTelephoneEdit(false);
        break;
      case streetEdit:
        await updateDoc(docRef, {
          street: takenValue,
        });
        setStreetEdit(false);
        break;
      case houseNumberEdit:
        await updateDoc(docRef, {
          houseNumber: takenValue,
        });
        setHouseNumberEdit(false);
        break;
      case cityEdit:
        await updateDoc(docRef, {
          city: takenValue,
        });
        setCityEdit(false);
        break;
      case postCodeEdit:
        await updateDoc(docRef, {
          postcode: takenValue,
        });
        setPostCodeEdit(false);
        break;
    }
  };

  const handleClickCancel = id => {
    setTelephoneEdit(false);
    setStreetEdit(false);
    setHouseNumberEdit(false);
    setCityEdit(false);
    setPostCodeEdit(false);
  };
  const handleOnClick = e => {
    // e.preventDefault();
    // if (e.target === e.currentTarget) {
    //   handleClickCancel();
    // }
  };
  const handleChangePassword = () => {
    setEditPassword(true);
    setNewPassword("");
  };

  const handleAskToDelete = () => {
    setDeleteUser(true);
    setOpen(true);
  };
  const [open, setOpen] = useState(false);

  return (
    <Container onClick={handleOnClick}>
      <FormGroup sx={{ margin: "10px", padding: "10px" }}>
        {userData.map(
          element =>
            element.email === email && (
              <>
                <AvatarContainer>
                  <UserAvatar />
                </AvatarContainer>
                <Typography variant="h5">Dane użytkownika</Typography>
                <DetailsContainer>
                  <TextFieldReadOnly value={element.name} label={"Imię"} />
                  <TextFieldReadOnly
                    value={element.surname}
                    label={"Nazwisko"}
                  />

                  <TextFieldReadOnly value={email} label={"Email"} />
                  {!editPassword ? (
                    <Button
                      onClick={handleChangePassword}
                      sx={{
                        background: Theme.palette.secondary.main,
                        color: Theme.palette.secondary.contrastText,
                        border: `2px solid ${Theme.palette.secondary.main}`,
                        borderRadius: "0px",
                        transition: "all",
                        transitionDuration: "0.3s",
                        ":hover": {
                          color: Theme.palette.primary.main,
                          background: Theme.palette.primary.contrastText,
                          border: `2px solid ${Theme.palette.primary.contrastText}`,
                          borderRadius: "0",
                        },
                      }}>
                      Zmień hasło
                    </Button>
                  ) : (
                    <ChangePassword
                      setEditPassword={setEditPassword}
                      userEmail={userEmail}
                      newPassword={newPassword}
                      setNewPassword={setNewPassword}
                    />
                  )}

                  <Button
                    onClick={handleAskToDelete}
                    sx={{
                      background: Theme.palette.secondary.main,
                      color: Theme.palette.secondary.contrastText,
                      border: `2px solid ${Theme.palette.secondary.main}`,
                      borderRadius: "0px",
                      transition: "all",
                      transitionDuration: "0.3s",
                      ":hover": {
                        color: Theme.palette.primary.main,
                        background: Theme.palette.primary.contrastText,
                        border: `2px solid ${Theme.palette.primary.contrastText}`,
                        borderRadius: "0",
                      },
                    }}>
                    Usuń konto
                  </Button>
                  {deleteUser && (
                    <DeleteUser
                      setDeleteUser={setDeleteUser}
                      open={open}
                      setOpen={setOpen}
                      userEmail={userEmail}
                    />
                  )}

                  {!telephoneEdit && (
                    <TextFieldView
                      label="Nr telefonu"
                      value={element.telephone}
                      handleClick={handleClickEditTelephone}
                    />
                  )}
                  {telephoneEdit && (
                    <>
                      <EditTextField
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
                        label="Nr telefonu"
                      />
                      <SaveButton
                        handleClickSave={handleClickSave}
                        id={element.id}
                      />
                      <CancelButton
                        handleClickCancel={handleClickCancel}
                        id={element.id}
                      />
                    </>
                  )}
                </DetailsContainer>
                <Typography variant="h5">Adres</Typography>
                <DetailsContainer style={{ flexWrap: "wrap" }}>
                  {!streetEdit && (
                    <TextFieldView
                      label="Ulica"
                      value={element.street}
                      handleClick={handleClickEditStreet}
                    />
                  )}
                  {streetEdit && (
                    <>
                      <EditTextField
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
                        label="Ulica"
                      />

                      <SaveButton
                        handleClickSave={handleClickSave}
                        id={element.id}
                      />
                      <CancelButton
                        handleClickCancel={handleClickCancel}
                        id={element.id}
                      />
                    </>
                  )}
                  {!houseNumberEdit && (
                    <TextFieldView
                      label="Nr dom/mieszkania"
                      value={element.houseNumber}
                      handleClick={handleClickEditHouseNumber}
                    />
                  )}
                  {houseNumberEdit && (
                    <>
                      <EditTextField
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
                        label="Nr domu/mieszkania"
                      />

                      <SaveButton
                        handleClickSave={handleClickSave}
                        id={element.id}
                      />
                      <CancelButton
                        handleClickCancel={handleClickCancel}
                        id={element.id}
                      />
                    </>
                  )}
                  {!cityEdit && (
                    <TextFieldView
                      label="Miejscowość"
                      value={element.city}
                      handleClick={handleClickEditCity}
                    />
                  )}
                  {cityEdit && (
                    <>
                      <EditTextField
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
                        label="Miejscowość"
                      />

                      <SaveButton
                        handleClickSave={handleClickSave}
                        id={element.id}
                      />
                      <CancelButton
                        handleClickCancel={handleClickCancel}
                        id={element.id}
                      />
                    </>
                  )}
                  {!postCodeEdit && (
                    <TextFieldView
                      label="Kod pocztowy"
                      value={element.postcode}
                      handleClick={handleClickEditPostcode}
                    />
                  )}
                  {postCodeEdit && (
                    <>
                      <EditTextField
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
                        label="Kod pocztowy"
                      />

                      <SaveButton
                        handleClickSave={handleClickSave}
                        id={element.id}
                      />
                      <CancelButton
                        handleClickCancel={handleClickCancel}
                        id={element.id}
                      />
                    </>
                  )}
                </DetailsContainer>
              </>
            )
        )}
      </FormGroup>
    </Container>
  );
};
