import Container from "@mui/material/Container";

import { Theme } from "../../../common/theme/theme";
import { OutlinedInput } from "@mui/material";

import styled from "styled-components";
import { addDoc } from "firebase/firestore";
import { AddButton } from "../buttons/AddButton";
import { useContext } from "react";
import { UserContext } from "../../../userContext/UserContext";
import { useState, useEffect } from "react";

const FormContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddTaskForm = ({ task, setTask, colRef }) => {
  //get user uid and email from use context
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const { userUID, userEmail } = useContext(UserContext);

  useEffect(() => {
    if (userUID) {
      setUid(userUID);
      setEmail(userEmail);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    addDoc(colRef, {
      task: task,
      isChecked: false,
      timeStamp: +new Date(),
      uid: uid,
    });
    setTask("");
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <OutlinedInput
            autoFocus
            sx={{
              height: "3rem",
              backgroundColor: Theme.palette.secondary.contrastText,
              ":hover": { backgroundColor: Theme.palette.primary.contrastText },
            }}
            type="text"
            placeholder="wpisz zadanie"
            onChange={e => {
              setTask(e.target.value);
            }}
            value={task}
            required
          />
          <AddButton />
        </Container>
      </form>
    </FormContainer>
  );
};

export default AddTaskForm;
