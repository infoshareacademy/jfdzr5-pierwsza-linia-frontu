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
  const userDataDetails = useContext(UserData);
  // console.log(userUID);

  useEffect(() => {
    // setTest(userUID);
    if (userDataDetails) {
      setUid(userDataDetails.uid);
      setUserEmail(userDataDetails.email);
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
      <FormGroup key={uid} sx={{ margin: "10px", padding: "10px" }}>
        {userData.map(
          element =>
            element.uid === uid && (
              <>
                <Typography variant="h5">Dane użytkownika</Typography>
                <DetailsContainer>
                  <TextFieldReadOnly
                    key={element.name}
                    value={element.name}
                    label={"Imię"}
                  />

                  <TextFieldReadOnly
                    key={element.surname}
                    value={element.surname}
                    label={"Nazwisko"}
                  />

                  <TextFieldReadOnly
                    key={userEmail}
                    value={userEmail}
                    label={"Email"}
                  />
                  {!telephoneEdit && (
                    <TextFieldView
                      key={element.telephone}
                      label="Nr telefonu"
                      value={element.telephone || ""}
                      handleClick={handleClickEdit}
                    />
                  )}
                  {telephoneEdit && (
                    <>
                      <TextField
                        key={element.telephone}
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
                      value={element.street || ""}
                      handleClick={handleClickEdit}
                    />
                  )}
                  {streetEdit && (
                    <>
                      <TextField
                        key={element.street}
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
                      key={element.houseNumber}
                      label="Nr dom/mieszkania"
                      value={element.houseNumber || ""}
                      handleClick={handleClickEdit}
                    />
                  )}
                  {houseNumberEdit && (
                    <>
                      <TextField
                        key={element.houseNumber}
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
                      key={element.city}
                      label="Miejscowość"
                      value={element.city || ""}
                      handleClick={handleClickEdit}
                    />
                  )}
                  {cityEdit && (
                    <>
                      <TextField
                        key={element.city}
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
                      key={element.postcode}
                      label="Kod pocztowy"
                      value={element.postcode || ""}
                      handleClick={handleClickEdit}
                    />
                  )}
                  {postCodeEdit && (
                    <>
                      <TextField
                        key={element.postcode}
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
