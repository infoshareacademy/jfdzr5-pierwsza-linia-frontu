import { Routes, Route } from "react-router-dom";
import { Home } from "./home/home";
import ToDoList from "../components/ToDoList/ToDoList";
import Calendar from "../components/Calendar/Calendar";
import {Signup} from '../components/signup';

export const Content = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tasks" element={<ToDoList />} />
    <Route path="/calendar" element={<Calendar />} />
    <Route path="/signup" element={<Signup />} />

  </Routes>
);
