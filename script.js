let offset = 0;
const limit = 15;
let Pokedex = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
let allPokemon = [];


async function fetchDataJSON() {
  let response = await fetch(Pokedex);
  let responseAsJSON = await response.json();
showLoader();
  for (let i = 0; i < responseAsJSON.results.length; i++) {
    let pokemonUrl = responseAsJSON.results[i].url;
    let pokemonResponse = await fetch(pokemonUrl);
    let pokemonAsJSON = await pokemonResponse.json();
    allPokemon.push(pokemonAsJSON);
    showAllPokemon(allPokemon.length - 1);
    document.getElementById("loader").classList.add("d-none");
  }
}

function showLoader() {
  document.getElementById("loader").classList.remove("d-none")
}

function showAllPokemon(i) {
  document.getElementById("content").innerHTML +=
    `<div id ="smallCard${i}" class="smallCard" onclick="showBigCard(${i}), hearScream(${i})">
               <div class="PokeImage">
                <img class="pokemon-img" src="${allPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"]}">
               </div>
    <div class="PokeInfo">
     Name: ${allPokemon[i]["name"]} <br>
     Number: ${allPokemon[i]["id"]} <br>
     ${allPokemon[i]["types"][0]["type"]["name"]}<br>
     </div>
    </div>`;

  giveTypeColor(i);
}

async function fetchLoadedJSON() {
  let response = await fetch(Pokedex);
  let responseAsJSON = await response.json();
  showLoader();
  for (let i = 0; i < responseAsJSON.results.length; i++) {
    let pokemonUrl = responseAsJSON.results[i].url;
    let pokemonResponse = await fetch(pokemonUrl);
    let pokemonAsJSON = await pokemonResponse.json();
    allPokemon.push(pokemonAsJSON);
   showLoadedPokemon(allPokemon.length - 1);
   document.getElementById("loader").classList.add("d-none");
  }
}

function showLoadedPokemon(i) {
  document.getElementById("content").innerHTML +=
    `<div id ="smallCard${i}" class="smallCard" onclick="showBigCard(${i}), hearScream(${i})">
                 <div class="PokeImage">
                  <img class="pokemon-img" src="${allPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"]}">
                 </div>
      <div class="PokeInfo">
       Name: ${allPokemon[i]["name"]} <br>
       Number: ${allPokemon[i]["id"]} <br>
       ${allPokemon[i]["types"][0]["type"]["name"]}<br>
       </div>
      </div>`;

  giveLoadedColor(i);
}



function filterPokemon() {
  let search = document.getElementById("search").value;
  if(search.length>= 3){
      search = search.toLowerCase();
  document.getElementById("content").innerHTML = "";
  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i]["name"].toLowerCase().includes(search)) {
      document.getElementById(
        "content"
      ).innerHTML += `<div id ="smallCard${i}" class="smallCard" onclick="showBigCard(${i}), hearScream(${i})">
               <div class="PokeImage">
                <img class="pokemon-img" src="${allPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"]}">
               </div>
    <div class="PokeInfo">
     Name: ${allPokemon[i]["name"]} <br>
     Number: ${allPokemon[i]["id"]} <br>
     ${allPokemon[i]["types"][0]["type"]["name"]}<br>
     </div>
    </div>`;

    giveSearchColor(i);
    }; 
  }
}
}

async function giveTypeColor() {
  let response = await fetch(Pokedex);
  let resopnseAsJSON = await response.json();

  if (blackscreen.classList.contains("d-none")) {
    for (let i = 0; i < allPokemon.length; i++) {
      let Pokemons = await resopnseAsJSON.results[i]["url"];
      let Pokemon = await fetch(Pokemons);
      let PokemonAsJSON = await Pokemon.json();
      let type = PokemonAsJSON["types"][0]["type"]["name"];

      document.getElementById(`smallCard${i}`).classList.add(type);
    }
  }
}

async function giveLoadedColor(k) {
  let response = await fetch(Pokedex);
  let resopnseAsJSON = await response.json();


  if (blackscreen.classList.contains("d-none")) {
    for (let i = 0; i < allPokemon.length; i++) {
      let type = allPokemon[k]["types"][0]["type"]["name"];

      document.getElementById(`smallCard${k}`).classList.add(type);
    }
  }
}

async function giveSearchColor(j) {
  if (blackscreen.classList.contains("d-none")) {
    for (let i = 0; i < allPokemon.length; i++) {
      let type = allPokemon[j]["types"][0]["type"]["name"];
      document.getElementById(`smallCard${j}`).classList.add(type);
    }
  }
}

