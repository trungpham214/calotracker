const draggables = document.querySelectorAll(".ingre");
const droppables = document.querySelectorAll("#meal-lane");
let existingClone = false;

const displaycalo = document.getElementById("sum-calo");
const displaycarb = document.getElementById("sum-carb");
const displayfat = document.getElementById("sum-fat");
const displayprotein = document.getElementById("sum-protein");

let inputs = document.querySelectorAll(".input");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
        existingClone = false;
        console.log(task.id);
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});


droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    const curTask = document.querySelector(".is-dragging");

    if (!existingClone) {
      const clone = curTask.cloneNode(true);
    //   clone.classList.add("drag-clone");
      clone.classList.add("in-meal");
      clone.classList.remove("is-dragging");
        clone.addEventListener("input", (e) =>{
        update();
    })
      zone.appendChild(clone);
      existingClone = true;
    }
    update();
    
  });
});


function update() {
    let values = document.querySelectorAll(".ingre.in-meal .input");

    // e.preventDefault();
    let sumcalo = 0;
    let sumcarb = 0;
    let sumfat = 0;
    let sumprotein = 0;


    values.forEach((value) => {
        sumcalo += parseInt(value.value);
    });

    displaycalo.innerHTML = sumcalo;
    displaycarb.innerHTML = sum;
    displayfat.innerHTML = sum;
    displayprotein.innerHTML = sum;

}



