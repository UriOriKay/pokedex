//render the language dropdown Menü
function lanDrpbxRender() {
    let flags = ["germany", "southkorea", "usa", "japan", "Italy", "spain", "france"];
    docID('lang-div').innerHTML = /*html*/`
        <img id="cur-lang" src="./img/flag_${flags[lan]}.png">
    `;

    for (let i = 0; i < flags.length; i++) {
        if (i != lan){
            docID('lang-div').innerHTML += /*html*/`
                <img class="lang-img" src="./img/flag_${flags[i]}.png" onclick="language(${i})">
            `;
        }
    }
}


function render() {
    docID('main').innerHTML = '';
    for (let i = 0; i < 20; i++) {
        mainRender(i);
        slotcardRender(i);
        slotcardImgRender(i);
        slortcardImgConRender(i);
        slotcardHeaderRender(i);
        flavorRender(i);
        typesRender(i);
    }
    
}

function mainRender(i) {
    docID('main').innerHTML += /*html*/`
        <div id="slotcard_${i}" class="slotcard"></div>
    `
}

function slotcardRender(i) {
    let color = allPokemon[i]['color'];
    docID(`slotcard_${i}`).innerHTML = /*html*/`
        <div class="slotcard-bg ${color}"></div>
        <div id="slotcard_img_${i}" class="slotcard-img"></div>
    `
}

function slotcardImgRender(i) {
    docID(`slotcard_img_${i}`).innerHTML = /*html*/` =
        <div class="ball"></div>
        <div id="slotcard_img_con${i}" class="slotcard-img-con"></div>
        <div id="slotcard_header${i}" class="slotcard-header"></div>
        <div class="line"></div>
        <div id="flavor_${i}" class="flavor"></div>
        <div id="types_${i}" class="types">
            <div class="grass type">Pflanze</div>
            <div class="poison type">Gift</div>
        </div>
    `
}

function slortcardImgConRender(i) {
    img = allPokemon[i]['img'];
    docID(`slotcard_img_con${i}`).innerHTML = /*html*/`
        <img class="slotcard-art" src="${img}" alt="pokemon pic">
    `
}

function slotcardHeaderRender(i) {
    let name = allPokemon[i]['name'][lan];
    let id = allPokemon[i]['id'];
    docID(`slotcard_header${i}`).innerHTML = /*html*/`
        <span class="pokemon-name">${name}</span>
        <span class="pokemon-id">#${id}</span>
    `
}

function flavorRender(i){
   docID(`flavor_${i}`).innerHTML = allPokemon[i]['flavor'][lan];
}

function typesRender(i) {
    let type = allPokemon[i]['type1'][lan];
    let typecls = allPokemon[i]['classtype1'];
    docID(`types_${i}`).innerHTML = /*html*/`
        <div class="${typecls} type">${type}</div>
    `
    if (allDetail[i]['types'].length == 2) {
        typeTwoRender(i);
    }
}

function typeTwoRender(i) {
    let type = allPokemon[i]['type2'][lan];
    let typecls = allPokemon[i]['classtype2'];
    docID(`types_${i}`).innerHTML += /*html*/`
        <div class="${typecls} type">${type}</div>
    `
}