import { useState, useEffect } from "react";
import "./ToDoList.css";
const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { task: "zadanie 1", isCheckd: false, id: 1 },
    { task: "zadanie 2", isCheckd: false, id: 2 },
    { task: "zadanie 3", isCheckd: false, id: 3 },
    { task: "zadanie 4", isCheckd: false, id: 4 },
  ]);
  // const [tasks, setTasks] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState("");
  let [newValue, setNewValue] = useState("d");
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

  const handleClickEdit = id => {
    setIsEditing(true);
    setNewValue(id);
    // setNewValue(task);
    console.log("edit");
    console.log(tasks);
  };
  const handleClickDelete = id => {
    const newArray = tasks.filter(element => element.id !== id);
    setTasks(newArray);
  };
  const handleOnChange = id => {
    setNewValue();
  };
  return (
    <div className="to-do-list">
      <h2 className="to-do-list-title">Lista zadań</h2>
      <hr />
      <form className="form-to-add-task" onSubmit={handleSubmit}>
        <div className="add-task-container">
          <label>
            <input
              className="adding-task"
              type="text"
              placeholder="wpisz zadanie"
              onChange={e => {
                setTask(e.target.value);
              }}
              value={task}
              required
            />
          </label>
          <button className="to-do-buttons" type="submit">
            dodaj
          </button>
        </div>
      </form>
      <div className="list-of-task-container">
        {tasks.map(element => (
          <div className="added-task" key={element.id}>
            {element.id !== newValue && <p>{element.task}</p>}
            {isEditing && element.id === newValue && (
              <input
                type="text"
                value={element.task}
                onChange={e => {
                  setNewValue(e.target.value);
                }}></input>
            )}
            <label>
              <input type="checkbox" name="" id="" />
            </label>
            <button
              className="to-do-buttons"
              onClick={() => handleClickEdit(element.id)}>
              {isEditing ? "Zapisz" : "Edytuj"}
            </button>
            <button
              className="to-do-buttons"
              onClick={() => handleClickDelete(element.id)}>
              Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
