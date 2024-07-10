import React, { useState } from 'react'
import { useEffect, useRef } from 'react'

export default function Canvas({ brushSize, brushColor, isEraser }) {

    //state to keep track if user is drawing or not
    const [isDrawing, setIsDrawing] = useState(false);

    //ref elements to access canvas and its context 
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        //after assigning canvaRef to ref attribute of canvas element we can access the canvas with canvasRef.current
        const canvasObject = canvasRef.current;

        //define size of canvas
        canvasObject.width = window.innerWidth * 0.8;
        canvasObject.height = window.innerHeight * 0.8;

        //get context of canvas
        const context = canvasObject.getContext('2d');
        context.lineCap = 'round'

        //assign above context to contextRef to access later
        contextRef.current = context;


    }, [])

    //when brush size changes
    useEffect(() => {
        contextRef.current.lineWidth = brushSize;
    }, [brushSize])

    //when eraser is clicked cahnge color to white
    useEffect(() => {
        contextRef.current.strokeStyle = isEraser ? 'white' : brushColor;
    }, [brushColor, isEraser])


    // when mouse is pressed
    const mouseDownHandle = ({ nativeEvent }) => {
        //defactor and find the coordinates of mouse
        const { clientX, clientY } = nativeEvent;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        //start line
        contextRef.current.beginPath();

        //initial position of line
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);

    }

    //when mouse is released
    const mouseUpHandle = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    //draw function
    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return
        }

        const { clientX, clientY } = nativeEvent;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        //final position of line
        contextRef.current.lineTo(x, y);

        //make line visible
        contextRef.current.stroke();
    }


    const downloadImage = () => {
        const canvas = canvasRef.current;

        //create <a> anchor element
        const file = document.createElement('a');

        //converts the canvas content to a data URL representing the image in PNG format
        file.href = canvas.toDataURL('image/png');
        file.download = 'canvas-image.png';

        //triger download
        file.click();
    };


    return (
        <div className='flex flex-col justify-center items-center mt-5 '>
            <canvas ref={canvasRef} className='border border-gray-900 w-max '
                onMouseDown={mouseDownHandle}
                onMouseUp={mouseUpHandle}
                onMouseMove={draw} />

            <button
                onClick={downloadImage}
                className='mt-5 px-4 py-2 bg-secondary text-tertiary font-semibold rounded'>
                Download Image
            </button>

        </div>
    )
}
