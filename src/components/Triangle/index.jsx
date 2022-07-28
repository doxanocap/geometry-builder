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

  //<--------------------------LENGTH OF SIDES--------------------- 
  const handleLenghtOfSides = (side, sideLength) => {
    console.log(side, sideLength)
    if (sideLength === 0) {
      alert('nonono')
    } else {
      lenOfSides[side] = sideLength
    }

    if (lenOfSides.filter((item) => { return item > 0 }).length === 3) {
      window.ggbApplet.evalCommand(`A=(0,0)`)
      window.ggbApplet.evalCommand(`B=(${lenOfSides[0]},0)`)
      window.ggbApplet.evalCommand(`c=Segment(A,B)`)
      window.ggbApplet.evalCommand(`c1: Circle(A,${lenOfSides[1]})`)
      window.ggbApplet.setVisible('c1', false)
      window.ggbApplet.evalCommand(`c2: Circle(B,${lenOfSides[2]})`)
      window.ggbApplet.setVisible('c2', false)
      if (lenOfSides[0] < lenOfSides[1] + lenOfSides[2] && lenOfSides[1] < lenOfSides[2] + lenOfSides[0] && lenOfSides[2] < lenOfSides[0] + lenOfSides[1]) {
        window.ggbApplet.evalCommand(`C=Intersect(c1,c2,1)`)
        window.ggbApplet.evalCommand(`a=Segment(C,B)`);
        window.ggbApplet.evalCommand(`b=Segment(A,C)`);
      } else {
        alert("Incorrect input")
      }
    }
  }

  // --------------------------Set triangle and change angles---------------------------->

  const drawDefaultTriangle = () => {
    setType('default');
    setanglesChoose(true);
    window.ggbApplet.evalCommand(`c: y=2x`)
    window.ggbApplet.evalCommand(`a: y=-2x+16`)
    window.ggbApplet.evalCommand(`b: y=1/5x`)
    defaultOperationsToDraw();
  }

  const drawDefaultEquilateralTriangle = () => {
    setType('equilateral');  
    setanglesChoose(true);
    window.ggbApplet.evalCommand(`c: y=3.72x`);
    window.ggbApplet.evalCommand(`a: y=-3.72x+14`);
    window.ggbApplet.evalCommand(`b: y=0`);
    defaultOperationsToDraw();
  }

  const drawDefaultEqualTriangle = () => {
    setType('equal')
    setanglesChoose(true);
    window.ggbApplet.evalCommand(`c: y=1.732x`)
    window.ggbApplet.evalCommand(`a: y=-1.732x+15.8`)
    window.ggbApplet.evalCommand(`b: y=0`)
    defaultOperationsToDraw();
  }

  const defaultOperationsToDraw = () => {
    window.ggbApplet.setVisible('a', false)
    window.ggbApplet.setVisible('b', false)
    window.ggbApplet.setVisible('c', false)
    window.ggbApplet.evalCommand(`A = Intersect(b,c)`)
    window.ggbApplet.evalCommand(`B = Intersect(a,c)`)
    window.ggbApplet.evalCommand(`C = Intersect(a,b)`)
    window.ggbApplet.evalCommand(`alpha = Angle(C,A,B)`)
    window.ggbApplet.evalCommand(`betta = Angle(A,B,C)`)
    window.ggbApplet.evalCommand(`gamma = Angle(B,C,A)`)
    window.ggbApplet.evalCommand(`ab = Segment(A,B)`)
    window.ggbApplet.evalCommand(`bc = Segment(B,C)`)
    window.ggbApplet.evalCommand(`ac = Segment(C,A)`)
  }

  const anglesOfDefault = (event) => {
    let angle = parseInt(event.target.value)

    if ((event.target.id === "bac1") & angle !== 0) {
      applyAnglesToDefault(angle);
    } else if (event.target.id === "abc1" && angle !== 0) {
      applyAnglesToDefault(angle);
    } else if (angle !== 0) {
      applyAnglesToDefault(angle);
    }
  }

  const applyAnglesToDefault = (angle) => {
    console.log(angle);
    window.ggbApplet.evalCommand(`b1 = Rotate(c,${angle}°,A)`)
  }

  const anglesOfEquilateral = (event) => {
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
    console.log("dalbayob");
    if (angle > 0 & angle <= 75) {
      window.ggbApplet.evalCommand(`b1 = Rotate(c,${360 - (75 - angle)}°,A)`)
      window.ggbApplet.evalCommand(`a1 = Rotate(a,${(75 - angle)}°,C)`)
      window.ggbApplet.evalCommand(`B = Intersect(a1,b1)`)
      window.ggbApplet.setVisible('b1', false)
      window.ggbApplet.setVisible('a1', false)
    } else if (angle < 90) {
      window.ggbApplet.evalCommand(`b1 = Rotate(c,${angle - 75}°,A)`)
      window.ggbApplet.evalCommand(`a1 = Rotate(a,${360 - (angle - 75)}°,C)`)
      window.ggbApplet.evalCommand(`B = Intersect(a1,b1)`)
      window.ggbApplet.setVisible('b1', false)
      window.ggbApplet.setVisible('a1', false)
    }
  }

  // -------------------------------------const sideIDs = ['bc', 'ac', 'ab']---------------------------------

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
                A: <input className="input-triangle" type="text" id="bac1" placeholder="(x,y)" onChange={anglesOfDefault} />
                B: <input className="input-triangle" type="text" id="abc1" placeholder="(x,y)" onChange={anglesOfDefault} />
                C: <input className="input-triangle" type="text" id="acb1" placeholder="(x,y)" onChange={anglesOfDefault} />
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