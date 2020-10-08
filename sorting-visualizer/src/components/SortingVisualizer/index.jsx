import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

export default function SortingVisualizer({
  state
}) {
  //Set the width of each array bar based on the array length
  let length = state.array.length.toString();
  const barWidth = {
    "50": 20,
    "55": 19,
    "60": 17,
    "65": 16,
    "70": 14,
    "75": 13,
    "80": 12,
    "85": 11,
    "90": 11,
    "95": 10,
    "100": 9
  };

  return (
      <div className="array-container">
        <div className="array-bar-container">
          {state.array.map((value, index) => 
            <div 
              className="array-bar" 
              key={index}
              style={{height: `${value}px`, width: `${barWidth[length]}px`}}></div>
          )}
            </div>
        </div>
  )
}
