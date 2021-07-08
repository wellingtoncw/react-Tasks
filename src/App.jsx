import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import TaskDetails from './components/TaskDetails'

import './App.css'

//O componente App é pai do componente Tasks pois o App é quem está renderizando o Tasks;


const App = () => {
  // const message = 'Hello World'
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar programação',
      completed: false
    },
    {
      id: '2',
      title: 'Ler livros',
      completed: true
    },
  ])  // utilizando o state. Só quando o state é atualizado que o componente em si é atualizado

  useEffect(() => {
    const fetchTasks = async () => {
      const {data} = await axios.get('https://jsonplaceholder.cypress.io/todos?_limit=10')
      setTasks(data)
    }
    fetchTasks()
  }, [])

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [...tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }]

    setTasks(newTasks)
  }

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter( task => task.id !== taskId )
    
    setTasks(newTasks)
  }

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if(task.id === taskId) return {...task, completed: !task.completed }

      return task
    })

    setTasks(newTasks)
  }

  return (
    <Router>
    <div className="container">
      <Header />
      <Route path="/" exact render={() => (
        <>
          <AddTask handleTaskAddition={handleTaskAddition} />
          <Tasks 
            tasks = {tasks}
            handleTaskClick={handleTaskClick}
            handleTaskDeletion={handleTaskDeletion}
          />
        </>
      )} />
      
     <Route path="/:taskTitle" exact component={TaskDetails} />   

    </div>
    </Router>
  )
}

export default App
