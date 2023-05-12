let rdm_arr = document.getElementById('random_array_btn');
let sort_btn = document.getElementById('sort_btn');
let bar_container = document.getElementById('bar_container')
let minRange = 1;
let maxRange = 20;
let barCount = 25;
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
                        bar[k].style.backgroundColor = "white";
                    }   
                }
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                bar[j].style.height = arr[j] * 10 + "px";
                bar[j].style.backgroundColor = "lightgreen";
                // bar[j].style.innerText = arr[j];
                bar[j + 1].style.height = arr[j + 1] * 10 + "px";
                bar[j + 1].style.backgroundColor = "lightgreen";
                // bar[j + 1].style.innerText = arr[j + 1];
                await sleep(100);
            }
        }
        await sleep(100);
    }
    return arr;
}
sort_btn.addEventListener('click', function () {
    let sorted_arr = bubbleSort(unsorted_arr);
    console.log(sorted_arr);
})

