import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import styled from "styled-components";
import { Icon } from "@mui/material";

const FormContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
`;

const AddTaskForm = ({ task, setTask, handleSubmit }) => {
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
