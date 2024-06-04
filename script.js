let offset = 0;
const limit = 15;
let Pokedex = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
let allPokemon = [];


// async function fetchDataJSON() {
//   let response = await fetch(Pokedex);
//   let resopnseAsJSON = await response.json();

//   for (let i = 0; i < resopnseAsJSON["results"].length; i++) {
   
//   let Pokemons = resopnseAsJSON.results[i]["url"];
//   let Pokemon = await fetch(Pokemons);
//   let PokemonAsJSON = await Pokemon.json();
//   allPokemon.push(PokemonAsJSON);
//   showAllPokemon(i);
//   }
// }

async function fetchDataJSON() {
  let response = await fetch(Pokedex);
  let responseAsJSON = await response.json();

  for (let i = 0; i < responseAsJSON.results.length; i++) {
    let pokemonUrl = responseAsJSON.results[i].url;
    let pokemonResponse = await fetch(pokemonUrl);
    let pokemonAsJSON = await pokemonResponse.json();
    allPokemon.push(pokemonAsJSON);
    showAllPokemon(allPokemon.length - 1);
  }
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
  
    for (let i = 0; i < responseAsJSON.results.length; i++) {
      let pokemonUrl = responseAsJSON.results[i].url;
      let pokemonResponse = await fetch(pokemonUrl);
      let pokemonAsJSON = await pokemonResponse.json();
      allPokemon.push(pokemonAsJSON);
      showLoadedPokemon(allPokemon.length - 1);
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
  search = search.toLowerCase();
  console.log(search);
  document.getElementById("content").innerHTML="";
for (let i=0; i<allPokemon.length;i++){
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

    
  };giveSearchColor(i);
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
        let Pokemons = resopnseAsJSON.results[i]["url"];
        let Pokemon = await fetch(Pokemons);
        let PokemonAsJSON = await Pokemon.json();
      let type = allPokemon[k]["types"][0]["type"]["name"];

      document.getElementById(`smallCard${k}`).classList.add(type);
    }
  }
}

async function giveSearchColor(j) {
  let response = await fetch(Pokedex);
  let resopnseAsJSON = await response.json();

  if (blackscreen.classList.contains("d-none")) {
    for (let i = 0; i < allPokemon.length; i++) {
      let Pokemons = await resopnseAsJSON.results[j]["url"];
      let Pokemon = await fetch(Pokemons);
      let PokemonAsJSON = await Pokemon.json();
      let type = PokemonAsJSON["types"][0]["type"]["name"];

      document.getElementById(`smallCard${j}`).classList.add(type);
    }
  }
}

function showBigCard(i) {
  // showEditions(i);
  document.getElementById("blackscreen").classList.remove("d-none");
  document.getElementById(
    "blackscreen"
  ).innerHTML = `<div id ="bigCard${i}" class="bigCard">
  <button class="Btn4Arrow"> <img class="directionArrow" src="./img/arrow-left.png" alt=""></button>
  <button class="Btn4Arrow"> <img class="directionArrow" src="./img/arrow-right.png" alt=""></button>
  <button class="closeBtn" onclick="closeBigCard()"><img class="closeImage" src="./img/CloseBall.png" alt="close"></button>
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
  <button class="tablinks" onclick="openCity(event, 'Stats')">Stats</button>
  <button class="tablinks" onclick="openCity(event, 'Moves')">Attacks</button>
  <button class="tablinks" onclick="openCity(event, 'Other')">Other Info</button>
  <button class="tablinks" onclick="openCity(event, 'Entry')">DexEntry</button>
</div>
     <div id="Stats" class="tabcontent" ></div>  
     <div id="Moves" class="tabcontent"></div>
     <div id="Other" class="tabcontent"></div>
     <div id="Entry" class="tabcontent"></div>
  </div>`;

  giveColorBigCard(i);
  showStats(i);
  showMoves(i);
  showOther(i);
  showEntry(i);
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
  document.getElementById(
    "Other"
  ).innerHTML += `Mostly found in: <br>${locationAsJSON[0]["location_area"]["name"]} <br>`;
}

async function showEntry(i) {
  let Entry = await fetch("https://pokeapi.co/api/v2/pokemon-species");
  let EntryAsJSON = await Entry.json();

  document.getElementById(
    "Entry"
  ).innerHTML = `${EntryAsJSON[i]["results"]["flavor_text_entries"]["flavor_text"]}`;
}

function closeBigCard() {
  document.getElementById("blackscreen").classList.add("d-none");
  // document.getElementById('bigCard').innerHTML="";
}

async function giveColorBigCard(i) {  

  let type = allPokemon[i]["types"][0]["type"]["name"];

  document.getElementById(`bigCard${i}`).classList.add(type);
}

async function hearScream(i) {
  
  let Audio_scream = new Audio(allPokemon[i]["cries"]["latest"]);
  Audio_scream.play();
}

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

//-----------------------Experimentel--------------------------------------------------//
// const data = {
//   labels: [
//     'Attack',
//     'Defense',
//     'Speed',
//     'Designing',
//     'Coding',
//     'Cycling',
//     'Running'
//   ],
//   datasets: [{
//     label: 'Stats',
//     data: [65, 59, 90, 81, 56, 55, 40],
//     fill: true,
//     backgroundColor: rgba(255, 99, 132, 0.2),
//     borderColor: rgb(255, 99, 132),
//     pointBackgroundColor: 'rgb(255, 99, 132)',
//     pointBorderColor: '#fff',
//     pointHoverBackgroundColor: '#fff',
//     pointHoverBorderColor: 'rgb(255, 99, 132)'
//   }]
// };

// const config = {
//   type: 'radar',
//   data: data,
//   options: {
//     elements: {
//       line: {
//         borderWidth: 3
//       }
//     }
//   },
// };

// <canvas id="myChart" style="width:100%;max-width:700px"></canvas> // <-- Für PokeBigInfo wenn alles mit den Stats klapp}


   // Funktion zum Laden neuer Inhalte
//    async function loadMorePokemon() {
//     let PokemonAmount = allPokemon.length;
//     if (PokemonAmount < 151) {
//         let content = document.getElementById('content');
//         let remainingPokemonCount = 151 - allPokemon;
//         let fetchLimit = remainingPokemonCount <= 15 ? remainingPokemonCount : 15;

//         let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=${currentPokemon}&limit=${fetchLimit}");
//         let responseAsJson = await response.json();
//         let pokemons = responseAsJson.results;

//         for (let j = PokemonAmount; j < pokemons.length; j++) {
//             content.innerHTML += fetchDataJSON(PokemonAmount + j + 1);
//         }
//         currentPokemon += fetchLimit;
//         if (allPokemon.lenght >= 151) {
//             let loadMoreButton = document.getElementById('loadMoreButton');
//             loadMoreButton.disabled = true;
//             loadMoreButton.textContent.innerHTML = 'All Pokémon loaded';
//         }
//     }
// }
async function loadMorePokemon() {
  let remainingPokemonCount = 151 - allPokemon.length;
  let fetchLimit = remainingPokemonCount <= limit ? remainingPokemonCount : limit;
offset += fetchLimit;
if (remainingPokemonCount==1){
  offset = 150
}
   Pokedex= `https://pokeapi.co/api/v2/pokemon?limit=${fetchLimit}&offset=${offset}`;
  await fetchLoadedJSON(Pokedex);
  

  if (allPokemon.length >= 151) {
    let loadMoreButton = document.getElementById('reloadBtn');
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'All Pokémon loaded';
  }
}
