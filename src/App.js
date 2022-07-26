import './App.css';
import Geogebra from 'react-geogebra';
import {useState} from 'react';


function App() {
  
  return (
    <div id="check" className="App"> 
      <div className="main">
        <div className="left-regulatins-zones">
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