import React from "react";
import SortingVisualizer from "./components/SortingVisualizer";
import Navigation from "./components/Navigation";
import logo from "./logo.svg";
import "./App.css";
import useApplicationData from "./hooks/useApplicationData";

export default function App() {

  const {
    state,
    resetArray,
    mergeSort,
    heapSort,
    bubbleSort,
    selectionSort,
    insertionSort
  } = useApplicationData();

  return (
    <div className="contentBox">
      <Navigation
        state={state}
        resetArray={resetArray}
        mergeSort={mergeSort}
        heapSort={heapSort}
        bubbleSort={bubbleSort}
        selectionSort={selectionSort}
        insertionSort={insertionSort}>
      </Navigation>
      <SortingVisualizer 
        state={state}
        resetArray={resetArray}
        mergeSort={mergeSort}
        heapSort={heapSort}
        bubbleSort={bubbleSort}
        selectionSort={selectionSort}
        insertionSort={insertionSort}>
      </SortingVisualizer>
    </div>
  );
}
