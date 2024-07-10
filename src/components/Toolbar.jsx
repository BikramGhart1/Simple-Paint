import React, { useState } from 'react'

export default function Toolbar({ erase, brush, selectColor, getBrushSize, brushSize }) {

    //state for size of brush, initially 3
    const [brushSizeInput, setBrushSizeInput] = useState(brushSize);

    //state for dropdown of color palettes
    const [colorIsOpen, setColorIsOpen] = useState(false);

    //available colors
    const colors = [
        { name: 'Red', color: 'rgb(255, 0, 0)' },
        { name: 'Green', color: 'rgb(0, 128, 0)' },
        { name: 'Blue', color: 'rgb(0, 0, 255)' },
        { name: 'Yellow', color: 'rgb(255, 255, 0)' },
        { name: 'Orange', color: 'rgb(255, 165, 0)' },
        { name: 'Purple', color: 'rgb(128, 0, 128)' },
        { name: 'Pink', color: 'rgb(255, 192, 203)' },
        { name: 'Brown', color: 'rgb(165, 42, 42)' },
        { name: 'Gray', color: 'rgb(128, 128, 128)' },
        { name: 'Black', color: 'rgb(0, 0, 0)' },
        { name: 'White', color: 'rgb(255, 255, 255)' },
        { name: 'Cyan', color: 'rgb(0, 255, 255)' },
        { name: 'Magenta', color: 'rgb(255, 0, 255)' },
        { name: 'Lime', color: 'rgb(0, 255, 0)' },
        { name: 'Navy', color: 'rgb(0, 0, 128)' },
        { name: 'Teal', color: 'rgb(0, 128, 128)' },
        { name: 'Olive', color: 'rgb(128, 128, 0)' },
        { name: 'Maroon', color: 'rgb(128, 0, 0)' },
        { name: 'Gold', color: 'rgb(255, 215, 0)' },
        { name: 'Silver', color: 'rgb(192, 192, 192)' },
        { name: 'Beige', color: 'rgb(245, 245, 220)' },
        { name: 'Coral', color: 'rgb(255, 127, 80)' },
        { name: 'Crimson', color: 'rgb(220, 20, 60)' },
        { name: 'DarkBlue', color: 'rgb(0, 0, 139)' },
        { name: 'DarkCyan', color: 'rgb(0, 139, 139)' },
        { name: 'DarkGoldenRod', color: 'rgb(184, 134, 11)' },
        { name: 'DarkGray', color: 'rgb(169, 169, 169)' },
        { name: 'DarkGreen', color: 'rgb(0, 100, 0)' },
        { name: 'DarkKhaki', color: 'rgb(189, 183, 107)' },
        { name: 'DarkMagenta', color: 'rgb(139, 0, 139)' },
        { name: 'DarkOliveGreen', color: 'rgb(85, 107, 47)' },
        { name: 'DarkOrange', color: 'rgb(255, 140, 0)' },
        { name: 'DarkOrchid', color: 'rgb(153, 50, 204)' },
        { name: 'DarkRed', color: 'rgb(139, 0, 0)' },
        { name: 'DarkSalmon', color: 'rgb(233, 150, 122)' },
        { name: 'DarkSeaGreen', color: 'rgb(143, 188, 143)' },
        { name: 'DarkSlateBlue', color: 'rgb(72, 61, 139)' },
        { name: 'DarkSlateGray', color: 'rgb(47, 79, 79)' },
        { name: 'DarkTurquoise', color: 'rgb(0, 206, 209)' },
        { name: 'DarkViolet', color: 'rgb(148, 0, 211)' },
        { name: 'DeepPink', color: 'rgb(255, 20, 147)' },
        { name: 'DeepSkyBlue', color: 'rgb(0, 191, 255)' }
    ];

    return (
        <div className='flex flex-row justify-around items-center pt-2 text-tertiary font-bold  bg-primary'>
            <div>
                <button className='btn' onClick={() => { brush() }} >Brush</button>
            </div>


            <div className='w-max text-tertiary flex flex-col pb-3'>
                <label htmlFor="">brush/eraser size</label>
                <div className='flex flex-row'>
                    <input
                        className='pl-5 w-14 mr-3  border-0 outline-none text-slate-700'
                        type="number" min={1} max={10}
                        placeholder='1-10'
                        value={brushSizeInput}
                        onChange={(e) => setBrushSizeInput(e.target.value)} />
                    <button className='btn' onClick={() => { getBrushSize(brushSizeInput) }}>Ok</button>
                </div>

            </div>



            <div>
                <button className='btn' onClick={() => { erase() }} >Eraser</button>
            </div>

            <div className='relative w-max'>
                <div className=' pr-3'>
                    <button className='btn flex flex-row justify-between items-center' onClick={() => { setColorIsOpen((prev) => !prev) }}>
                        <em className='not-italic pr-2'>Colors</em>

                        {colorIsOpen ?
                            (
                                <img src='../public/arrow-up.png' alt='^' className='w-4 ' />
                            ) :
                            (
                                <img src='../public/arrow-down.png' alt='v' className='w-4 ' />
                            )}
                    </button>

                </div>

                {colorIsOpen &&
                    <div
                        className='absolute top-12 p-7 right-1 w-max grid grid-cols-6 gap-3 text-black bg-opacity-50 bg-secondary'>
                        {colors.map((colorItem, index) => (

                            <button key={index}
                                onClick={() => {
                                    selectColor(colorItem.color);
                                    setColorIsOpen(false);
                                }}
                                className='w-12 h-12 border border-tertiary'
                                style={{ backgroundColor: colorItem.color }}></button>
                        ))}
                    </div>

                }
            </div>


        </div>
    )
}
