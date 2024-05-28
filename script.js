async function fetchDataJSON(){
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/lucario");
    let resopnseAsJSON = await response.json();
console.log(resopnseAsJSON);

document.getElementById('smallCard').innerHTML += `Name: ${resopnseAsJSON['name']}`;
document.getElementById('smallCard').innerHTML += `Number: ${resopnseAsJSON['order']}`;
document.getElementById('smallCard').innerHTML += `Type: ${resopnseAsJSON['types']['type'][1]}}`;
}
