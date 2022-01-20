import { Routes, Route } from "react-router-dom";
import { Home } from "./home";
import ToDoList from "../components/ToDoList/ToDoList";

export const Content = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tasks" element={<ToDoList />} />
  </Routes>
);
