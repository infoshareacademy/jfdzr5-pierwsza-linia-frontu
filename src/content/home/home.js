import { HomeLogin } from "./HomeLogin";
import { Intro } from "./Intro";
import { useContext } from "react";
import { UserContext } from "../../userContext/UserContext";
import { firestore } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
export const Home = () => {
  const { user } = useContext(UserContext);

  const usersRef = collection(firestore, "user-data");
  const tasksRef = collection(firestore, "to-do-list");
  const eventsRef = collection(firestore, "calendar");

  const [usersNumber, setUsersNumber] = useState();
  const [tasksNumber, setTasksNumber] = useState();
  const [eventsNumber, setEventsNumber] = useState();

  let usersCounter = 0;
  let tasksCounter = 0;
  let eventsCounter = 0;

  const fetchUsers = () => {
    onSnapshot(usersRef, doc => {
      doc.docs.forEach(element => {
        usersCounter += 1;
      });
      setUsersNumber(usersCounter);
    });
  };
  const fetchTasks = () => {
    onSnapshot(tasksRef, doc => {
      doc.docs.forEach(element => {
        tasksCounter += 1;
      });
      setTasksNumber(tasksCounter);
    });
  };
  const fetchEvents = () => {
    onSnapshot(eventsRef, doc => {
      doc.docs.forEach(element => {
        eventsCounter += 1;
      });
      setEventsNumber(eventsCounter);
    });
  };
  fetchUsers();
  fetchTasks();
  fetchEvents();

  return user ? (
    <HomeLogin usersNumber={usersNumber} tasksNumber={tasksNumber} eventsNumber={eventsNumber} />
  ) : (
    <Intro usersNumber={usersNumber} tasksNumber={tasksNumber} eventsNumber={eventsNumber} />
  );
};
