import { useState, useEffect } from "react";


export default function useApplicationData(){

    //This custom hook is the beiung used to manage the overall data of the app.
    const [state, setState] = useState({
        array: [100, 50, 12, 40, 10],
        sizeSlider: 5,
        speedSlider: 3,
        clicked: false
    });

    //function that generates a new array with randomized numbers
    function resetArray(){
        let array = [];
        for (let i = 0; i <= state.sizeSlider; i++){
            array.push(Math.floor(Math.random() * (800 - 5 + 1) + 5));
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
    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

    //function that creates a max heap to sort an array in ascending order
    function heapRoot(arr, length, index) {
        let leftChild = 2 * index + 1;
        let rightChild = 2 * index + 2;
        let parent = index;
    
        if (leftChild < length && arr[leftChild] > arr[parent]) {
            parent = leftChild;
        }
    
        if (rightChild < length && arr[rightChild] > arr[parent]) {
            parent = rightChild;
        }
    
        if (parent != index) {
            swap(arr, parent, index);
            heapRoot(arr, length, parent);
        }
    };

    //Function that uses the max heap data structure to sort the array
    function heapSort(arr) {
        let n = arr.length;
        let i = Math.floor(n / 2 - 1);
        let k = n - 1;
    
        while (i >= 0) {
            heapRoot(arr, n, i);
            i--;
        }
    
        while (k >= 0) {
            swap(arr, 0, k);
            heapRoot(arr, k, 0);
            k--;
        }
    
        setState({
            array: arr
        });
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
  
        //Loop through all of the elements in the array
        for (let i = 0; i < arr.length; i++){
            let minIndex = i;
  
            for (let j = i + 1; j < arr.length; j++){
                if (arr[minIndex] > arr[j]){
                    minIndex = j;
                }
            }
            [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
        }
        setState({
            array: arr
        });
    };

    //Function that sorts an array in ascending order
    function insertionSort(arr) {
        const n = arr.length;
  
        //Loop through all of the elements of the array starting at index 1
        for (let i = 1; i < n; i++) {
            
            let el = arr[i];
            let j = i - 1;
  
            //removes the el and inserts the preceeding element in its place
            while (j >= 0 && el < arr[j]) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
  
            arr[j + 1] = el;
        }
        setState({
            array: arr
        });
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


