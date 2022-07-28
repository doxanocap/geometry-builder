import { useState } from "react";

export const Triangle = () => {
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const [f3, setF3] = useState(false);
  const [points] = useState([[0, 0], [0, 0], [0, 0]]);
  const [outCircle, setOuterCircle] = useState(false);
  const [middlepoints] = useState([[0, 0], [0, 0]]);
  const [lenOfSides] = useState([0, 0, 0])
  const [given, setGiven] = useState(null)
  const [anglesChoose, setAnglesChoose] = useState(false);
  const app = window.ggbApplet


  //<------- LENGTH OF SIDES 
  const handleLenghtOfSides = (event) => {
    let app = window.ggbApplet;
    if (event.target.id === "ab" & event.target.value !== 0) {
      lenOfSides[0] = parseInt(event.target.value)
      app.evalCommand(`A=(0,0)`)
      app.evalCommand(`B=(${event.target.value},0)`)
      app.evalCommand(`c=Segment(A,B)`)
    } else if (event.target.id === "ac" & event.target.value !== 0) {
      lenOfSides[1] = parseInt(event.target.value)
      app.evalCommand(`c1: Circle(A,${event.target.value})`)
      app.setVisible('c1', false)
    } else if (event.target.id === "bc" & event.target.value !== 0) {
      lenOfSides[2] = parseInt(event.target.value)
      app.evalCommand(`c2: Circle(B,${event.target.value})`)
      app.setVisible('c2', false)
    }
    console.log(lenOfSides);
    if (event.target.value !== 0 & lenOfSides[0] !== 0 & lenOfSides[1] !== 0 & lenOfSides[2] !== 0) {
      console.log("qwe");
      if (lenOfSides[0] < lenOfSides[1] + lenOfSides[2] & lenOfSides[1] < lenOfSides[2] + lenOfSides[0] & lenOfSides[2] < lenOfSides[0] + lenOfSides[1]) {
        app.evalCommand(`C=Intersect(c1,c2,1)`)
        app.evalCommand(`a=Segment(C,B)`);
        app.evalCommand(`b=Segment(A,C)`);
      } else {
        alert("Incorrect input")
      }
    }
  }
  // ------>

  // <------ Coordinates and circle 
  const HandleValOfCoords = (event) => {
    let pointName = event.target.id
    let inputStr = event.target.value
    let app = window.ggbApplet;
    if (inputStr.charAt(0) === "(" & inputStr.charAt(4) === ")") {
      if (pointName === "A") {
        setF1(true)
        points[0][0] = parseInt(inputStr.charAt(1))
        points[0][1] = parseInt(inputStr.charAt(3))
        app.evalCommand(`${pointName}=(${points[0][0]},${points[0][1]})`);
      }
      if (pointName === "B") {
        setF2(true)
        points[1][0] = parseInt(inputStr.charAt(1))
        points[1][1] = parseInt(inputStr.charAt(3))
        app.evalCommand(`${pointName}=(${points[1][0]},${points[1][1]})`);
      }
      if (pointName === "C") {
        setF3(true)
        points[2][0] = parseInt(inputStr.charAt(1))
        points[2][1] = parseInt(inputStr.charAt(3))
        app.evalCommand(`${pointName}=(${points[2][0]},${points[2][1]})`);
      }
    }
  }

  const handleClickOuterCircle = (event) => {
    setOuterCircle(!outCircle);
  }

  if (f1 === true & f2 === true & f3 === true) {
    app.evalCommand(`f=Segment(A,C)`);
    app.evalCommand(`d=Segment(A,B)`);
    app.evalCommand(`g=Segment(B,C)`);
    if (outCircle === true) {
      drawOuterCircle();
    }
  }

  const drawOuterCircle = () => {
    let app = window.ggbApplet;
    //AB ---- middle point ---- M1 ----- [1,2] ---- A[1,1] ---- B[1,3]
    middlepoints[0] = [(points[0][0] + points[1][0]) / 2, (points[0][1] + points[1][1]) / 2]
    //AC ---- middle point ---- M2 ----- [2,1]
    middlepoints[1] = [(points[0][0] + points[2][0]) / 2, (points[0][1] + points[2][1]) / 2]
    console.log(middlepoints, points[0][0], points[1][0], (1 + 1) / 2);
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
  // ------------------------------------> 

  // ------------------------------------->
  
  const drawDefaultTriangle = () => {
    setAnglesChoose(true)
    app.evalCommand(`c: y=2x`)
    app.evalCommand(`a: y=-2x+16`)
    app.evalCommand(`b: y=1/5x`)
    defaultOperationsToDraw();
  }

  const drawDefaultEquilateralTriangle = () => {
    setAnglesChoose(true);
    app.evalCommand(`c: y=3.72x`)
    app.evalCommand(`a: y=-3.72x+32`)
    app.evalCommand(`b: y=0`)
    defaultOperationsToDraw();
  }

  const drawDefaultEqualTriangle = () => {
    app.evalCommand(`c: y=1.732x`)
    app.evalCommand(`a: y=-1.732x+15.8`)
    app.evalCommand(`b: y=0`)
    defaultOperationsToDraw();
  }

  function defaultOperationsToDraw() {
    app.setVisible('a', false)
    app.setVisible('b', false)
    app.setVisible('c', false)
    app.evalCommand(`A= Intersect(c,b)`)
    app.evalCommand(`B= Intersect(a,c)`)
    app.evalCommand(`C= Intersect(a,b)`)
    app.evalCommand(`alpha = Angle(C,A,B)`)
    app.evalCommand(`betta = Angle(A,B,C)`)
    app.evalCommand(`gamma = Angle(B,C,A)`)
    app.evalCommand(`ab=Segment(A,B)`)
    app.evalCommand(`bc=Segment(B,C)`)
    app.evalCommand(`ac=Segment(C,A)`)
  } 

  const changeAngle = (event) => {
    let angle = parseInt(event.target.value)
    if (event.target.id === "bac'" & angle !== 0) {
      if (angle > 0 & angle <= 75) {
        app.evalCommand(`b1 = Rotate(c,${360-(75-angle)}°,A)`)
        app.evalCommand(`a1 = Rotate(a,${(75-angle)}°,C)`)
        app.evalCommand(`B = Intersect(a1,b1)`)
        app.setVisible('b1', false)
        app.setVisible('a1', false)
      } else if (angle < 90) {
        app.evalCommand(`b1 = Rotate(c,${angle-75}°,A)`)
        app.evalCommand(`a1 = Rotate(a,${360-(angle-75)}°,C)`)
        app.evalCommand(`B = Intersect(a1,b1)`)
        app.setVisible('b1', false)
        app.setVisible('a1', false)
      }
    }
  }
  // -------------------------------------
  return (
    <div className="options-menu">
      <ul className="optionList">
        <li onClick={() => { setGiven('cords') }}>Координаты</li>
        {given === 'cords' ? (
          <div className="input-points">
            A:<input className="input-triangle" type="text" id="A" placeholder="(x,y)" onChange={HandleValOfCoords} />
            B:<input className="input-triangle" type="text" id="B" placeholder="(x,y)" onChange={HandleValOfCoords} />
            C:<input className="input-triangle" type="text" id="C" placeholder="(x,y)" onChange={HandleValOfCoords} />
          </div>  
        ) : (
          console.log()
        )}
        <li onClick={() => { setGiven('sides') }}>Стороны</li>
        {given === 'sides' ? (
          <div className="input-points">
            AB:<input className="input-triangle" type="text" id="ab" placeholder="dlina AB" onChange={handleLenghtOfSides} />
            BC:<input className="input-triangle" type="text" id="bc" placeholder="dlina BC" onChange={handleLenghtOfSides} />
            AC:<input className="input-triangle" type="text" id="ac" placeholder="dlina AC" onChange={handleLenghtOfSides} />
          </div>
        ) : (
          console.log()
        )}
        <li onClick={() => { setGiven('angles') }}>Углы</li>
        {given === 'angles' ? (
          <div className="input-points">
            A:<input className="input-triangle" type="text" id="bac" placeholder="Градусная мера угла А" onChange={handleLenghtOfSides} />
            B:<input className="input-triangle" type="text" id="abc" placeholder="Градусная мера угла B" onChange={handleLenghtOfSides} />
            C:<input className="input-triangle" type="text" id="acb" placeholder="Градусная мера угла C" onChange={handleLenghtOfSides} />
      s    </div>
        ) : (
          console.log()
        )}
      </ul>
      <div className="input-points">
        <button onClick={drawDefaultTriangle} >Треугольник</button>
        <button onClick={drawDefaultEquilateralTriangle}>Равнобед</button>
        <button onClick={drawDefaultEqualTriangle}>РавноСтр</button>
      </div>
      {(anglesChoose) ? (
        <>
          <div className="input-points">
            <h2>Angle A</h2>
            <input className="input-triangle" type="text" id="bac'" placeholder="(x,y)" onChange={changeAngle} />
          </div>
          <div className="input-points">
            <h2>Angle B</h2>
            <input className="input-triangle" type="text" id="abc'" placeholder="(x,y)" onChange={changeAngle} />
          </div>
          <div className="input-points">
            <h2>Angle C</h2>
            <input className="input-triangle" type="text" id="acb'" placeholder="(x,y)" onChange={changeAngle} />
          </div>
        </>
      ) : (
        <div>пусто</div>
      )}
    </div >
  );
}