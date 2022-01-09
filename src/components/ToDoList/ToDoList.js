import { useState } from "react";
import "./ToDoList.css";
const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { task: "zadanie 1", isCheckd: false, id: 1 },
    { task: "zadanie 2", isCheckd: false, id: 2 },
    { task: "zadanie 3", isCheckd: false, id: 3 },
    { task: "zadanie 4", isCheckd: false, id: 4 },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [task, setTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("btn clik");
    console.log(task);
    setIsAdding(true);
    setTask("");
  };

  return (
    <div className="to-do-list">
      <p>Lista zadań</p>
      <form className="form-to-add-task" onSubmit={handleSubmit}>
        <div className="add-task-container">
          <label>
            <input
              className="adding-task"
              type="text"
              placeholder="wpisz zadanie"
              onChange={(e) => {
                setTask(e.target.value);
              }}
              value={task}
              required
            />
          </label>
          <button type="submit">dodaj</button>
        </div>
      </form>
      <div className="list-of-task-container"></div>
      {tasks.map((element) => (
        <div className="added-task" key={element.id}>
          <p>{element.task}</p>
          <label>
            <input type="checkbox" name="" id="" />
          </label>
          <button>Usuń</button>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
