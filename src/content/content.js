import { Routes, Route } from "react-router-dom";
import { Home } from "./home/home";
import ToDoList from "../components/ToDoList/ToDoList";
import Calendar from "../components/Calendar/Calendar";
import { SignIn, SignUp } from "../components/LoginForm";
import { Budget } from "../components/Budget/Budget";
import { UserPanel } from "../components/UserPanel/UserPanel";
export const Content = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tasks" element={<ToDoList />} />
    <Route path="/calendar" element={<Calendar />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/budget" element={<Budget />} />
    <Route path="/user-panel" element={<UserPanel />} />
  </Routes>
);
