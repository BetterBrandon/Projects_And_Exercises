const form = document.querySelector("#search");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let search = this.elements.query.value;
    // console.log("Submitted");
    // console.dir(this);
    // console.log(this.elements.query.value);
    let configs = { params: { q: search } };
    let result = await axios.get(` https://api.tvmaze.com/search/shows`, configs);
    // console.log(res.data[0].show.image.medium);

    displayImages(result.data);
    this.elements.query.value = "";
})

function displayImages(shows) {
    for (let currentShow of shows) {
        if (currentShow.show.image) {
            let img = document.createElement("img");
            img.src = currentShow.show.image.medium;
            document.body.append(img);
        }

    }
}