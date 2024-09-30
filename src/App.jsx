import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


function App() {

  const [todos, setTodos] = useState([]);
  const[todoValue, setTodoValue] = useState('');

   // Update persistData to accept newTodoList
   function persistData(newTodoList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newTodoList }));
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((_, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    const localTodos = localStorage.getItem('todos');
    if (localTodos) {
      const parsedTodos = JSON.parse(localTodos).todos;
      setTodos(parsedTodos || []); // Set to empty array if null
    }
  }, []);

  return (
    <>
      <TodoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue} />
      <TodoList todos={ todos } handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo}/>
    </>
  );
}

export default App
