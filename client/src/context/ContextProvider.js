import React, { createContext, useContext, useEffect, useState } from 'react'

export function useValues() {
  return useContext(DataProvider)
}
const DataProvider = createContext()

export default function ContextProvider( {children } ) {
  const [tasks, setTasks] = useState([])
  
  const getTasks = async () => {
    try {
      let response = await fetch('http://localhost:3500/tasks')
      if (!response.ok) throw Error("Failed to fetch data")

      let data = await response.json()
      setTasks(data)
    } catch (err) {
      return err.message
    }
  }

  useEffect(() => {
    getTasks()
  },[])

  return (
    <DataProvider.Provider value={{
      tasks,
      setTasks,
      getTasks,
    }}>
      {children}
    </DataProvider.Provider>
  )
}
