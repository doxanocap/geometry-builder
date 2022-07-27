import './App.css';
import Geogebra from 'react-geogebra';
import { useState } from 'react';
import TriangleIcon from './assets/triangle.png';
import CircleIcon from './assets/circle.png'
import { Triangle } from './components/Triangle'


function App() {
  const [mode, setMode] = useState()
  return (
    <div id="check" className="App">
      <li>blabla</li>
      <div className="main">
        <div className="left-regulatins-zones">
          <div className='figures'>
            <img className='figuresImg' src={TriangleIcon} alt='triangle' onClick={() => { setMode('triangle') }}></img>
            <img className='figuresImg' src={CircleIcon} alt='triangle' onClick={() => { setMode('triangle') }}></img>
          </div>
          {mode === 'triangle' && <Triangle />}
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