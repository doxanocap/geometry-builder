import './App.css';
import Geogebra from 'react-geogebra';
import { useState } from 'react';
import TriangleIcon from './assets/triangle.png';
import { Triangle } from './components/Triangle'


function App() {
  const [mode, setMode] = useState()
  console.log(mode)
  return (
    <div id="check" className="App">
      <div className="main">
        <div className="left-regulatins-zones">
          <img className='figures' src={TriangleIcon} alt='triangle' onClick={() => { setMode('triangle') }}></img>
          <Triangle />
        </div>
        <div className="right-main-tab">
          <Geogebra
            appName="geometry"
            width="1200"
            height="900"
            showToolBar
            showAlgebraInput
            showMenuBar
          />
        </div>
      </div>
    </div>
  );
}

export default App;