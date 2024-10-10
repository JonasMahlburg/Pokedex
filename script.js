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
  showFilteredPokemon(search)
}else{
  if(search.length<=3){
    document.getElementById('content').innerHTML = '';
    for (let a = 0; a < allPokemon.length; a++) {
      showLoadedPokemon(a);
      
    }
  }
}
}

function showFilteredPokemon(search){
  let searchResult =document.getElementById("content").innerHTML = "";
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
  return(searchResult);
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
     <div id="Stats" class="tabcontent" style="display: block" ><div id="Stats" class="tabcontent" style="display: block;">
  <canvas id="statsChart" width= 250px height= 250px></canvas>
</div></div>  
     <div id="Moves" class="tabcontent"></div>
     <div id="Other" class="tabcontent"></div>
     <div id="Entry" class="tabcontent"></div>
  </div>`;
  return BigCard;
}

function showStats(i) {
  // Hole die Basiswerte der Pokémon-Statuswerte
  let stats = allPokemon[i]["stats"].map((stat) => stat["base_stat"]);
  
  // Labels für die Statuswerte
  let labels = allPokemon[i]["stats"].map((stat) => stat["stat"]["name"]);

  // Erstelle oder leere die Stats-Tab
  document.getElementById("Stats").innerHTML = '<canvas id="statsChart"></canvas>';
  
  // Hole das Canvas-Element
  let ctx = document.getElementById("statsChart").getContext("2d");

  // Erstelle das Radar Chart
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,  // Die Namen der Statuswerte (hp, speed, etc.)
      datasets: [{
        label: `${allPokemon[i]["name"]}'s Stats`,  // Name des Pokémon
        data: stats,  // Die Basiswerte des Pokémon
        backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Hintergrundfarbe des Charts
        borderColor: 'rgba(54, 162, 235, 1)',  // Linienfarbe des Charts
        borderWidth: 2
      }]
    },
    options: {
      responsive: false,  // Deaktiviere automatische Größenanpassung
      maintainAspectRatio: false,  // Seitenverhältnis nicht beibehalten
      scales: {
        r: {  // Konfiguration der Radarskalierung
          suggestedMin: 0,
          suggestedMax: 150,
          // Anpassung der Schriftfarbe der Labels und Ticks
          pointLabels: {
            color: '#000',  // Farbe der Statuswert-Labels (z.B. "hp", "speed")
            font: {
              size: 14  // Schriftgröße anpassen (optional)
            }
          },
          ticks: {
            color: '#333',  // Farbe der Ticks (Zahlen auf den Achsen)
            backdropColor: 'rgba(0, 0, 0, 0)'  // Hintergrund der Ticks (transparent machen)
          }
        }
      }
    }
  });
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