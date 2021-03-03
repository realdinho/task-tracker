import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom' 
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const api = 'http://localhost:5000/tasks'

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch(api)
    const data = await res.json()
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`${api}/${id}`)
    const data = await res.json()
    return data;
  }

  const addTask = async (task) => {
    const res = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    await fetch(`${api}/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const task = await fetchTask(id)
    const updatedTask = {
      ...task, 
      reminder: !task.reminder
    }

    const res = await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id 
      ? { ...task, reminder: !data.reminder }
      : task
    ))
  }

  return (
    <Router>
      <div className='container'>
        <Header 
          showAdd={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask) } 
          />
        <Route path='/' exact render={(props) => (
          <>
            { showAddTask && <AddTask onAdd={addTask} /> }
            {
              tasks.length > 0
              ? <Tasks tasks={tasks} onDelete={deleteTask} onToggleReminder={toggleReminder} />
              : 'no tasks available'
            }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
