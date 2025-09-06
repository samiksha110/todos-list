import './App.css';
import { useState } from 'react';

function App() {
  let [todolist, setTodosList] = useState([]);
  let [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

  // Save Todo
  let saveTodosList = (event) => {
    event.preventDefault();
    let toname = event.target.toname.value.trim();

    if (toname && !todolist.some(todo => todo.text === toname)) {
      let finalDolist = [...todolist, { text: toname, completed: false }];
      setTodosList(finalDolist);
    } else if (todolist.some(todo => todo.text === toname)) {
      alert("Todo Name Already Exists...");
    }

    event.target.reset(); // clear input
  };

  // Filtered Todos
  let filteredTodos = todolist.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  let list = filteredTodos.map((todo, index) => {
    return (
      <TodoListItems
        key={index}
        indexNumber={index}
        todo={todo}
        todolist={todolist}
        setTodosList={setTodosList}
      />
    );
  });

  return (
    <div className="App">
      <h1>Todos List</h1>
      <form onSubmit={saveTodosList}>
        <input type="text" name="toname" placeholder="Enter a todo..." />
        <button>Save</button>
      </form>

      {/* Filter Buttons */}
      <div className="filters">
        <button 
          className={filter === "all" ? "active" : ""} 
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button 
          className={filter === "active" ? "active" : ""} 
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button 
          className={filter === "completed" ? "active" : ""} 
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

// ----------------- Todo List Item -----------------
function TodoListItems({ todo, indexNumber, todolist, setTodosList }) {
 
  // Toggle Complete
  let toggleComplete = () => {
    let updatedList = todolist.map((item, i) =>
      i === indexNumber ? { ...item, completed: !item.completed } : item
    );
    setTodosList(updatedList);
  };

  // Delete Item
  let deleteItem = (e) => {
    e.stopPropagation();   // prevent toggling complete when clicking delete
    let finalList = todolist.filter((_, i) => i !== indexNumber);
    setTodosList(finalList);
  };

  return (
    <li
      onClick={toggleComplete}
      className={todo.completed ? "completetodo" : ""}
    >
      {todo.text}
      <span onClick={deleteItem}>&times;</span>
    </li>
  );
}
