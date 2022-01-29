import { Routes, Route } from "react-router-dom";
import { Home } from "./home/home";
import ToDoList from "../components/ToDoList/ToDoList";
import Calendar from "../components/Calendar/Calendar";
import { SignIn, SignUp } from "../components/LoginForm";

export const Content = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tasks" element={<ToDoList />} />
    <Route path="/calendar" element={<Calendar />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
  </Routes>
);
