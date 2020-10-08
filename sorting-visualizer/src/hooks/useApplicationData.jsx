import { useState, useEffect } from "react";


export default function useApplicationData(){

    //This custom hook is the beiung used to manage the overall data of the app.
    const [state, setState] = useState({
        array: [],
        sizeSlider: 50,
        speedSlider: 1,
        clicked: false
    });

    //function that generates a new array with randomized numbers
    function resetArray(){
        let array = [];
        for (let i = 0; i < state.sizeSlider; i++){
            array.push(Math.floor(Math.random() * (700 - 5 + 1) + 5));
        }
        setState(prev => ({
            ...prev,
            array: array,
            clicked: false
        }));
    };

    //Once the comonpent loads 
    useEffect(() => {
        resetArray();
    }, []);

//Driver or main function that runs the merge sort algorithm
function mergeSort(arr){
    let colorChange = [];
    let helperArr = arr.slice();
    mergePartitions(arr, 0, arr.length - 1, helperArr, colorChange);
    return colorChange;

};

//Function that creates partitions for the array
function mergePartitions(arr, start, end, helperArr, colorChange){
    if (start === end){
        return;
    }

    const middle = Math.floor((start + end) / 2);
    mergePartitions(helperArr, start, middle, arr, colorChange);
    mergePartitions(helperArr, middle + 1, end, arr, colorChange);
    merge(arr, start, middle, end, helperArr, colorChange);
};

//Function that compares values and merges the subarrays together
function merge(arr, start, middle, end, helperArr, colorChange){
    let i = start;
    let k = start;
    let j = middle + 1;

    //Compare values in the helper array and overwrite them into the main array 
    while (i <= middle && j <= end){
        
        //push the values that are being compared to the color change array to change their color
        colorChange.push([i, j]);

        //push them again to change their color back 
        colorChange.push([i, j]);

        if (helperArr[i] <= helperArr[j]){
            colorChange.push([k, helperArr[i]]);
            arr[k++] = helperArr[i++];
        } else {
            colorChange.push([k, helperArr[j]]);
            arr[k++] = helperArr[j++];
        }
    }

    //Make sure to copy the left side and right side of the helper array into the main array
    while (i <= middle){
        colorChange.push([i, i]);
        colorChange.push([i, i]);
        colorChange.push([k, helperArr[i]]);
        arr[k++] = helperArr[i++];
    }

    while (j <= end){
        colorChange.push([j, j]);
        colorChange.push([j, j]);
        colorChange.push([k, helperArr[j]]);
        arr[k++] = helperArr[j++];
    }
};
    //function that swaps two values
    function swap(arr, i, j, colorChange) {
        let temp = arr[i];
        arr[i] = arr[j];

        //push the swap animation to the colorChange array
        colorChange.push(["swap", i, arr[j]]);

        arr[j] = temp;
        colorChange.push(["swap", j, temp]);
       
    };

    //function that creates a max heap to sort an array in ascending order
    function heapRoot(arr, length, index, colorChange) {
        let leftChild = 2 * index + 1;
        let rightChild = 2 * index + 2;
        let parent = index;
    
        if (leftChild < length && arr[leftChild] > arr[parent]) {
            colorChange.push(["red", parent, leftChild]);
            colorChange.push(["turquoise", parent, leftChild]);
            parent = leftChild;
        }
    
        if (rightChild < length && arr[rightChild] > arr[parent]) {
            colorChange.push(["red", parent, rightChild]);
            colorChange.push(["turquoise", parent, rightChild]);
            parent = rightChild;
        }
    
        if (parent != index) {
            swap(arr, parent, index, colorChange);
            heapRoot(arr, length, parent, colorChange);
        }
    };

    //Function that uses the max heap data structure to sort the array
    function heapSort(arr) {
        let colorChange = [];
        let n = arr.length;
        let i = Math.floor(n / 2 - 1);
        let k = n - 1;
    
        while (i >= 0) {
            heapRoot(arr, n, i, colorChange);
            i--;
        }
    
        while (k >= 0) {
            swap(arr, 0, k, colorChange);
            heapRoot(arr, k, 0, colorChange);
            k--;
        }
        return colorChange;
    };

    //Function that sorts an array in ascending order by bubbling elements to their respective positions
    function bubbleSort(arr) {
        
        //Color changes array to keep track of the values being compared
        let colorChanges = [];

        //Loop through all of the elements of the array
        for (let i = 0; i < arr.length; i++) { 
            let swapped = false;
  
            for (let j = 0; j < arr.length - i - 1; j++) {
                
                //Push the values being compared to the colorChanges array to change their color
                colorChanges.push(["red", j, j + 1]);
                colorChanges.push(["turquoise", j, j + 1]);

                //If the current element is greater than it's following element then swapped them
                if (arr[j] > arr[j + 1]) {

                    colorChanges.push(["swap", j, arr[j + 1]]);
                    colorChanges.push(["swap", j + 1, arr[j]]);
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
  
                    //Set the boolean tracker to true
                    swapped = true;
                
                } else {
                    colorChanges.push(["swap", j, arr[j]]);
                    colorChanges.push(["swap", j + 1, arr[j + 1]]);
                }
            }
            //Change the color of the last sorted element
            colorChanges.push([arr.length - 1 - i]);

            //If no elements were swap then break out of the outer loop and the array is sorted
            if (!swapped) {
                
                //Need to complete the coloring of sorted elements in the event that we break out of the outer loop
                const cycles = arr.length - 1 - i;
                for (let k = 0; k < cycles; k++){
                    i++;
                    colorChanges.push([arr.length - 1 - i]);
                }
                break;
            }
        }
        return colorChanges;
  };

    //Function that sorts an array in ascending order by finding the min value and placing it at the start of the array
    function selectionSort(arr) {
        
        let colorChange = [];
        //Loop through all of the elements in the array
        for (let i = 0; i < arr.length; i++){
            let minIndex = i;
  
            for (let j = i + 1; j < arr.length; j++){

                //Add the values being compared to the colorchange array
                colorChange.push(["red", minIndex, j]);
                colorChange.push(["turquoise", minIndex, j]);

                if (arr[minIndex] > arr[j]){
                    minIndex = j;
                }
            }
            //Add the swap animations to the colorchange array
            colorChange.push(["swap", i, arr[minIndex]]);
            colorChange.push(["swap", minIndex, arr[i]]);
            [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
        }
        return colorChange;
    };

    //Function that sorts an array in ascending order
    function insertionSort(arr) {
        const n = arr.length;

        let colorChange = [];
  
        //Loop through all of the elements of the array starting at index 1
        for (let i = 1; i < n; i++) {
            
            let el = arr[i];
            let j = i - 1;
  
            //removes the el and inserts the preceeding element in its place
            while (j >= 0 && el < arr[j]) {

                //Add the comparison animations to the color change array
                colorChange.push(["red", i, j]);
                colorChange.push(["turquoise", i, j]);

                //Add the swap animations to the color change array
                colorChange.push(["swap", j + 1, arr[j]]);
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            colorChange.push(["swap", j + 1, el]);
            arr[j + 1] = el;
        }
        return colorChange;
    };

    //Function that sets the state for the value of the slider 
    function sizeChange(e){
        let size = e.target.value;
        setState(prev => ({
            ...prev,
            sizeSlider: size
        }))
    };

     //Function that sets the state for the value of the slider 
     function speedChange(e){
        let speed = e.target.value;
        setState(prev => ({
            ...prev,
            speedSlider: speed
        }))
    };

    return {
        state,
        resetArray,
        mergeSort,
        heapSort,
        bubbleSort,
        selectionSort,
        insertionSort,
        speedChange,
        sizeChange,
    }
};