function showBigCard(i) {
  // showEditions(i);
  document.getElementById("blackscreen").classList.remove("d-none");
  renderBigCard(i)
  giveColorBigCard(i);
  showStats(i);
  showMoves(i);
  showOther(i);
  
}

function renderBigCard(i){
  let BigCard =  document.getElementById(
    "blackscreen"
  ).innerHTML = `<div id ="bigCard${i}" class="bigCard">
  <div class="menuContainer">
  <button id="arrowLeft" class="Btn4Arrow"> <img class="directionArrow" src="./img/arrow-left.png" alt="" onclick="nextPokeLeft(${i})"></button>
  <button class="closeBtn" onclick="closeBigCard()"><img class="closeImage" src="./img/CloseBall.png" alt="close"></button>
  <button id="arrowRight" class="Btn4Arrow"> <img class="directionArrow" src="./img/arrow-right.png" alt="" onclick="nextPokeRight(${i})"></button>
  </div>
              <div class="PokeHead">
              <h2># ${allPokemon[i]["id"]}</h2>
              ${allPokemon[i]["name"]} <br>
               ${allPokemon[i]["types"][0]["type"]["name"]}<br>
              </div>
               <div class="PokeBigImage">
                <img class="pokemon-img" src="${allPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"]}">
               </div>
               <div class="PokeBigInfo">
               <div class="tab">
  <button class="tablinks" onclick="openTab(event, 'Stats')">Stats</button>
  <button class="tablinks" onclick="openTab(event, 'Moves')">Attacks</button>
  <button class="tablinks" onclick="openTab(event, 'Other')">Other Info</button>
</div>
     <div id="Stats" class="tabcontent" style="display: block" ></div>  
     <div id="Moves" class="tabcontent"></div>
     <div id="Other" class="tabcontent"></div>
     <div id="Entry" class="tabcontent"></div>
  </div>`;
  return BigCard;
}

function showStats(i) {
  for (let s = 0; s < allPokemon[i]["stats"].length; s++) {
    document.getElementById(
      "Stats"
    ).innerHTML += `${allPokemon[i]["stats"][s]["stat"]["name"]}:${allPokemon[i]["stats"][s]["base_stat"]}<br>`;
  }
}

function showMoves(i) {
  for (let m = 0; m < 4; m++) {
    document.getElementById(
      "Moves"
    ).innerHTML += `${allPokemon[i]["moves"][m]["move"]["name"]} <br>`;
  }
}

async function showOther(i) {
  let location_area_encounters = await fetch(
    allPokemon[i]["location_area_encounters"]
  );
  let locationAsJSON = await location_area_encounters.json();
  document.getElementById("Other").innerHTML += "Abilities: <br>";
  for (let a = 0; a < allPokemon[i]["abilities"].length; a++) {
    document.getElementById(
      "Other"
    ).innerHTML += `${allPokemon[i]["abilities"][a]["ability"]["name"]} <br>`;
  }
}

function closeBigCard() {
  document.getElementById("blackscreen").classList.add("d-none");
  
}

async function giveColorBigCard(i) {
  let type = allPokemon[i]["types"][0]["type"]["name"];
  document.getElementById(`bigCard${i}`).classList.add(type);
}

async function hearScream(i) {
  let Audio_scream = new Audio(allPokemon[i]["cries"]["latest"]);
  Audio_scream.play();
  Audio_scream.volume=0.1;
}

function openTab(evt, TabName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(TabName).style.display = "block";
  evt.currentTarget.className += " active";
}

async function loadMorePokemon() {
  let remainingPokemonCount = 151 - allPokemon.length;
  let fetchLimit = remainingPokemonCount <= limit ? remainingPokemonCount : limit;
  offset += fetchLimit;
  if (remainingPokemonCount == 1) {
    offset = 150
  }
  Pokedex = `https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}&offset=${offset}`;
  await fetchLoadedJSON(Pokedex);

  if (allPokemon.length >= 151) {
    let loadMoreButton = document.getElementById('reloadBtn');
    loadMoreButton.disabled = true;
    alert('all Pokemon are loaded')
  }
}

function nextPokeLeft(i) {
  document.getElementById("blackscreen").innerHTML = "";
 
  if (i > 0) {
    showBigCard(i-1);
  } else {
    let i = allPokemon.length -1;
    showBigCard(i);
    hearScream(i);
  }
  
}

function nextPokeRight(i) {
  document.getElementById("blackscreen").innerHTML = "";
  
  if (i >= allPokemon.length -1) {
    let i = 0;
    showBigCard(i);
    hearScream(i)
    
    
  } else {
    showBigCard(i+1);
    hearScream(i+1);
  }
  
}