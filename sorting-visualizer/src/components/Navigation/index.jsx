import React from 'react';
import './index.css';

export default function Navigation({
    state,
    resetArray,
    mergeSort,
    bubbleSort,
    heapSort,
    selectionSort,
    insertionSort
}){

    function merge(){
        let colorChanges = mergeSort(state.array);

        //Loop through the colorChange arrays
        for (let i = 0; i < colorChanges.length; i++){

            //Get all the array bars in the DOM
            const bars = document.getElementsByClassName("array-bar");

            //If first two arrays of a triplet, means a color change will happen
            const colorChange = i % 3 !== 2;

            //If colorChange is true then we need to change the color of the array bars
            if (colorChange){
                const [barOne, barTwo] = colorChanges[i];
                const barOneStyle = bars[barOne].style;
                const barTwoStyle = bars[barTwo].style;

                //If first color change of triplet we want the bars being compared to turn red
                const color = i % 3 === 0 ? "red" : "turquoise";
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 10);

            //Else is no color change then we are overwritting a value in the main array
            } else {
                setTimeout(() => {
                    const [barOne, barHeight] = colorChanges[i];
                    const barOneStyle = bars[barOne].style;
                    barOneStyle.height = `${barHeight}px`;
                }, i * 10);
            }
        }
    }
    return (
        <nav>
            <div className="nav-reset">
                <button onClick={()=> resetArray()}>Generate New Array</button>
            </div>
            <div className="nav-sortStyle">
                <button onClick={()=> merge()}>Merge Sort</button>
                <button onClick={()=> bubbleSort(state.array)}>Bubble Sort</button>
                <button onClick={()=> heapSort(state.array)}>Heap Sort</button>
                <button onClick={()=> selectionSort(state.array)}>Selection Sort</button>
                <button onClick={()=> insertionSort(state.array)}>Insertion Sort</button>
            </div>
        </nav>
    )
};