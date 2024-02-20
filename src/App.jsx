import { useState } from 'react';
import './App.css';
import Openlayers from './components/Openlayers';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Openlayers />
    </>
  );
}

export default App;
