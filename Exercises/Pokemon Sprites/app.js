// https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/1.png
//https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/5.png?raw=true

let cont = document.querySelector(".container");

for (let i = 1; i <= 151; i++) {
  let new_div = document.createElement("div");
  let new_span = document.createElement("span");
  new_span.innerText = `#${i}`;

  let new_sprite = document.createElement("img");
  // new_sprite.src = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${i}.png?raw=true`;

  let id;
  if (i < 10) {
    id = `00${i}`;
  } else if (i < 100) {
    id = `0${i}`;
  } else {
    id = i;
  }

  new_sprite.src = `https://www.pokencyclopedia.info/sprites/gen1/spr_yellow_gbc/spr_y-gbc_${id}.png`;
  new_div.appendChild(new_sprite);
  new_div.appendChild(new_span);

  cont.appendChild(new_div);
}
