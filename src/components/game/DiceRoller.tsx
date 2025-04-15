import React, { useState } from "react";

const DiceRoller = ({username}) => {

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-2 p-2 bg-indigo-500 shadow-md">
      {/* Username Bubble */}
      <div className="
        absolute
        left-4
        -top-7
        md:static md:mb-0
        bg-indigo-500 text-white px-3 py-1 text-sm font-semibold shadow
        transition-all
      ">
        {username}
      </div>

      {/* Dice */}
      <div className="flex flex-1 justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div  
            key={i}
            className="flex-1 max-w-[60px] aspect-square border border-white bg-white text-center flex items-center justify-center text-xl font-bold rounded"
          > 
            <img src={`/dice/dice${i + 1}.svg`} alt={`Dice ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Roll Button */}
      <button className="ml-4 px-4 py-2 bg-white text-indigo-600 font-semibold rounded hover:bg-indigo-100 transition">
        Roll
      </button>
    </div>
  );
};

export default DiceRoller;