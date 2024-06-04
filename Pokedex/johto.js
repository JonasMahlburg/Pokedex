let Pokedex = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=151";


async function fetchDataJSON() {
  let response = await fetch(Pokedex);
  let resopnseAsJSON = await response.json();
  for (let i = 0; i < resopnseAsJSON.results.length; i++) {
    let Pokemons = resopnseAsJSON.results[i]["url"];
    let Pokemon = await fetch(Pokemons);
    let PokemonAsJSON = await Pokemon.json();

    document.getElementById(
      "content"
    ).innerHTML += `<div id ="smallCard${i}" class="smallCard" onclick="showBigCard(${i}), hearScream(${i})">
               <div class="PokeImage">
                <img class="pokemon-img" src="${PokemonAsJSON["sprites"]["other"]["official-artwork"]["front_default"]}">
               </div>
    <div class="PokeInfo">
     Name: ${resopnseAsJSON.results[i]["name"]} <br>
     Number: ${PokemonAsJSON["id"]} <br>
     ${PokemonAsJSON["types"][0]["type"]["name"]}
     </div>
    </div>`;
  }
  giveTypeColor();
}

async function giveTypeColor() {
  let response = await fetch(Pokedex);
  let resopnseAsJSON = await response.json();

  if (blackscreen.classList.contains("d-none")) {
    for (let i = 0; i < resopnseAsJSON.results.length; i++) {
      let Pokemons = await resopnseAsJSON.results[i]["url"];
      let Pokemon = await fetch(Pokemons);
      let PokemonAsJSON = await Pokemon.json();
      let type = PokemonAsJSON["types"][0]["type"]["name"];

      document.getElementById(`smallCard${i}`).classList.add(type);
    }
  } 
}

async function showBigCard(i) {
  let response = await fetch(Pokedex);
  let resopnseAsJSON = await response.json();
  let Pokemons = await resopnseAsJSON.results[i]["url"];
  let Pokemon = await fetch(Pokemons);
  let PokemonAsJSON = await Pokemon.json();

  document.getElementById("blackscreen").classList.remove("d-none");
  document.getElementById("blackscreen").innerHTML =
              `<div id ="bigCard${i}" class="bigCard" onclick="closeBigCard()">
              <div class="PokeHead">
              <h2># ${PokemonAsJSON["id"]}</h2>
              ${resopnseAsJSON.results[i]["name"]} <br>
               ${PokemonAsJSON["types"][0]["type"]["name"]}
              </div>
               <div class="PokeBigImage">
                <img class="pokemon-img" src="${PokemonAsJSON["sprites"]["other"]["official-artwork"]["front_default"]}">
               </div>
    <div class="PokeBigInfo">
    ${PokemonAsJSON["stats"][0]["stat"]["name"]}:${PokemonAsJSON["stats"][0]["base_stat"]}<br>
    ${PokemonAsJSON["stats"][1]["stat"]["name"]}:${PokemonAsJSON["stats"][1]["base_stat"]}<br>
    ${PokemonAsJSON["stats"][2]["stat"]["name"]}:${PokemonAsJSON["stats"][2]["base_stat"]}<br>
    ${PokemonAsJSON["stats"][3]["stat"]["name"]}:${PokemonAsJSON["stats"][3]["base_stat"]}<br>
    ${PokemonAsJSON["stats"][4]["stat"]["name"]}:${PokemonAsJSON["stats"][4]["base_stat"]}<br>
    ${PokemonAsJSON["stats"][5]["stat"]["name"]}:${PokemonAsJSON["stats"][5]["base_stat"]}
          </div>
    </div>`;
  giveColorBigCard(i);
}

function closeBigCard(){
    document.getElementById("blackscreen").classList.add("d-none");
    // document.getElementById('bigCard').innerHTML="";
}

async function giveColorBigCard(i) {
  let response = await fetch(Pokedex);
  let resopnseAsJSON = await response.json();
  let Pokemons = await resopnseAsJSON.results[i]["url"];
  let Pokemon = await fetch(Pokemons);
  let PokemonAsJSON = await Pokemon.json();
  let type = PokemonAsJSON["types"][0]["type"]["name"];

    document.getElementById(`bigCard${i}`).classList.add(type);
  
}

async function hearScream(i) {
  let response = await fetch(Pokedex);
  let resopnseAsJSON = await response.json();
  let Pokemons = await resopnseAsJSON.results[i]["url"];
  let Pokemon = await fetch(Pokemons);
  let PokemonAsJSON = await Pokemon.json();
  let Audio_scream = new Audio(PokemonAsJSON["cries"]["latest"]);
  Audio_scream.play();
}

function filterPokemon() {
  let search = document.getElementById("search").value;
  search = search.toLowerCase();
  console.log(search);
}