import { useEffect, useState } from "react";
import AddTaskForm from "./Tasks/AddTaskForm";
import NewTask from "./Tasks/NewTask";

import Container from "@mui/material/Container";
import { Theme } from "../../common/theme/theme";
import { Typography } from "@mui/material";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const ToDoList = () => {
  const db = getFirestore();
  // const q = query(collection(db, "to-do-list"));
  // console.log(q);

  // const unsubscribe = onSnapshot(q, querySnapshot => {
  //   const tasks = [];
  //   querySnapshot.forEach(doc => {
  //     tasks.push(doc.data().task);
  //     tasks.push(doc.data().isChecked);
  //     console.log(doc.data());
  //   });

  const colRef = collection(db, "to-do-list");
  const colRefOrdered = query(colRef, orderBy("timeStamp"));
  // getDocs(colRef).then(snapshot => {
  //   console.log(snapshot);
  // });
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  useEffect(() => {
    fetchData();
  }, []);
  // const fetchData = async doc => {
  //   doc = await getDocs(colRef);
  //   let data = [];
  //   doc.docs.forEach(element => {
  //     data.push({ ...element.data(), id: element.id });
  //   });
  //   setTasks(data);
  // };
  const fetchData = () => {
    onSnapshot(colRefOrdered, doc => {
      let data = [];
      doc.docs.forEach(element => {
        data.push({ ...element.data(), id: element.id });
      });
      setTasks(data);
    });
  };

  // const [tasks, setTasks] = useState([
  //   { task: "zadanie 1", isChecked: false, id: 1 },
  //   { task: "zadanie 2", isChecked: true, id: 2 },
  //   { task: "zadanie 3", isChecked: true, id: 3 },
  //   { task: "zadanie 4", isChecked: true, id: 4 },
  // ]);
  const [task, setTask] = useState("");

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     // const newTask = {
  //     //   task: task,
  //     //   isCheckd: false,
  //     //   id: Math.floor(Math.random() * 1000),
  //     // };
  //     // tasks.push(newTask);
  //     // setTask("");
  // addDoc(colRef, {
  //   task: "",
  //   isChecked: false
  // })

  //   };

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
          <AddTaskForm task={task} setTask={setTask} colRef={colRef} />
          <NewTask tasks={tasks} setTasks={setTasks} db={db} />
        </Container>
      </Container>
    </PageWrapper>
  );
};

export default ToDoList;
