import {useState} from "react"; 
import Geogebra from 'react-geogebra';

export const Triangle = () => {
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const [f3, setF3] = useState(false);
  const [textAreaString, setTextAreaString] = useState("");
  const [points] = useState([[0,0],[0,0],[0,0]]);
  const [outCircle, setOuterCircle] = useState(false);
  const [middlepoints] = useState([[0,0],[0,0]]);
  const app = window.ggbApplet

  const drawOuterCircle = () => {
    let app = window.ggbApplet;
    //AB ---- middle point ---- M1 ----- [1,2] ---- A[1,1] ---- B[1,3]
    middlepoints[0] = [(points[0][0]+points[1][0]) / 2, (points[0][1]+points[1][1]) / 2]
    //AC ---- middle point ---- M2 ----- [2,1]
    middlepoints[1] = [(points[0][0]+points[2][0]) / 2, (points[0][1]+points[2][1]) / 2]
    console.log(middlepoints, points[0][0], points[1][0],(1 + 1)/2) ;
    app.evalCommand(`M1=(${middlepoints[0][0]},${middlepoints[0][1]})`)
    app.setVisible('M1', false)
    app.evalCommand(`M2=(${middlepoints[1][0]},${middlepoints[1][1]})`)
    app.setVisible('M2', false)
    app.evalCommand(`i: PerpendicularLine(M1,d)`)
    app.setVisible('i', false)
    app.evalCommand(`j: PerpendicularLine(M2,f)`)
    app.setVisible('j', false)
    app.evalCommand(`O = Intersect(i,j)`)
    app.evalCommand(`Circle(O,A)`)
  }

  const handleClickOuterCircle = (event) => {
    setOuterCircle(!outCircle);
  }

  const handleValueOfTextarea = (event) => {
    setTextAreaString(event.target.value) 
  }

  const drawSketchOfTheProble = () => {
    let textOfProblem = textAreaString
    let dict = {}
    for ( let i = 0; i < textOfProblem.length; i++ ) {
      if ( textOfProblem.charCodeAt(i) > 64 & textOfProblem.charCodeAt(i) < 91) {
        dict[textOfProblem.charAt(i)] = 1 
      } 
    }
    console.log(dict);
  }


  const HandleValOfInput = (event) => {
    let pointName = event.target.id       
    let inputStr = event.target.value
    let app = window.ggbApplet;
    if ( inputStr.charAt(0) === "(" & inputStr.charAt(4) === ")" )  {
      if ( pointName === "A" ) {
        setF1(true)
        points[0][0] = parseInt(inputStr.charAt(1))
        points[0][1] = parseInt(inputStr.charAt(3))
        app.evalCommand(`${pointName}=(${points[0][0]},${points[0][1]})`);
      }
      if ( pointName === "B" ) {
        setF2(true)
        points[1][0] = parseInt(inputStr.charAt(1))
        points[1][1] = parseInt(inputStr.charAt(3))
        app.evalCommand(`${pointName}=(${points[1][0]},${points[1][1]})`);
      }
      if ( pointName === "C" ) {
        setF3(true)
        points[2][0] = parseInt(inputStr.charAt(1))
        points[2][1] = parseInt(inputStr.charAt(3))
        app.evalCommand(`${pointName}=(${points[2][0]},${points[2][1]})`);
      }
    }
  }

  if ( f1 === true & f2 === true & f3 === true ) {
    app.evalCommand(`f=Segment(A,C)`);
    app.evalCommand(`d=Segment(A,B)`);
    app.evalCommand(`g=Segment(B,C)`);
    if ( outCircle === true ) {
      drawOuterCircle();
    }
  }

  return (
    <div className="options-menu">
          <div className="input-points">
            <h2>Point A</h2>
            <input className="input-triangle" type="text" id="A" placeholder="(x,y)" onChange={HandleValOfInput}/>
          </div>
          <div className="input-points">
            <h2>Point B</h2>
            <input className="input-triangle" type="text" id="B" placeholder="(x,y)" onChange={HandleValOfInput}/>
          </div>
          <div className="input-points">
            <h2>Point C</h2>
            <input className="input-triangle" type="text" id="C" placeholder="(x,y)" onChange={HandleValOfInput}/>
          </div>
          <div className="button-circle-div">
            <button className={"button-circle"} onClick={handleClickOuterCircle}>Draw circle</button>
        </div>
    </div >
  );
}