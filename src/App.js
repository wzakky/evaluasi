import axios from 'axios'
import React, { useState, useEffect } from 'react'


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
    axios.post('http://localhost:3001/trello', { name: value, list: [] }).then(() => {
    getData()
    e.target.submit.value = ''
    })
  }

  
  return (
    <div className="p-5">
        <h1 className='text-center'>
          Trello App
        </h1>
        <form onSubmit={handleSubmit}>
          <input name='submit'></input>
          <button type='submit'>Add</button>
        </form>
    </div>
  );
}

