import './App.css';
import Geogebra from 'react-geogebra'

function App() {
  function onClickHandler() {
    const app = window.ggbApplet;
    app.evalCommand(`0=2.8x^2(x^2(2.5x^2+y^2-2)+1.2y^2(y(3y-0.75)-6.0311)+3.09)+0.98y^2((y^2-3.01)y^2+3)-1.005`);
  }
  return (
    <div className="App">
      <div className="main-tab">
        <button type="button" onClick={onClickHandler}>
          Draw something fun!
        </button>
        <Geogebra
          appName="geometry"
          width="1920"
          height="900"
          showToolBar
          showAlgebraInput
          showMenuBar
        />
      </div>
    </div>
  );
}

export default App;
