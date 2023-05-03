let list = document.querySelector("#list");
const button = document.querySelector("button");


async function getDadJoke() {
    try {
        const config = { headers: { Accept: "application/json" } };
        const res = await axios.get("https://icanhazdadjoke.com/", config);

        const newLI = document.createElement("li");
        newLI.append(res.data.joke)
        list.append(newLI);
    } catch (error) {
        const newLI = document.createElement("li");
        newLI.append(error);
        list.append(newLI);
    }

}
button.addEventListener("click", getDadJoke);