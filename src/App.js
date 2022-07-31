import './App.css';
import Geogebra from 'react-geogebra';
import { useState, useEffect } from 'react';
import TriangleIcon from './assets/triangle.png';
import CircleIcon from './assets/circle.png'
import { Triangle } from './components/Triangle'
import { Circle } from './components/Circle'

function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true)
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const [mode, setMode] = useState('triangle')
  const [ready, setReady] = useState(false)
  return (
    <div id="check" className="App">
      <div className="main">
        <div className="left-regulatins-zones">
          <div className='figures'>
            <img className='figuresImg' src={TriangleIcon} alt='triangle' onClick={() => { setMode('triangle') }}></img>
            <img className='figuresImg' src={CircleIcon} alt='triangle' onClick={() => { setMode('circle') }}></img>
          </div>
          {ready ? (
            <>
              {mode === 'triangle' && <Triangle />}
              {mode === 'circle' && <Circle />}
            </>
          ) : (
            <div>Please wait</div>
          )}
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