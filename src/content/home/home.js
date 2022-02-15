import { HomeLogin } from "./HomeLogin";
import { Intro } from "./Intro";
import { useContext } from "react";
import { UserContext } from "../../userContext/UserContext";
import { firestore } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
export const Home = () => {
  const { user } = useContext(UserContext);

  const tasksRef = collection(firestore, "to-do-list");
  const eventsRef = collection(firestore, "calendar");

  const [tasksNumber, setTasksNumber] = useState();
  const [eventsNumber, setEventsNumber] = useState();

  let tasksCounter = 0;
  let eventsCounter = 0;

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
  fetchTasks();
  fetchEvents();

  return user ? (
    <HomeLogin tasksNumber={tasksNumber} eventsNumber={eventsNumber} />
  ) : (
    <Intro tasksNumber={tasksNumber} eventsNumber={eventsNumber} />
  );
};
