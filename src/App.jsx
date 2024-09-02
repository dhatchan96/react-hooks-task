import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: 'Office Task 1', description: 'This is the description for my first task', status: 'Not Completed' },
    { id: 2, name: 'Office Task 2', description: 'This is the description for my second task', status: 'Completed' }
  ]);

  const [newTodo, setNewTodo] = useState({ name: '', description: '', status: 'Not Completed' });
  const [filter, setFilter] = useState('all');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const addTodo = () => {
    if (newTodo.name && newTodo.description) {
      setTodos([...todos, { ...newTodo, id: todos.length + 1 }]);
      setNewTodo({ name: '', description: '', status: 'Not Completed' });
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const openEditForm = (todo) => {
    setCurrentTodo(todo);
    setEditModalVisible(true);
  };

  const closeEditForm = () => {
    setEditModalVisible(false);
  };

  const handleSaveChanges = () => {
    const updatedTodos = todos.map(todo =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setTodos(updatedTodos);
    closeEditForm();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    return todo.status === (filter === 'completed' ? 'Completed' : 'Not Completed');
  });

  return (
    <div className="container">
      <h2> Dhatchan's My Todo</h2>
      <div className="input-section">
        <input
          type="text"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
          placeholder="Todo Name"
        />
        <input
          type="text"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          placeholder="Todo Description"
        />
        <button className="add-btn" onClick={addTodo}>Add Todo</button>
      </div>

      <div className="filter-section">
        <label>Status Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>
      </div>

      <div className="todo-list">
        <h3>My Todos</h3>
        {filteredTodos.map(todo => (
          <div key={todo.id} className="todo-item">
            <p><strong>Name:</strong> {todo.name}</p>
            <p><strong>Description:</strong> {todo.description}</p>
            <label>Status: </label>
            <select value={todo.status} disabled>
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="buttons">
              <button className="edit-btn" onClick={() => openEditForm(todo)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeEditForm}>&times;</span>
            <h3>Edit Todo</h3>
            <input
              type="text"
              value={currentTodo.name}
              onChange={(e) => setCurrentTodo({ ...currentTodo, name: e.target.value })}
              placeholder="Todo Name"
            />
            <input
              type="text"
              value={currentTodo.description}
              onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value })}
              placeholder="Todo Description"
            />
            <label>Status: </label>
            <select
              value={currentTodo.status}
              onChange={(e) => setCurrentTodo({ ...currentTodo, status: e.target.value })}
            >
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
