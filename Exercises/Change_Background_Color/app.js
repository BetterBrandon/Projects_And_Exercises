let btn = document.querySelector("button");
let h1 = document.querySelector("h1");

btn.addEventListener("click", function () {
    // console.log(randomColor(), randomColor(), randomColor())
    let r = randomColor();
    let g = randomColor();
    let b = randomColor();
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    h1.innerText = `rgb(${r}, ${g}, ${b})`;
})

function randomColor() {
    return (Math.floor(Math.random() * 255));
}