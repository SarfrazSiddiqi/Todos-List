import React, {useState,useEffect } from 'react'
import ListItems from './ListItems'
import './List.css'

const Local_Storage_Key = 'react-app-acciojob-todos';

function List() {
  
  // All todo
   const [todos, setTodos] = useState([]);

     // getting data from local storage
   useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(Local_Storage_Key));
    if(storedTodos) setTodos(storedTodos)
  }, []);

   // storing data in local storage
   useEffect(() => {
    if(todos.length>0)
    localStorage.setItem(Local_Storage_Key, JSON.stringify(todos))
   }, [todos])

    // Delete items in the list
      function deleteItem(id) {
         setTodos(todos.filter((todo) => todo.id!==id));
      }
    //  todo input
    const [todoInput, setTodoInput] = useState('')

    const handleInput  =(e)=>{
      setTodoInput(e.target.value)
    }

    const handleSubmit =(e)=>{
      if(todoInput ==='') return;
      setTodos([
        {
        id: Math.random() * 10000,
        text: todoInput
      },
        ...todos
      ]);
      setTodoInput(" ");
    }

  return (
    <div className='List-container'>
      {/* Dynamic rendering--data driven rendering 
      if dataitem updated then it gets automatically updated */}

       {/* Todo Form */}
       <div className='todo-input-form'>
       <input type='text' placeholder ='Add a todo' onChange={handleInput} value={todoInput}/>
            <button onClick={handleSubmit}>Add Todo</button>
            </div>

             {/* Rendering the list */}
             {
        todos.map(
          todo => <ListItems text={todo.text} id={todo.id} deleteItem={deleteItem} />
        )
      }
    </div>
  )
}

export default List