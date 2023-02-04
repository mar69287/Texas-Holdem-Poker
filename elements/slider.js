let slider = document.getElementById("myslider");
let output = document.getElementById("value");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value
}

slider.addEventListener("input", function () {
    let x = slider.value;
})