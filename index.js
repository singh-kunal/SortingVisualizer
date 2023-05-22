let rdm_arr = document.getElementById('random_array_btn');
let sort_btn = document.getElementById('sort_btn');
let bar_container = document.getElementById('bar_container')
let bar_count_slider = document.getElementById('bar_count_slider');
let bar_count_label = document.getElementById('bar_count_label');
let minRange = 1;
let maxRange = 50;
let barCount = parseInt(bar_count_slider.value);
let heightFactor = 6.5;
let unsorted_arr = new Array(barCount);

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
bar_count_slider.addEventListener("input", function () {
    generateRandomArr();
    renderBars(unsorted_arr);
});

rdm_arr.addEventListener("click", function () {
    generateRandomArr();
    renderBars(unsorted_arr);
})

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
                // bar[j].style.innerText = arr[j];
                bar[j + 1].style.height = arr[j + 1] * heightFactor + "px";
                bar[j + 1].style.backgroundColor = "white";
                // bar[j + 1].style.innerText = arr[j + 1];
                await sleep(50);
            }
        }
        await sleep(50);
    }
    return arr;
}
sort_btn.addEventListener('click', function () {
    let sorted_arr = bubbleSort(unsorted_arr);
    console.log(sorted_arr);
})

