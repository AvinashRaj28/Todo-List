import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";



function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const HandleEdit = (index) => {
    setEditingIndex(index);
    settodo(todos[index].todo);
  };

  const HandleDelete = (index) => {
    const newTodos = todos.filter((_, idx) => idx !== index);
    settodos(newTodos);
  };

  const HandleAdd = () => {
    if(editingIndex !== null){
      //update existing todo if editing
      const updatedTodos = todos.map((item,idx) =>
      idx === editingIndex ? {...item, todo} : item)
    
    settodos(updatedTodos);
    setEditingIndex(null); //reset editing index
    } else{settodos([...todos, { todo, isCompleted: false }]);}
    
    settodo("");
    
  };

  const HandleChange = (e) => {
    settodo(e.target.value);
  };

  const HandleCheckboxChange = (index) => {
    const newTodos = todos.map((item, idx) => {
      if (idx === index) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    settodos(newTodos);
  };

  const handleKeyDown = (e) => {
    if(e.key==="Enter"){
      HandleAdd();
    }
  }
  
  return (
    <>
      <Navbar />
      <div className="container max-w-screen-md mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onKeyDown={handleKeyDown} onChange={HandleChange} value={todo} type="text" className="w-1/2"/>
          <button
            onClick={HandleAdd}
            className="bg-violet-800 p-2 text-sm font-bold py-1 text-white rounded-md mx-4"
          >
            Add
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.map((item,index) => {
            return (
              <div key={index} className="todo flex w-1/2 my-3 justify-between">
                <input onChange={() => HandleCheckboxChange(index)} type="checkbox" value={todo.isCompleted} name={todo.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={() => { HandleEdit(index)}}
                    className="bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => HandleDelete(index)}
                    className="bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
