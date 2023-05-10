let rdm_arr = document.getElementById('random_array_btn');
let sort_btn = document.getElementById('sort_btn');
let bar_container = document.getElementById('bar_container')
let minRange = 1;
let maxRange = 20;
let barCount = 10;
let unsorted_arr = new Array(barCount);

function rdmNum(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomArr() {
    for(let i = 0; i< barCount; i++){
        unsorted_arr[i] = rdmNum(minRange,maxRange);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    generateRandomArr();
    renderBars(unsorted_arr);
    
});

function renderBars(arr){
    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] * 10 + "px";
        bar_container.appendChild(bar);        
    }
}

rdm_arr.addEventListener("click", function () {
    generateRandomArr();
    bar_container.innerHTML = "";
    renderBars(unsorted_arr);
})

function bubbleSort(arr) {
    const n = arr.length;
    let bar = document.getElementsByClassName("bar");
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bar[j].style.height = arr[j] * 10 + "px";
                bar[j].style.backgroundColor = "lightgreen";
                bar[j].style.innerText = arr[j];
                bar[j + 1].style.height = arr[j + 1] * 10 + "px";
                bar[j + 1].style.backgroundColor = "lightgreen";
                bar[j + 1].style.innerText = arr[j + 1];
            }
        }
    }
    return arr;
}
sort_btn.addEventListener('click', function () {
    let sorted_arr = bubbleSort(unsorted_arr);
    console.log(sorted_arr);
})
  