import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    saveToLs()
  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    saveToLs()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo("")
    saveToLs()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    setTodos(newtodos)
    saveToLs()
  }
  return (
    <>
      <Navbar />
      <div className=" ms-3md:container md:mx-auto my-5 rounded-xl p-5  bg-violet-200 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask - Do Task At One Place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'> Add a Todo : </h2>
          <input onChange={handleChange} value={todo} className='bg-violet-100 w-full rounded-full px-5 py-1' type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-white rounded-md  text-sm font-bold'> Save </button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold underline'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>There is no Todos to display. </div>}
          {todos.map(item => {


            return (showFinished || !item.iscompleted) && <div key={item.id} className="todo flex  justify-between m-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id='' />
                <div className={item.iscompleted ? "line-through" : " "}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdEdit />
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>

    </>
  )
}

export default App
