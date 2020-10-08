import React from 'react';
import './index.css';

export default function Navigation({
    state,
    resetArray,
    mergeSort,
    bubbleSort,
    heapSort,
    selectionSort,
    insertionSort,
    speedChange,
    sizeChange,
}){

    //Function the generates a new array and turns all bars back to turquoise
    function reset(){
        resetArray();
        const bars = document.getElementsByClassName("array-bar"); 

        for (let i = 0; i < bars.length; i++){
            const barStyle = bars[i].style;
            barStyle.backgroundColor = "turquoise";
        }
    };

    //Function that creates the swapping and comparison animations for merge sort
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
                }, i * state.speedSlider);

            //Else is no color change then we are overwritting a value in the main array
            } else {
                setTimeout(() => {
                    const [barOne, barHeight] = colorChanges[i];
                    const barOneStyle = bars[barOne].style;
                    barOneStyle.height = `${barHeight}px`;
                }, i * state.speedSlider);
            }
        }
    };

    //Function that displays the bubbling animations for bubble sort
    function bubble(){
        let colorChanges = bubbleSort(state.array);

         //Loop through the colorChange arrays
         for (let i = 0; i < colorChanges.length; i++){

            //Get all the array bars in the DOM
            const bars = document.getElementsByClassName("array-bar");

            //If first two arrays of a triplet, means a color change will happen
            const colorChange = colorChanges[i][0] !== "swap";

            //If colorChange is true then we need to change the color of the array bars
            if (colorChange){
                if (colorChanges[i][0] === "red" || colorChanges[i][0] === "turquoise"){
                    const [color, barOne, barTwo] = colorChanges[i];
                    const barOneStyle = bars[barOne].style;
                    const barTwoStyle = bars[barTwo].style;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * state.speedSlider);
                
                } else {
                    //Change the sorted bar to purple
                    const color = "purple";
                    const [barOne] = colorChanges[i];
                    const barOneStyle = bars[barOne].style;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                    }, i * state.speedSlider);
                }

            //Else is no color change then we are swapping the values or overwritting the same values in the array
            } else {
                setTimeout(() => {
                    const [color, barOne, barHeight] = colorChanges[i];
                    const barOneStyle = bars[barOne].style;
                    barOneStyle.height = `${barHeight}px`;
                }, i * state.speedSlider);
            }
        }
    }
    return (
        <nav>
            <div className="nav-title">Sorting Visualizer</div>
            <div className ="nav-sliders">
                <div className="size">
                    <h4>Array Size</h4>
                    <input type="range" min="50" max="100" value={state.sizeSlider} step="5" className="size-slider" onChange={(e) => sizeChange(e)}/>
                </div>
                <div className="speed">
                    <h4>Sorting Speed</h4>
                    <input type="range" min="1" max="51" value={state.speedSlider} step ="5" className="speed-slider" onChange={(e) => speedChange(e)}/>
                </div>
            </div>
            <div className="nav-reset">
                <button onClick={()=> reset()}>Generate New Array</button>
            </div>
            <div className="nav-sortStyle">
                <button onClick={()=> merge()}>Merge Sort</button>
                <button onClick={()=> bubble()}>Bubble Sort</button>
                <button onClick={()=> heapSort(state.array)}>Heap Sort</button>
                <button onClick={()=> selectionSort(state.array)}>Selection Sort</button>
                <button onClick={()=> insertionSort(state.array)}>Insertion Sort</button>
            </div>
        </nav>
    )
};