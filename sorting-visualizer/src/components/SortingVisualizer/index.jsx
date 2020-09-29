import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

export default function SortingVisualizer({
  resetArray,
  state,
  mergeSort
}) {

  return (
      <div className="array-container">
        {state.array.map((value, index) => 
          <div 
            className="array-bar" 
            key={index}
            style={{height: `${value}px`}}></div>
        )}
        <button onClick={()=> resetArray()}>Generate New Array</button>
        <button onClick={()=> mergeSort(state.array)}>Merge Sort</button>
        <button onClick={()=> resetArray()}>Bubble Sort</button>
        <button onClick={()=> resetArray()}>Heap Sort</button>
        <button onClick={()=> resetArray()}>Selection Sort</button>
      </div>
  )
}
