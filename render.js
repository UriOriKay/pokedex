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