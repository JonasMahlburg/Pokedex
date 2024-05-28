async function fetchDataJSON(){
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15&offset=0");
    let resopnseAsJSON = await response.json(); 
    

console.log(resopnseAsJSON);
for (let i=0; i<resopnseAsJSON.results.length; i++){
    let Pokemons = await resopnseAsJSON.results[i]['url'];
    let Pokemon = await fetch(Pokemons);
    let PokemonAsJSON= await Pokemon.json();
    let Front = await fetch (PokemonAsJSON['sprites']['other']['official-artwork']['front_default']);
    let Front_img = Front['url'];

    document.getElementById('content').innerHTML += `<div id ="smallCard${i}" class="smallCard">
    <div class="PokeImage">
    <img class="pokemon-img" src="${Front_img}">
    </div>
    <div class="PokeInfo">
     Name: ${resopnseAsJSON.results[i]['name']} <br>
     Number: ${PokemonAsJSON['id']} <br>
     ${PokemonAsJSON['types'][0]['type']['name']}
     </div>
    </div>`;
};
giveTypeColor();
}

async function giveTypeColor(){
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15&offset=0");
    let resopnseAsJSON = await response.json(); 
    

    for (let i=0; i<resopnseAsJSON.results.length; i++){
        let Pokemons = await resopnseAsJSON.results[i]['url'];
    let Pokemon = await fetch(Pokemons);
    let PokemonAsJSON= await Pokemon.json();
    let type= PokemonAsJSON['types'][0]['type']['name'];
        document.getElementById(`smallCard${i}`).classList.add(type);
    };
}