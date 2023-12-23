import React, { useState } from 'react';
import './style.css';

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([
    { id: 1, text: "Learn typescript", completed: false },
    { id: 2, text: "Focus on your studies", completed: false }
  ]);
  const [input, setInput] = useState('');

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClick = () => {
    if (input.trim() !== '') {
      const newTodo: Item = { id: Date.now(), text: input, completed: false };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  return (
    <div className="main-container">
      <h1>Todo List</h1>

      {todos.map((todo) => (
        <div className="list-container" key={todo.id}>
          <label
            onClick={() => handleToggle(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none"
            }}
          >
            {todo.text}
          </label>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
      <input
        type="text"
        placeholder="Add your to-do item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button value="addBtn" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};
