const ingres = document.querySelectorAll(".ingre");
const meal_zone = document.querySelectorAll("#meal-lane");

const displaycalo = document.getElementById("sum-calo");
const displaycarb = document.getElementById("sum-carb");
const displayfat = document.getElementById("sum-fat");
const displayprotein = document.getElementById("sum-protein");

let existingClone = false;

let ingre_in_meal = [];
let inputs = document.querySelectorAll(".input");

//set date
date = new Date();
date = date.toISOString().substring(0,10);
document.getElementById("date").value=date;

//drag and drop function
ingres.forEach((ingre) => {
    ingre.addEventListener("dragstart", () => {
        ingre.classList.add("is-dragging");
        existingClone = false;
    });
    ingre.addEventListener("dragend", () => {
        ingre.classList.remove("is-dragging");
    });
});

meal_zone.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        const curTask = document.querySelector(".is-dragging");

        if (!existingClone) {
            const clone = curTask.cloneNode(true);
            //   clone.classList.add("drag-clone");
            if (ingre_in_meal.includes(clone.id)) {
              clone.classList.remove("is-dragging");

            } else {
              clone.classList.add("in-meal");
              clone.classList.remove("is-dragging");
              clone.addEventListener("input", (e) => {
                  update();
              });
              ingre_in_meal.push(clone.id)
              zone.appendChild(clone);
              existingClone = true;
            }
        }
        update();
    });
});

function update() {
    let values = document.querySelectorAll(".ingre.in-meal"); // a div with class ingre in-meal
    let calo = 0;
    let carb = 0;
    let fat = 0;
    let protein = 0;
    values.forEach((value) => {
        let input = value.querySelector(".input").value / 100;
        protein += value.querySelector(".protein").value * input;
        fat += value.querySelector(".fat").value * input;
        carb += value.querySelector(".carb").value * input;
        calo += value.querySelector(".calo").value * input;

        display(parseInt(calo), parseInt(carb), parseInt(fat), parseInt(protein));
    });
}

function display(calo, carb, fat, protein) {
    let date = new Date()
    displaycalo.value = calo;
    displaycarb.value = carb;
    displayfat.value = fat;
    displayprotein.value = protein;
}

//clear button
const clr = document.getElementById("clr");
const sums = document.querySelectorAll(".sum")

clr.addEventListener("click", clear);

function clear() {
    let ingres = document.querySelectorAll(".ingre.in-meal");

    ingres.forEach((ingre) => {
        ingre.parentNode.removeChild(ingre);
    });    

    ingre_in_meal = [];
    display(null, null, null, null);
}

//add meal to database
$(document).on('submit','#meal-form', function(e){
    e.preventDefault();

    $.ajax({
        type:'POST',
        url:'/send',
        data: {
            user:$('#username').val(),
            date:$('#date').val(),
            type:$('#type').val(),
            calo:$('#sum-calo').val(),
            carb:$('#sum-carb').val(),
            fat:$('#sum-fat').val(),
            protein:$('#sum-protein').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        },
        success: function(data) {
            if(!alert('reload to see the new meal')){window.location.reload();}
        }
    });
    clear();
});


