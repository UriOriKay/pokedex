let lan = 0; // languages for the pokedex 
let AllPokemon = []; // array to store all pokemon data for the output
let allDetail = []; // array to store the pokemon data from the API
let allSpecies = [] // array to store the species data from the API
let allAbility = [] // array to store the ability data from teh API


// function for getElementByID
function docID(id) {
    return document.getElementById(id);
}

//render the language dropdown Menü
function lanDrpbxRender() {
    let flags = ["germany", "southkorea", "usa", "japan", "Italy", "spain", "france"];
    docID('lang-div').innerHTML = /*html*/`
        <img id="cur-lang" src="./img/flag_${flags[lan]}.png">
    `;

    for (let i = 0; i < flags.length; i++) {
        if (i != lan){
            docID('lang-div').innerHTML += /*html*/`
                <img class="lang-img" src="./img/flag_${flags[i]}.png">
            `;
        }
    }
}


//change the language
function language(id) {
    lan = id;
}