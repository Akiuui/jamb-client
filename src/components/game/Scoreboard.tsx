import React, { useState } from 'react'

function Scoreboard() {

    const rows = 17
    const cols = 9

    const jamb = {
        "00": "Yamb",
        "01": "Down",
        "02": "Free",
        "03": "N",
        "04": "R",
        "05": "D",
        "06": "FromMiddle",
        "07": "ToMiddle",
        "08": "O",
        "09": "M",
        "010": "Yamb",
        "10": "1",
        "20": "2",
        "30": "3",
        "40": "4",
        "50": "5",
        "60": "6",
        "70": "M",
        "80": "Max",
        "90": "Min",
        "100": "@",
        "110": "Kenta",
        "120": "Triling",
        "130": "Ful",
        "140": "Poker",
        "150": "Yamb",
        "160": "M" 
      }
    
      const [clickedCells, setClickedCells] = useState({});
    
      const handleClick = (row, col) => {
        const key = `${row}${col}`;
        setClickedCells(prev => ({
          ...prev,
          [key]: !prev[key],
        }));
      };
    
      const gridElements = [];
    
      for (let row = 0; row < rows; row++) {
        const rowCells = [];
        for (let col = 0; col < cols; col++) {
          const key = `${row}${col}`;
          const isActive = clickedCells[key];
          rowCells.push(
            <div
              key={col}
              className={`grid-cell ${isActive ? "active" : ""}`}
              onClick={() => handleClick(row, col)}
            >
              {jamb[key]}
            </div>
          );
        }
        gridElements.push(
          <div className="grid-row" key={row}>
            {rowCells}
          </div>
        );
      }

    return (
        <>
            <div className="grid">{gridElements}</div>
        </>
    )
}

export default Scoreboard


