import { useState, useEffect } from "react";
import "./ToDoList.css";
const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { task: "zadanie 1", isCheckd: false, id: 1 },
    { task: "zadanie 2", isCheckd: true, id: 2 },
    { task: "zadanie 3", isCheckd: false, id: 3 },
    { task: "zadanie 4", isCheckd: true, id: 4 },
  ]);
  // const [tasks, setTasks] = useState([]);

  const [save, setSave] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [task, setTask] = useState("");
  let [taskID, setTaskId] = useState("");
  let [newValue2, setNewValue2] = useState("");
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
    setSave(true);
    setTaskId(id);
    tasks.forEach(element => {
      if (id === element.id) {
        setNewValue2(element.task);
      }
    });
    console.log("edit");
    console.log(tasks);
  };
  const handleClickDelete = id => {
    const newArray = tasks.filter(element => element.id !== id);
    setTasks(newArray);
  };

  const handleClickSave = id => {
    setSave(false);
    const newArray = tasks.map(element => {
      if (id === element.id) {
        return { ...element, task: newValue2 };
      }
      return element;
    });
    setIsEditing(false);
    // setTaskId(id);
    // setTasks(newArray);
    // return newArray, console.log(newArray);
    console.log(newArray);
    setTaskId("");
    setTasks(newArray);
  };
  const handleIsChecked = e => {
    // console.log("klik");
    // const newArray = tasks.map(element => {
    //   if (id === element.id) {
    //     return { ...element, task: newValue2 };
    //   }
    //   return element;
    // });
    // setIsEditing(false);
    // // setTaskId(id);
    // // setTasks(newArray);
    // // return newArray, console.log(newArray);
    // console.log(newArray);
    // setTaskId("");
    // setTasks(newArray);
    console.log(e.target.checked);
    
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
            {element.id !== taskID && <p>{element.task}</p>}
            {isEditing && element.id === taskID && (
              <input
                type="text"
                value={newValue2}
                onChange={e => {
                  setNewValue2(e.target.value);
                }}></input>
            )}
            <label>
              <input
                type="checkbox"
                defaultChecked={element.isCheckd}
                onChange={
                  handleIsChecked

                  // e => setIsChecked(e.target.checked)
                }
              />
            </label>
            {!save && (
              <button
                className="to-do-buttons"
                onClick={() => handleClickEdit(element.id)}>
                {/* {isEditing ? "Zapisz" : "Edytuj"} */}
                Edytuj
              </button>
            )}
            {save && element.id === taskID && (
              <button
                className="to-do-buttons"
                onClick={() => handleClickSave(element.id)}>
                {/* {isEditing ? "Zapisz" : "Edytuj"} */}
                Zapisz
              </button>
            )}
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
