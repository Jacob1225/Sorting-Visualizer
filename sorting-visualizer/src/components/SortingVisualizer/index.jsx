import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

export default function SortingVisualizer({
  state
}) {

  return (
      <div className="array-container">
        {state.array.map((value, index) => 
          <div 
            className="array-bar" 
            key={index}
            style={{height: `${value}px`}}></div>
        )}
      </div>
  )
}
