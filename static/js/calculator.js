
const cal = document.getElementById("cal");
const clr = document.getElementById("clr");
const sums = document.querySelectorAll(".sum")

clr.addEventListener("click", (e) => {
    let ingres = document.querySelectorAll(".ingre.in-meal");

    ingres.forEach((ingre) => {
        ingre.parentNode.removeChild(ingre);
    });
    
    sums.forEach((sum) => {
        sum.innerHTML = 0;
    });
    
});

