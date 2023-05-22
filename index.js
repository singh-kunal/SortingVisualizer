let rdm_arr = document.getElementById('random_array_btn');
let sort_btn = document.getElementById('sort_btn');
let bar_container = document.getElementById('bar_container')
let bar_count_slider = document.getElementById('bar_count_slider');
let bar_count_label = document.getElementById('bar_count_label');
let speed_select = document.getElementById('speed_select');
let algorithm_select = document.getElementById('algorithm_select');
let minRange = 1;
let maxRange = 50;
let barCount = parseInt(bar_count_slider.value);
let heightFactor = 6.5;
let unsorted_arr = new Array(barCount);
let sortingSpeed = parseInt(speed_select.value);
let selectedAlgorithm = algorithm_select.value;

function rdmNum(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomArr() {
    barCount = parseInt(bar_count_slider.value);
    bar_count_label.textContent = "Number of Bars: " + barCount;
    unsorted_arr = new Array(barCount);
    for(let i = 0; i< barCount; i++){
        unsorted_arr[i] = rdmNum(minRange,maxRange);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    generateRandomArr();
    renderBars(unsorted_arr);
});

function renderBars(arr){
    bar_container.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] * heightFactor + "px";
        bar_container.appendChild(bar);        
    }
}

function updateSortingSpeed() {
    sortingSpeed = parseInt(speed_select.value);
}

function updateSelectedAlgorithm() {
    selectedAlgorithm = algorithm_select.value;
}

bar_count_slider.addEventListener("input", function () {
    generateRandomArr();
    renderBars(unsorted_arr);
});

speed_select.addEventListener("change", function () {
    updateSortingSpeed();
});

algorithm_select.addEventListener("change", function () {
    updateSelectedAlgorithm();
});

rdm_arr.addEventListener("click", function () {
    generateRandomArr();
    renderBars(unsorted_arr);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
    let n = arr.length;
    let bar = document.getElementsByClassName("bar");
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                for (let k = 0; k < bar.length; k++) {
                    if(k !== j && k !== j+1){
                        bar[k].style.backgroundColor = "rgb(194, 17, 120)";
                    }   
                }
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bar[j].style.height = arr[j] * heightFactor + "px";
                bar[j].style.backgroundColor = "white";
                bar[j + 1].style.height = arr[j + 1] * heightFactor + "px";
                bar[j + 1].style.backgroundColor = "white";
                await sleep(sortingSpeed);
            }
        }
        await sleep(sortingSpeed);
    }
    return arr;
}

async function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    const bars = document.getElementsByClassName("bar");
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    await mergeSort(left);
    await mergeSort(right);
  
    let i = 0;
    let j = 0;
    let k = 0;
  
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        bars[k].style.height = arr[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "white";
        if (k + arr.length < bars.length) {
            bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
            bars[k + arr.length].style.backgroundColor = "yellow";
        }
        await sleep(sortingSpeed);
        k++;
        }
  
        while (i < left.length) {
            arr[k] = left[i];
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "white";
            await sleep(sortingSpeed);
            i++;
            k++;
        }
        while (j < right.length) {
            arr[k] = right[j];
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "white";
            await sleep(sortingSpeed);
            j++;
            k++;
        }
        for (let k = 0; k < bars.length; k++) {
            bars[k].style.backgroundColor = "rgb(194, 17, 120)";
        }
        return arr;
    }
  
function mergeSortD(arr, start, end) {
    if (arr.length < 2) {
        return arr;
    }
    let middle = Math.floor((start + end) / 2);
    let left = arr.slice(start, middle);
    let right = arr.slice(middle, end);
    mergeSort(right);
}
  
async function insertionSort(arr) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "white";
            await sleep(sortingSpeed);
    
            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) {
                    bars[k].style.backgroundColor = "rgb(194, 17, 120)";
                }
            }
            j = j - 1;
        }
        arr[j + 1] = key;
        bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "rgb(245, 242, 83)";
        await sleep(sortingSpeed);
    }
  
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "rgb(194, 17, 120)";
    }
    return arr;
}

async function sortArray(arr) {
    if (selectedAlgorithm === 'bubble') {
        await bubbleSort(arr);
    } else if (selectedAlgorithm === 'merge') {
        await mergeSort(arr);
    } else if (selectedAlgorithm === 'insertion') {
        await insertionSort(arr);
    }
    return arr;
}

sort_btn.addEventListener('click', function () {
    let sorted_arr = sortArray(unsorted_arr);
    console.log(sorted_arr);
});

