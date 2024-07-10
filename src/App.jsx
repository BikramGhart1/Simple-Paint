
import { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'

function App() {

  //state for brush size, brush color and state of eraser
  const [brushSize, setBrushSize] = useState(3);
  const [brushColor, setBrushColor] = useState('black');
  const [isEraser, setIsEraser] = useState(false);


  const erase = () => {
    setIsEraser(true);
    console.log("Eraseee");
  }

  //callback function for getting size of brush from input
  const getBrushSize = (size) => {
    setBrushSize(size);
  }

  //when brush button is clicked
  const brush = () => {
    setIsEraser(false);
  }

  //select color
  const selectColor = (selectedColor) => {
    setBrushColor(selectedColor);

  }

  return (
    <>
      <Toolbar erase={erase} brush={brush} selectColor={selectColor} getBrushSize={getBrushSize} brushSize={brushSize} />
      <Canvas brushSize={brushSize} brushColor={brushColor} isEraser={isEraser} />

    </>
  )
}

export default App
