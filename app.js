const form = document.querySelector(".search-form");
const container = document.querySelector(".container");
const abilities = document.querySelectorAll(".ability");

const promises = [];

const pokemonBox = [];

const fetchPokemon = () => {
  container.innerHTML = "";
  for (i = 1; i <= 50; i++) {
    //Get api point
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    //fetch pokemon data from pokeapit
    promises.push(
      fetch(url).then((res) => {
        //parse response form api to get data
        return res.json();
      })
    );
  }

  Promise.all(promises).then((results) => {
    results.forEach((data) => {
      console.log(data);
      const pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites.other.home["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        abilities: data.abilities.map((ab) => ab["ability"]["name"]),
      };

      pokemonBox.push(pokemon);
      displayPokemon(pokemon);
    });
  });
};

const searchPokemon = (input) => {
  const ext = input.trim().lowerCase();
  //Get api point
  const url = `https://pokeapi.co/api/v2/pokemon/${ext}`;
  //fetch pokemon data from pokeapit

  fetch(url)
    .then((res) => {
      //parse response form api to get data
      return res.json();
    })
    .then((data) => {
      container.innerHTML = "";
      console.log(data);
      const pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites.other.home["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        abilities: data.abilities.map((ab) => ab["ability"]["name"]),
      };
      displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
  const container = document.querySelector(".container");
  const html = `
  <span class="pokemon">
        <div class="pokemon-header" style="background:${getPokemonColorTheme(
          pokemon.type
        )}";>
          <img class="pokemon-image" src="${pokemon.image}" alt="" />
          <h3 class="pokemon-name">${pokemon.name}</h3>
          <p class="pokemon-type">Type: ${pokemon.type}</p>
          <img id="pokemon-header_pokeball" src="/pokeball (1)@2x.png" alt="" />
        </div>
        <div class="pokemon-content">
          <div class="pokemon-stat">
            <h4>ATK</h4>
            <progress
              class="pokemon-stat-bar"
              max="150"
              value="${pokemon.attack}"
            ></progress>
            <p>${(pokemon.attack * 0.66).toFixed(0)}%</p>
          </div>
          <div class="pokemon-stat">
            <h4>DEF</h4>
            <progress
              class="pokemon-stat-bar"
              max="150"
              value="${pokemon.defense}"
            ></progress>
            <p>${(pokemon.defense * 0.66).toFixed(0)}%</p>
          </div>
          <div class="pokemon-stat">
            <h4>SPD</h4>
            <progress
              class="pokemon-stat-bar"
              max="150"
              value="${pokemon.speed}"
            ></progress>
            <p>${(pokemon.speed * 0.66).toFixed(0)}%</p>
          </div>
          <p class="ability-title">Abilites</p>
          <div class="abilities grid">
          <div class="ability ${
            pokemon.abilities[0]
          }" id="ability1" style="background-color:${getPokemonColorTheme(
    pokemon.type
  )};">${pokemon.abilities[0]}</div>
          <div class="ability ${
            pokemon.abilities[1]
          }" id="ability1" style="background-color:${getPokemonColorTheme(
    pokemon.type
  )};">${pokemon.abilities[1]}</div>
          <div class="ability ${
            pokemon.abilities[2]
          }" id="ability1" style="background-color:${getPokemonColorTheme(
    pokemon.type
  )};">${pokemon.abilities[2]}</div>
        </div>
        </div>
      </span>
  `;
  container.innerHTML += html;
};

const getPokemonColorTheme = (Type) => {
  let typeSubString = Type.substring(0, 3);

  switch (typeSubString) {
    case "fir":
      return "orange";
    case "gra":
      return "lightgreen";
    case "wat":
      return "lightblue";
    case "roc":
      return "burlywood";
    case "gro":
      return "burlywood";
    case "nor":
      return "lightgrey";
    case "poi":
      return "violet";
    case "ele":
      return "#ebeb47";
    case "bug":
      return "green";
    case "gho":
      return "purple";
    default:
      return "darkgrey";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.name.value.trim() === "") {
    container.innerHTML = "";
    fetchPokemon();
  } else if (form.name.value.trim()) {
    container.innerHTML = "";
    searchPokemon(form.name.value.trim());
  }
});

form.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (form.name.value.trim() === "") {
    container.innerHTML = "";
    fetchPokemon();
  } else if (form.name.value.trim()) {
    container.innerHTML = "";
    searchPokemon(form.name.value.trim());
  }
});

fetchPokemon();
