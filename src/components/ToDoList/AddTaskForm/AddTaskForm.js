const AddTaskForm = ({ tasks, task, setTask }) => {
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

  return (
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
  );
};

export default AddTaskForm;
