import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
      fetch("/tasks.json")
        .then((res) => res.json())
        .then((data) => {
          setTodos(data);
          console.log(data);
        })
        .catch((err) => console.error("Error loading tasks:", err));
  }, []);

  // Add a new task
  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: todos.length + 1,
      title: input,
      completed: false,
    };

    setTodos([...todos, newTask]); 
    setInput(""); 
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTodos = todos.filter((task) => task.id !== id);
    setTodos(updatedTodos);
  };

  // Mark a task as completed
  const markAsCompleted = (id) => {
    const updatedTodos = todos.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTodos(updatedTodos);
  };


  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-300 min-h-screen flex justify-center items-center">
    <div className="bg-white shadow-lg rounded-3xl p-16">
      <h1 className="text-3xl font-bold text-center mb-6">To Do List</h1>

      {/* Input Field and Add Button */}
      <div className="mb-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new task"
          className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div>
        {todos.map((task) => (
          <div
            key={task.id}
            className={`border-2 rounded-sm p-2 mb-2 ${
              task.completed ? "bg-green-100" : ""
            }`}
          >
            <p className={`mb-2 ${task.completed ? "line-through" : ""}`}>
              {task.title}
            </p>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg mr-4 hover:bg-red-700"
            >
              Delete
            </button>
            {!task.completed && (
              <button
                onClick={() => markAsCompleted(task.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Mark Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default App;
