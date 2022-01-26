import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import styled from "styled-components";
import { Icon } from "@mui/material";
import { addDoc } from "firebase/firestore";

const FormContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
`;

const AddTaskForm = ({ task, setTask, colRef }) => {
  const handleSubmit = e => {
    e.preventDefault();
    // const newTask = {
    //   task: task,
    //   isCheckd: false,
    //   id: Math.floor(Math.random() * 1000),
    // };
    // tasks.push(newTask);
    // setTask("");
    addDoc(colRef, {
      task: task,
      isChecked: false,
      timeStamp: +new Date(),
    });
    setTask("");
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Container>
          <Input
            autoFocus
            sx={{ color: "#fff", margin: "5px" }}
            type="text"
            placeholder="wpisz zadanie"
            onChange={e => {
              setTask(e.target.value);
            }}
            value={task}
            required
          />
          <Button variant="outlined" type="submit" color="primary">
            <Icon>add</Icon>
          </Button>
        </Container>
      </form>
    </FormContainer>
  );
};

export default AddTaskForm;
