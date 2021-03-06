import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function App() {
  const [data, setData] = useState([])
  const [edit, setEdit] = useState(null)

  const getData = () => {
    axios.get('http://localhost:3001/trello')
      .then(hasil => setData(hasil.data))
  }

  useEffect(() => {
    getData()

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.submit.value
    axios.post('http://localhost:3001/trello', { name: value })
      .then(() => {
        e.target.submit.value = ''
        getData()

      })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:3001/trello/${data[edit].id}`, { name: e.target.task.value })
      .then(() => {
        getData()
        setEdit(null)
      })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/trello/${id}`)
      .then(() => {
        getData()
      })
  }
  return (
    <div className='container p-3 space-y-4 my-1'>
      <form onSubmit={handleSubmit} className='p-2 grid grid-cols-2 gap-4 border-2 rounded-lg' >
        <input type='text' name='submit' placeholder='What Task?' />
        <button type='submit'>Add</button>
      </form>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3 items-center' >
        {data.map((task, index) => {
          return <div key={index} className='row'>
            {edit === index ?
              <form className='col' onSubmit={(e) => handleEdit(e)}>
                <input name='task' defaultValue={task.name} />
                <button>Save</button>
              </form>
              : task.name
            }
            <div className='col' >
              <button className='mx-3' onClick={() => setEdit(index === edit ? null : index)}>edit</button>
              <button onClick={() => handleDelete(task.id)}>delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  )
} 
