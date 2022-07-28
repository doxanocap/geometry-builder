import { useState } from "react";

export const Triangle = () => {
  const [lenOfSides] = useState([0, 0, 0])
  const [given, setGiven] = useState(null)
  const [type, setType] = useState(null)
  const [anglesChoose, setanglesChoose] = useState(false)
  const [inputs] = useState({
    // sides: [A, B, C]
    sides: [NaN, NaN, NaN],
    // angles [A, B, C]
    angles: [NaN, NaN, NaN]
  })
  const [check1, toggleCheck1] = useState(false)
  const [check2, toggleCheck2] = useState(false)

  const inputHandler = (event) => {
    const sideIDs = ['bc', 'ac', 'ab']
    const angleIDs = ['bac', 'abc', 'acb']
    const inputId = event.target.id
    const inputVal = event.target.value
    if (sideIDs.includes(inputId)) {
      const side = sideIDs.indexOf(inputId)
      inputs.sides[side] = parseInt(inputVal)
      handleLenghtOfSides(side, parseInt(inputVal))
    } else {
      const angle = angleIDs.indexOf(inputId)
      inputs.angles[angle] = parseInt(inputVal)
    }
    console.log(inputs.sides, inputs.angles)
  }

  const app = window.ggbApplet

  //<------- LENGTH OF SIDES 
  const handleLenghtOfSides = (side, sideLength) => {
    console.log(side, sideLength)
    let app = window.ggbApplet;
    if (sideLength === 0) {
      alert('nonono')
    } else {
      lenOfSides[side] = sideLength
    }

    if (lenOfSides.filter((item) => { return item > 0 }).length === 3) {
      app.evalCommand(`A=(0,0)`)
      app.evalCommand(`B=(${lenOfSides[0]},0)`)
      app.evalCommand(`c=Segment(A,B)`)
      app.evalCommand(`c1: Circle(A,${lenOfSides[1]})`)
      app.setVisible('c1', false)
      app.evalCommand(`c2: Circle(B,${lenOfSides[2]})`)
      app.setVisible('c2', false)
      if (lenOfSides[0] < lenOfSides[1] + lenOfSides[2] && lenOfSides[1] < lenOfSides[2] + lenOfSides[0] && lenOfSides[2] < lenOfSides[0] + lenOfSides[1]) {
        app.evalCommand(`C=Intersect(c1,c2,1)`)
        app.evalCommand(`a=Segment(C,B)`);
        app.evalCommand(`b=Segment(A,C)`);
      } else {
        alert("Incorrect input")
      }
    }
  }

  // --------------------Set triangle and change angles----------------->

  const drawDefaultTriangle = () => {
    setType('default')
    setanglesChoose(true);
    app.evalCommand(`c: y=2x`)
    app.evalCommand(`a: y=-2x+16`)
    app.evalCommand(`b: y=1/5x`)
    defaultOperationsToDraw();
  }

  const drawDefaultEquilateralTriangle = () => {
    setType('equilateral')
    setanglesChoose(true);
    app.evalCommand(`c: y=3.72x`)
    app.evalCommand(`a: y=-3.72x+14`)
    app.evalCommand(`b: y=0`)
    defaultOperationsToDraw();
  }

  const drawDefaultEqualTriangle = () => {
    setType('equal')
    setanglesChoose(true);
    app.evalCommand(`c: y=1.732x`)
    app.evalCommand(`a: y=-1.732x+15.8`)
    app.evalCommand(`b: y=0`)
    defaultOperationsToDraw();
  }

  const defaultOperationsToDraw = () => {
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

  const changeAngleOfEquilateral = (event) => {
    let angle = parseInt(event.target.value)
    if ((event.target.id === "bac1" | event.target.id === "acb1") & angle !== 0) {
      applyAnglesToEquilateral(angle);
    } else if (event.target.id === "abc1" && angle !== 0) {
      let topAngle = parseInt(event.target.value)
      angle = (180 - topAngle) / 2
      applyAnglesToEquilateral(angle);
    }
  }

  const applyAnglesToEquilateral = (angle) => {
    if (angle > 0 & angle <= 75) {
      app.evalCommand(`b1 = Rotate(c,${360 - (75 - angle)}°,A)`)
      app.evalCommand(`a1 = Rotate(a,${(75 - angle)}°,C)`)
      app.evalCommand(`B = Intersect(a1,b1)`)
      app.setVisible('b1', false)
      app.setVisible('a1', false)
    } else if (angle < 90) {
      app.evalCommand(`b1 = Rotate(c,${angle - 75}°,A)`)
      app.evalCommand(`a1 = Rotate(a,${360 - (angle - 75)}°,C)`)
      app.evalCommand(`B = Intersect(a1,b1)`)
      app.setVisible('b1', false)
      app.setVisible('a1', false)
    }
  }

  // -------------------------------------const sideIDs = ['bc', 'ac', 'ab']

  return (
    <div className="options-menu">
      <button onClick={drawDefaultTriangle} >Default</button>
      <button onClick={drawDefaultEquilateralTriangle}>Equilateral</button>
      <button onClick={drawDefaultEqualTriangle}>Equal</button>
      {type === 'default' ? (
        <ul className="optionList">
          <li><input type='checkbox' onChange={() => { toggleCheck1(!check1) }} /> Стороны
            <div>Тут крч функция на углы не робит</div>
            {check1 ? (
              <div className="input-points">
                AB: <input className="input-triangle" type="text" id="ab" placeholder="dlina AB" onChange={inputHandler} />
                BC: <input className="input-triangle" type="text" id="bc" placeholder="dlina BC" onChange={inputHandler} />
                AC: <input className="input-triangle" type="text" id="ac" placeholder="dlina AC" onChange={inputHandler} />
              </div>
            ) : (null)}

          </li>
          <li><input type='checkbox' onChange={() => { toggleCheck2(!check2) }} /> Углы
            {check2 ? (
              <div className="input-points">
                A: <input className="input-triangle" type="text" id="bac1" placeholder="(x,y)" onChange={changeAngleOfEquilateral} />
                B: <input className="input-triangle" type="text" id="abc1" placeholder="(x,y)" onChange={changeAngleOfEquilateral} />
                C: <input className="input-triangle" type="text" id="acb1" placeholder="(x,y)" onChange={changeAngleOfEquilateral} />
              </div>
            ) : (null)}

          </li>
        </ul>
      ) : (null)}
      {type === 'equilateral' ? (
        <ul className="optionList">
          <li><input type='checkbox' onChange={() => { toggleCheck1(!check1) }} /> Стороны
            {check1 ? (
              <div className="input-points">
                BC: <input className="input-triangle" type="text" id="bc" placeholder="dlina BC" onChange={inputHandler} />
                AB: <input className="input-triangle" type="text" id="ab" placeholder="dlina AB" onChange={inputHandler} />
                AC: <input className="input-triangle" type="text" id="ac" placeholder="dlina AC" onChange={inputHandler} />
              </div>
            ) : (null)}

          </li>
          <li><input type='checkbox' onChange={() => { toggleCheck2(!check2) }} /> Углы
            {check2 ? (
              <div className="input-points">
                A: <input className="input-triangle" type="text" id="bac" placeholder="(x,y)" onChange={inputHandler} />
                B: <input className="input-triangle" type="text" id="abc" placeholder="(x,y)" onChange={inputHandler} />
                C: <input className="input-triangle" type="text" id="acb" placeholder="(x,y)" onChange={inputHandler} />
              </div>
            ) : (null)}

          </li>
        </ul>
      ) : (null)}
      {type === 'equal' ? (
        <ul className="optionList">
          <li>ну икуал</li>
        </ul>
      ) : (null)}


    </div >
  );
}