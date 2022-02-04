import { Container, FormGroup, TextField, Typography } from "@mui/material";

import styled from "styled-components";

import { doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { SaveButton } from "../../ToDoList/buttons/SaveButton";
import { CancelButton } from "../../ToDoList/buttons/CancelButton";
import { TextFieldReadOnly } from "../text-field/TextFieldReadOnly";
import { TextFieldView } from "../text-field/TextFieldView";
import { useContext } from "react";
import { UserData } from "../../../UserData/UserData";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../../../userContext/UserContext";
const DetailsContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px;
  padding: 20px;
  background-color: grey;
  // justify-content: space-between;
`;

export const UserDetails = ({ userData, db }) => {
  // const auth = getAuth();
  // onAuthStateChanged(auth, user => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     setUid(user.uid);
  //     setUserEmail(user.email);
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  const userDetailsData = useContext(UserData);

  useEffect(() => {
    console.log(userDetailsData);
    if (userDetailsData) {
      setUid(userDetailsData.uid);
      setUserEmail(userDetailsData.email);
      console.log(uid);
      console.log(userEmail);
    }
  });

  const [uid, setUid] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [save, setSave] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskId] = useState("");
  const [takenValue, setTakenValue] = useState("");
  const [telephoneEdit, setTelephoneEdit] = useState(false);
  const [streetEdit, setStreetEdit] = useState(false);
  const [houseNumberEdit, setHouseNumberEdit] = useState(false);
  const [cityEdit, setCityEdit] = useState(false);
  const [postCodeEdit, setPostCodeEdit] = useState(false);

  const handleClickEdit = e => {
    handleClickCancel();
    console.log(e);
    userData.map(element => {
      switch (e.target.value) {
        case element.telephone:
          setTakenValue(element.telephone);
          setTelephoneEdit(true);
          break;
        case element.street:
          setTakenValue(element.street);
          setStreetEdit(true);
          break;
        case element.houseNumber:
          setTakenValue(element.houseNumber);
          setHouseNumberEdit(true);
          break;
        case element.city:
          setTakenValue(element.city);
          setCityEdit(true);
          break;
        case element.postcode:
          setTakenValue(element.postcode);
          setPostCodeEdit(true);
          break;
      }
    });
    if (!e.target.value) {
      setTakenValue("d");
    }
  };
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
    setIsEditing(true);
    setTaskId("");
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
    setTaskId("");
  };
  const handleOnClick = e => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      handleClickCancel();
    }
  };

  return (
    <Container onClick={handleOnClick}>
      <FormGroup sx={{ margin: "10px", padding: "10px" }}>
        {userData.map(
          element =>
            element.email === userEmail && (
              <>
                <Typography variant="h5">Dane użytkownika</Typography>
                <DetailsContainer>
                  <TextFieldReadOnly value={element.name} label={"Imię"} />

                  <TextFieldReadOnly
                    value={element.surname}
                    label={"Nazwisko"}
                  />

                  <TextFieldReadOnly value={userEmail} label={"Email"} />
                  {!telephoneEdit && (
                    <TextFieldView
                      label="Nr telefonu"
                      value={element.telephone}
                      handleClick={handleClickEditTelephone}
                    />
                  )}
                  {telephoneEdit && (
                    <>
                      <TextField
                        autoFocus
                        fullWidth
                        label="Nr telefonu"
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
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
                      <TextField
                        autoFocus
                        fullWidth
                        label="Ulica"
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
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
                      <TextField
                        autoFocus
                        fullWidth
                        label="Nr dom/mieszkania"
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
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
                      <TextField
                        autoFocus
                        fullWidth
                        label="Miejscowość"
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
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
                      <TextField
                        autoFocus
                        fullWidth
                        label="Kod pocztowy"
                        value={takenValue}
                        onChange={e => setTakenValue(e.target.value)}
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
