import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todos, setTodos] = useState([])
  const LOCAL_STORAGE_KEY = 'todoApp.todos'
  
  const todoNameRef = useRef()
  
  // Retrieve Todos on load
  useEffect( () => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // Store New Todos
  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  
  // Add New Todo
  function handleAddTodo(e) {
    const name = todoNameRef.current.value

    if (name === '') return

    setTodos( prevTodos => {
      return [...prevTodos, {id: uuidv4(), name:name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  // Toggle Todo checkboxes
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find( todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Clear Complete Todos
  function handleClearTodos() {
    const newTodos = todos.filter( todo => !todo.complete)
    setTodos(newTodos)
  }


  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo} >Add Todo</button>
      <button onClick={handleClearTodos} >Clear Complete</button>
      <div>{todos.filter( todo => !todo.complete).length} Left Todos</div>
    </>
  )
}

export default App;
