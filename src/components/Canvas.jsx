import React, { useState, useEffect, useRef } from 'react';

export default function Canvas({ brushSize, brushColor, isEraser }) {
    //state to keep track if user is drawing
    const [isDrawing, setIsDrawing] = useState(false);

    //useRef hook for accessing the canvas element by assingning this object to ref attribute
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        const canvasObject = canvasRef.current;
        canvasObject.width = window.innerWidth * 0.8;
        canvasObject.height = window.innerHeight * 0.8;

        const context = canvasObject.getContext('2d');
        context.lineCap = 'round';
        contextRef.current = context;
    }, []);

    //on brush size update
    useEffect(() => {
        contextRef.current.lineWidth = brushSize;
    }, [brushSize]);

    //on eraser
    useEffect(() => {
        contextRef.current.strokeStyle = isEraser ? 'white' : brushColor;
    }, [brushColor, isEraser]);

    //condition for touch or click
    const getCoordinates = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        //for touch screens
        if (event.touches) {
            const touch = event.touches[0];
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        } else { //for clicks
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }
    };

    //when mouse is pressed
    const mouseDownHandle = (event) => {
        const { x, y } = getCoordinates(event);
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);
        event.preventDefault();
    };

    //when mouse is released
    const mouseUpHandle = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (event) => {
        if (!isDrawing) return;

        const { x, y } = getCoordinates(event);
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
        event.preventDefault();
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        const file = document.createElement('a');
        file.href = canvas.toDataURL('image/png');
        file.download = 'canvas-image.png';
        file.click();
    };

    return (
        <div className='flex flex-col justify-center items-center mt-5'>
            <canvas
                ref={canvasRef}
                className='border border-gray-900 w-max'
                onMouseDown={mouseDownHandle}
                onMouseUp={mouseUpHandle}
                onMouseMove={draw}
                onTouchStart={mouseDownHandle}
                onTouchEnd={mouseUpHandle}
                onTouchMove={draw}
            />
            <button
                onClick={downloadImage}
                className='mt-5 px-4 py-2 bg-secondary text-tertiary font-semibold rounded'>
                Download Image
            </button>
        </div>
    );
}
