import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HelloWorld from './Components/HelloWorld';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
    .then(response => {
      // console.log(response.data)
      setData(response.data.message);
    })
    .catch(error => {
      console.error('somethin didnt work' ,error)
    });
  }, []);

  return (
    <div className="App">
      <HelloWorld message={data}/>
    </div>
  );
};

export default App;
