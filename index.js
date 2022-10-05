const search = document.getElementById("search");
const submit = document.getElementById("submit");

const pokemonName = document.getElementById("pokemon-name");
const abilitiesHTML = document.getElementById("ability-list");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defence = document.getElementById("defence");
const specialAttack = document.getElementById("special-attack");
const specialDefence = document.getElementById("special-defence");
const speed = document.getElementById("speed");
const img = document.querySelector("img");

const cardContainer = document.querySelector(".card-container");

//reset display

search.addEventListener("change", () => {
  abilitiesHTML.textContent = "";
  cardContainer.style.display = "none";
});

//click to display card
submit.addEventListener("click", fetchPokemon);

//console.log(search.value);
//fetchPokemon(search.value).then();
//cardContainer.style.display = "block";

async function fetchPokemon(e) {
  e.preventDefault();

  const name = search.value.toLowerCase();
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (response.ok) {
      const data = await response.json();

      console.log(data);

      pokemonName.textContent = `${name}`.toLocaleUpperCase();

      //adding abilities to pokemon card
      const pokemonabilities = data.abilities;

      for (let i of pokemonabilities) {
        //console.log(i.ability.name);
        abilitiesHTML.appendChild(document.createElement("li")).textContent =
          i.ability.name;
      }
      //console.log(data.abilities[0].ability.name);

      // adding stats to pokemon card
      const pokemonstats = data.stats;
      //console.log(pokemonstats);
      hp.innerText = pokemonstats[0].base_stat;
      attack.innerText = pokemonstats[1].base_stat;
      defence.innerText = pokemonstats[2].base_stat;
      specialAttack.innerText = pokemonstats[3].base_stat;
      specialDefence.innerText = pokemonstats[4].base_stat;
      speed.innerText = pokemonstats[5].base_stat;

      // adding image to pokemon card

      img.src = data.sprites.back_default;

      cardContainer.style.display = "block";
    } else {
      alert("Check Pokemon name!!");
      cardContainer.style.display = "none";
    }
  } catch (error) {
    alert(`something went wrong ${error.message}`);
  }
}
