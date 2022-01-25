import { useState } from "react";
import AddTaskForm from "./Tasks/AddTaskForm";
import NewTask from "./Tasks/NewTask";

import Container from "@mui/material/Container";
import { Theme } from "../../common/theme/theme";
import { Typography } from "@mui/material";
import { PageWrapper } from "../../common/page-wrapper/index";

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { task: "zadanie 1", isChecked: false, id: 1 },
    { task: "zadanie 2", isChecked: true, id: 2 },
    { task: "zadanie 3", isChecked: true, id: 3 },
    { task: "zadanie 4", isChecked: true, id: 4 },
  ]);
  const [task, setTask] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const newTask = {
      task: task,
      isCheckd: false,
      id: Math.floor(Math.random() * 1000),
    };
    tasks.push(newTask);
    setTask("");
  };

  return (
    <PageWrapper>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: Theme.palette.secondary.main,
          margin: "0 auto",
          marginTop: "10px",
        }}>
        <Container>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Lista zadań
          </Typography>
          <AddTaskForm
            task={task}
            setTask={setTask}
            handleSubmit={handleSubmit}
          />
          <NewTask tasks={tasks} setTasks={setTasks} />
        </Container>
      </Container>
    </PageWrapper>
  );
};

export default ToDoList;
