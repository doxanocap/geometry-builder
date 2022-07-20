import './App.css';
import Geogebra from 'react-geogebra'

function App() {
  return (
    <div className="App">
      <div className="main-tab">
        <Geogebra
          appName = "geometry"
          width = "1920"
          height = "900"
          showToolBar
          showAlgebraInput
          showMenuBar
          />
      </div>
    </div>
  );
}

export default App;
