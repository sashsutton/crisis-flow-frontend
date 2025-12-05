import { useState, useEffect } from 'react'
import './App.css'


const API_URL = 'http://127.0.0.1:8000'

function App() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try{
      const res = await fetch(`${API_URL}/data`)
      const crisisData = await res.json()
      setData(crisisData)
    }catch(error){
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="container">
      <h1>The crisis flow</h1>
      <div className="card">
        <h2>The visualisation</h2>

        {data.map((item) => (
          <div key={item.id} className="item">
            <h3>{item.id}</h3>
            <h3>{item.location}</h3>
            <h3>{item.pca_x}</h3>
            <h3>{item.pca_y}</h3>
            <h3>{item.cluster_id}</h3>

            <p>{item.text}</p>
          </div>
        ))}

      </div>

    </div>
  )
}

export default App
