import { useState } from "react";

//exp
export const Triangle = () => {
  const [lenOfSides] = useState([0, 0, 0])
  const [given, setGiven] = useState(null)
  const [type, setType] = useState(null)
  const [check, setCheck] = useState("")
  const [inputs] = useState({
    // sides: [A, B, C]
    sides: [NaN, NaN, NaN],
    // angles [A, B, C]
    angles: [NaN, NaN, NaN]
  })
  const [check1, toggleCheck1] = useState(true)
  const [check2, toggleCheck2] = useState(true)
  const [angValues, setAngValues] = useState([0, 0, 0])
  const [temp, setTemp] = useState(0);
  const [coordinates, setCoordinates] = useState([[0, 0], [0, 0], [0, 0]]);
  const [displayThirdAngle, setDisplayThirdAngle] = useState(false);
  const [Values, setValues] = useState()

  const inputHandler = (event) => {
    const sideIDs = ['bc', 'ac', 'ab']
    const angleIDs = ['bac', 'abc', 'acb']
    const inputId = event.target.id
    const inputVal = event.target.value
    if (sideIDs.includes(inputId)) {
      const side = sideIDs.indexOf(inputId)
      inputs.sides[side] = parseInt(inputVal)
      if (type === 'equal') {
        if (parseInt(inputVal) > 0) {
          handleLenghtOfSides(4, parseInt(inputVal))
        } else {
          setTemp(0)
        }
      }
      handleLenghtOfSides(side, parseInt(inputVal))
    } else {
      const angle = angleIDs.indexOf(inputId)
      event.target.value = inputVal
      inputs.angles[angle] = parseInt(inputVal)
      console.log(inputs.angles, angle);
      if (type === "equilateral") {
        anglesOfEquilateral(angle, parseInt(inputVal))
      }
      if (type === "default") {
        anglesOfDefault(inputs, event.target.name, event.target.value)
      }
    }
  }

//<--------------------------LENGTH OF SIDES--------------------- 
  const handleLenghtOfSides = (side, sideLength) => {
    if (side === 4) {
      console.log('bruh')
      window.ggbApplet.evalCommand(`A=(0,0)`)
      window.ggbApplet.evalCommand(`B=(${sideLength},0)`)
      window.ggbApplet.evalCommand(`c=Segment(A,B)`)
      window.ggbApplet.evalCommand(`c1: Circle(A,${sideLength})`)
      window.ggbApplet.setVisible('c1', false)
      window.ggbApplet.evalCommand(`c2: Circle(B,${sideLength})`)
      window.ggbApplet.setVisible('c2', false)
      window.ggbApplet.evalCommand(`C=Intersect(c1,c2,1)`)
      window.ggbApplet.evalCommand(`a=Segment(C,B)`);
      window.ggbApplet.evalCommand(`b=Segment(A,C)`);
      setTemp(sideLength)
    } else {
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
  }

// --------------------------Set triangle and change angles---------------------------->

  const drawDefaultTriangle = (event) => {
    setType('default');
    window.ggbApplet.evalCommand(`A: (0,0)`)
    window.ggbApplet.evalCommand(`B: (4,8)`)
    window.ggbApplet.evalCommand(`C: (7,1)`)
    defaultOperationsToDraw();
  }

  const drawDefaultEquilateralTriangle = (event) => {
    setType('equilateral');
    window.ggbApplet.evalCommand(`c: y=3.72x`);
    window.ggbApplet.evalCommand(`a: y=-3.72x+14`);
    window.ggbApplet.evalCommand(`b: y=0`);
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

  const drawDefaultEqualTriangle = (event) => {
    setType('equal')
    window.ggbApplet.evalCommand(`A: (0,0)`)
    window.ggbApplet.evalCommand(`B: (8,0)`)
    window.ggbApplet.evalCommand(`C: (4,6.928)`)
    defaultOperationsToDraw();
  }

  const getValueOfCoords = (coords) => {
    let arr = []
    let s = ""
    for (let i = 5; i < coords.length; i++) {
      if ( coords[i] === "," || coords[i] === ")" ) {
        arr.push(parseFloat(s))
        s = ""
        i = i + 1
        continue
      }
      s = s + coords[i]
    }
    return arr
  }  

  const defaultOperationsToDraw = () => {
    toggleCheck1(false)
    toggleCheck2(false)
    setAngValues([0, 0, 0])
    setTemp(0)
    window.ggbApplet.evalCommand(`a: Line(B,C)`)
    window.ggbApplet.evalCommand(`b: Line(A,C)`)
    window.ggbApplet.evalCommand(`c: Line(A,B)`)
    //window.ggbApplet.setVisible('a', false)
    //window.ggbApplet.setVisible('b', false)
    //window.ggbApplet.setVisible('c', false)
    window.ggbApplet.evalCommand(`alpha = Angle(C,A,B)`)
    window.ggbApplet.evalCommand(`betta = Angle(A,B,C)`)
    window.ggbApplet.evalCommand(`gus = Angle(B,C,A)`)
    window.ggbApplet.evalCommand(`ab = Segment(A,B)`)
    window.ggbApplet.evalCommand(`bc = Segment(B,C)`)
    window.ggbApplet.evalCommand(`ac = Segment(C,A)`)
    coordinates[0] = getValueOfCoords(window.ggbApplet.getValueString(`A`))
    coordinates[1] = getValueOfCoords(window.ggbApplet.getValueString(`B`))
    coordinates[2] = getValueOfCoords(window.ggbApplet.getValueString(`C`))
  }

  const anglesOfDefault = (inputs, id, angle) => {  
    if (angle === "" || angle === NaN) {
      if (id === "b1ABa") {
        angValues[0] = 0
      } else if ( id === "c1BCb") {
        angValues[1] = 0
      } else {
        angValues[2] = 0
      }
      return;
    }
    const countDiff = () => {
      let diff = 180
      inputs.angles.map((angle) => {
        if (!Number.isNaN(angle)) {
          diff = diff - angle
        }
      })
     return diff
    } 
    console.log(inputs.angles);
    console.log(angValues);
    if (inputs.angles.filter(x => Number.isNaN(x)).length === 2 ) {
      let R = window.ggbApplet.getValue(`${id.substr(2, 2)}`);
      window.ggbApplet.evalCommand(`${id.substr(0, 2)} = Rotate(${id.substr(0, 1)},${angle}°,${id.substr(2, 1)})`)
      window.ggbApplet.evalCommand(`${id}: Circle(${id.substr(2, 1)},${R})`)
      window.ggbApplet.evalCommand(`${id.substr(3, 1)} = Intersect(${id.substr(0, 2)}, ${id}, 2)`)
      window.ggbApplet.setVisible(id.substr(0, 2), false)
      window.ggbApplet.setVisible(id, false)
      setCheck(id);
    } else if (inputs.angles.filter(x => Number.isNaN(x)).length === 1 ) {
      console.log("Qwe");
      if (check === "b1ABa" && id === "a1CAc") {
        angle = countDiff();
        id = "c1BCb" 
      } else if (check === "c1BCb" && id === "b1ABa") {
        angle = countDiff();
        id = "a1CAc"
      } else if (check === "a1CAc" && id === "c1BCb" ) {
        angle = countDiff();
        id = "b1ABa"
      } 
      window.ggbApplet.evalCommand(`${id.substr(0, 2)} = Rotate(${id.substr(0, 1)},${angle}°,${id.substr(2, 1)})`)
      window.ggbApplet.evalCommand(`${id.substr(3, 1)} = Intersect(${id.substr(0, 2)},${id.substr(4, 1)})`)
      window.ggbApplet.setVisible(id.substr(0, 2), false)
      setDisplayThirdAngle(true); 
    } else if (inputs.angles.filter(x => Number.isNaN(x)).length === 0 && displayThirdAngle) {
        if (id === "b1ABa") {
          //inputs.angles = [angle,NaN,NaN]
        } else if ( id === "c1BCb") {
          //inputs.angles = [NaN,angle,NaN]
        } else {
          inputs.angles = [NaN,NaN,NaN]
          setAngValues([0,0,0])
          document.getElementById("bac").value = "";
          document.getElementById("abc").value = "";
          window.ggbApplet.evalCommand(`A: (0,0)`)
          window.ggbApplet.evalCommand(`B: (4,8)`)
          window.ggbApplet.evalCommand(`C: (7,1)`)
          return;
        }
        setDisplayThirdAngle(false)
      }
      setAngValues([
        parseFloat(parseFloat(window.ggbApplet.getValue(`alpha`) * 180 / Math.PI).toFixed(2)),
        parseFloat(parseFloat(window.ggbApplet.getValue(`betta`) * 180 / Math.PI).toFixed(2)),
        parseFloat(parseFloat(window.ggbApplet.getValue(`gus`) * 180 / Math.PI).toFixed(2))
      ]);
      coordinates[0] = getValueOfCoords(window.ggbApplet.getValueString(`A`))
      coordinates[1] = getValueOfCoords(window.ggbApplet.getValueString(`B`))
      coordinates[2] = getValueOfCoords(window.ggbApplet.getValueString(`C`))
  }

  const anglesOfEquilateral = (angle, angleVal) => {
    if ([0, 2].includes(angle) & angleVal !== 0) {
      applyAnglesToEquilateral(angleVal);
      if (!Number.isNaN(angleVal)) {
        setAngValues([angleVal, (180 - 2 * angleVal), angleVal])
      } else {
        setAngValues([0, 0, 0])
      }
    } else if (angleVal !== 0) {
      if (!Number.isNaN(angleVal)) {
        setAngValues([(180 - angleVal) / 2, angleVal, (180 - angleVal) / 2])
      } else {
        setAngValues([0, 0, 0])
      }
      angleVal = (180 - angleVal) / 2
      applyAnglesToEquilateral(angleVal);
    }
  }

  const drawOuterCircle = () => {
    let app = window.ggbApplet;
    let mPoint1 = [(coordinates[0][0] + coordinates[1][0]) / 2, (coordinates[0][1] + coordinates[1][1]) / 2]
    let mPoint2 = [(coordinates[0][0] + coordinates[2][0]) / 2, (coordinates[0][1] + coordinates[2][1]) / 2]
    window.ggbApplet.evalCommand(`M1=(${mPoint1[0]},${mPoint1[1]})`)
    window.ggbApplet.setVisible('M1', false)
    window.ggbApplet.evalCommand(`M2=(${mPoint2[0]},${mPoint2[1]})`)
    window.ggbApplet.setVisible('M2', false)
    window.ggbApplet.evalCommand(`i: PerpendicularLine(M1,c)`)
    window.ggbApplet.setVisible('i', false)
    window.ggbApplet.evalCommand(`j: PerpendicularLine(M2,b)`)
    window.ggbApplet.setVisible('j', false)
    window.ggbApplet.evalCommand(`O1 = Intersect(i,j)`)
    window.ggbApplet.evalCommand(`Circle(O1 ,A)`)
  }

  const applyAnglesToEquilateral = (angle) => {
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

//------------------------------------const sideIDs = ['bc', 'ac', 'ab']---------------------------------

  return (
    <div className="options-menu">
      <button onClick={drawDefaultTriangle}>Default</button>
      <button onClick={drawDefaultEquilateralTriangle}>Equilateral</button>
      <button onClick={drawDefaultEqualTriangle}>Equal</button>
      {type === 'default' ? (
        <ul className="optionList">
          <li><input type='checkbox' checked={check1} onChange={() => { toggleCheck1(!check1) }} /> Стороны
            {check1 ? (
              <div className="input-points">
                AB: <input className="input-triangle" type="text" id="ab" placeholder="dlina AB" onChange={inputHandler} />
                BC: <input className="input-triangle" type="text" id="bc" placeholder="dlina BC" onChange={inputHandler} />
                AC: <input className="input-triangle" type="text" id="ac" placeholder="dlina AC" onChange={inputHandler} />
              </div>
            ) : (null)}

          </li>
          <li><input type='checkbox' checked={check2} onChange={() => { toggleCheck2(!check2) }} /> Углы
            {check2 ? (
              <div className="input-points">
               A: <input className="input-triangle" type="text" name="b1ABa" id="bac" placeholder={angValues[0]} //{... displayThirdAngle ? {value: angValues[0]} : {}}
                  onChange={inputHandler} />
                B: <input className="input-triangle" type="text" name="c1BCb" id="abc" placeholder={angValues[1]} //{... displayThirdAngle ? {value: angValues[1]} : {}}
                  onChange={inputHandler} />
                C: <input className="input-triangle" type="text" name="a1CAc" id="acb" placeholder={angValues[2]} //{... displayThirdAngle ? {value: angValues[2]} : {}}
                  onChange={inputHandler} />
              </div>
            ) : (null)}

          </li>
          <div> 
            <button onClick={drawOuterCircle}>Draw Outer Circle</button>
          </div>
        </ul>
      ) : (null)}
      {type === 'equilateral' ? (
        <ul className="optionList">
          <li><input type='checkbox' checked={check1} onChange={() => { toggleCheck1(!check1) }} /> Стороны
            {check1 ? (
              <div className="input-points">
                BC: <input className="input-triangle" type="text" id="bc" placeholder="dlina BC" onChange={inputHandler} value={parseFloat(window.ggbApplet.getValue(`Segment(B,C)`)).toFixed(2)} readonly="readonly" />
                AB: <input className="input-triangle" type="text" id="ab" placeholder="dlina AB" onChange={inputHandler} value={parseFloat(window.ggbApplet.getValue(`Segment(A,B)`)).toFixed(2)} readonly="readonly" />
                AC: <input className="input-triangle" type="text" id="ac" placeholder="dlina AC" onChange={inputHandler} value={parseFloat(window.ggbApplet.getValue(`Segment(A,C)`)).toFixed(2)} readonly="readonly" />
              </div>
            ) : (null)}

          </li>
          <li><input type='checkbox' checked={check2} onChange={() => { toggleCheck2(!check2) }} /> Углы
            {check2 ? (
              <div className="input-points">
                A: <input className="input-triangle" type="text" id="bac" placeholder="(x,y)" onChange={inputHandler} value={angValues[0]} />
                B: <input className="input-triangle" type="text" id="abc" placeholder="(x,y)" onChange={inputHandler} value={angValues[1]} />
                C: <input className="input-triangle" type="text" id="acb" placeholder="(x,y)" onChange={inputHandler} value={angValues[2]} />
              </div>
            ) : (null)}

          </li>
        </ul>
      ) : (null)}
      {type === 'equal' ? (
        <ul className="optionList">
          <div className="input-points">
            a: <input className="input-triangle" type="text" id="bc" placeholder="dlina" onChange={inputHandler} value={temp} />
          </div>
        </ul>
      ) : (null)}
    </div>
  );
}