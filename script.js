let lan = 0; // languages for the pokedex 
let allPokemon = []; // array to store all pokemon data for the output
let allDetail = []; // array to store the pokemon data from the API
let allSpecies = [] // array to store the species data from the API
let allAbility = [] // array to store the ability data from teh API

// function for getElementByID
function docID(id) {
    return document.getElementById(id);
}

//change the language
function language(id) {
    lan = id;
    lanDrpbxRender();
    render();
}

async function fetcher(url) {
    let response = await fetch(url);
    let responseAsJson = await response.json();
    return responseAsJson;
}

async function getThemAll() {
    await ability();
    for (let i = 0; i < 50; i++) {
        allDetail.push(await fetcher(`https://pokeapi.co/api/v2/pokemon/${i+1}`));
        allSpecies.push(await fetcher(`https://pokeapi.co/api/v2/pokemon-species/${i+1}`));
        await pokedata(i);
    }
    render();
}

async function ability() {
    let count = (await fetcher(`https://pokeapi.co/api/v2/ability`))['count']; // url of 
    // let count = countAsJson['count'];
    let basic = await fetcher(`https://pokeapi.co/api/v2/ability?limit=${count}`);

    for (let i = 0; i < count; i++) {
        let url = basic['results'][i]['url']; //
        let regex = /\/(\d+)\//; //code extract the number of the url inside two slashes
        let matches = url.match(regex);
        if (matches[1].length > 3){
            console.log(matches[1].length)
        }
        allAbility.push(await fetcher(url));
    }
    console.log('ability is done')
}

//function to store necessary data in one JSON.
async function pokedata(i) {
    let id = allDetail[i]['id'].toString().padStart(4, "0");
    let nameGer = allSpecies[i]['names'][5]['name'];
    let nameKor = allSpecies[i]['names'][2]['name'];
    let name = allDetail[i]['name'];
    let nameJap = allSpecies[i]['names'][0]['name'];
    let nameSpa = allSpecies[i]['names'][6]['name'];
    let nameIta = allSpecies[i]['names'][7]['name'];
    let nameFra = allSpecies[i]['names'][4]['name'];
    let color = allSpecies[i]['color']['name'];
    let img = allDetail[i]['sprites']['other']['official-artwork']['front_default'];
    let classType1 = allDetail[i]['types'][0]['type']['name'];
    let classType2 = allDetail[i]['types'].length == 2 ? allDetail[0]['types'][1]['type']['name'] : "";
    let type1 = await getType1(classType1);
    let type2 = await getType2(classType2, i);
    let flavor = await getTheFlavor(i);
    let generaGer = allSpecies[i]['genera'][4]['genus'];
    let generaKor = allSpecies[i]['genera'][1]['genus'];
    let generaEng = allSpecies[i]['genera'][7]['genus'];
    let generaJap = allSpecies[i]['genera'][0]['genus'];
    let generaSpa = allSpecies[i]['genera'][5]['genus'];
    let generaIta = allSpecies[i]['genera'][6]['genus'];
    let generaFra = allSpecies[i]['genera'][3]['genus'];
    let height = allDetail[i]['height']* 0.1;
    let weight = allDetail[i]['weight']* 0.1;
    let ability = getTheAbility(i);

    allPokemon.push({
        'id': id,
        'name': [nameGer, nameKor, name, nameJap, nameSpa, nameIta, nameFra],
        'color': color,
        'img': img,
        'classtype1': classType1,
        'classtype2': classType2,
        'type1': type1,
        'type2': type2,
        'flavor': flavor,
        'genera': [generaGer, generaKor, generaEng, generaJap, generaSpa, generaIta, generaFra],
        'category': ["Kategorie", "분류", "Category", "分類", "Categoría", "Categoria", "Catégorie"], //auslagern
        'height': `${height.toLocaleString('de-DE', {maximumFractionDigits: 2})}m`,
        'heightcat': ["Größe", "키", "Height", "高さ", "Altura", "Altezza", "Taille"], // auslagern
        'weight': `${weight.toLocaleString('de-DE', {maximumFractionDigits: 2})}kg`,
        'weightcat': ["Gewicht", "몸무게", "Weight", "重さ", "Peso", "Peso", "Poids"], // auslagern
        'ability': ability,
        'abilitycat': ["Fähigkeiten", "특성", "Ability", "特性", "Habilidad", "Abilità", "Capacité spéciale"],
    })
}

// load the type1 in the different languages
async function getType1(classType) {
    let type = await fetcher(`https://pokeapi.co/api/v2/type/${classType}`);
    let typeLanArray = [type['names'][4]['name'], type['names'][1]['name'], 
                        classType, type['names'][0]['name'], type['names'][5]['name'],
                        type['names'][6]['name'], type['names'][3]['name'],];
    return typeLanArray;
}

// load the type2 if there is an type2 in different languages
async function getType2(classType, i) {
    if (allDetail[i]['types'].length == 1) {
        return "";
    }
    let type = await fetcher(`https://pokeapi.co/api/v2/type/${classType}`);
    let typeLanArray = [type['names'][4]['name'], type['names'][1]['name'], 
                        classType, type['names'][0]['name'], type['names'][5]['name'],
                        type['names'][6]['name'], type['names'][3]['name'],];
    return typeLanArray;
}

// load the flavor text entries in different languages
function getTheFlavor(i) {
    let gerFlavor = allSpecies[i]['flavor_text_entries'].find((flavor)=>flavor.language.name === 'de')?.flavor_text;
    let korFlavor = allSpecies[i]['flavor_text_entries'].find((flavor)=>flavor.language.name === 'ko')?.flavor_text;
    let engFlavor = allSpecies[i]['flavor_text_entries'].find((flavor)=>flavor.language.name === 'en')?.flavor_text;
    let japFlavor = allSpecies[i]['flavor_text_entries'].find((flavor)=>flavor.language.name === 'ja-Hrkt')?.flavor_text;
    let spaFlavor = allSpecies[i]['flavor_text_entries'].find((flavor)=>flavor.language.name === 'es')?.flavor_text;
    let itaFlavor = allSpecies[i]['flavor_text_entries'].find((flavor)=>flavor.language.name === 'it')?.flavor_text;
    let fraFlavor = allSpecies[i]['flavor_text_entries'].find((flavor)=>flavor.language.name === 'fr')?.flavor_text;
    let flavorArray = [gerFlavor, korFlavor, engFlavor, japFlavor,
                        spaFlavor, itaFlavor, fraFlavor];
    return flavorArray;
}

// fill the array of abilities
function getTheAbility(i) {
    let amount = allDetail[i]['abilities'].length;
    let gerAbility = [];
    let korAbility = [];
    let engAbility = [];
    let japAbility = [];
    let spaAbility = [];
    let itaAbility = [];
    let fraAbility = [];
    for (let j = 0; j < amount; j++) {
        let number = allDetail[i]['abilities'][j]['ability']['url'];
        let regex = /\/(\d+)\//;
        let matches = number.match(regex);
        let abnumb = matches[1]-1;
        if (j > 0) {
            gerAbility +=", " + allAbility[abnumb]['names'][4]['name'];
            korAbility +=", " + allAbility[abnumb]['names'][1]['name'];
            engAbility +=", " + allAbility[abnumb]['name'];
            japAbility +=", " + allAbility[abnumb]['names'][0]['name'];
            spaAbility +=", " + allAbility[abnumb]['names'][5]['name'];
            itaAbility +=", " + allAbility[abnumb]['names'][6]['name'];
            fraAbility +=", " + allAbility[abnumb]['names'][3]['name'];
        }else {
            gerAbility = allAbility[abnumb]['names'][4]['name'];
            korAbility = allAbility[abnumb]['names'][1]['name'];
            engAbility = allAbility[abnumb]['names'][7]['name'];
            japAbility = allAbility[abnumb]['names'][0]['name'];
            spaAbility = allAbility[abnumb]['names'][5]['name'];
            itaAbility = allAbility[abnumb]['names'][6]['name'];
            fraAbility = allAbility[abnumb]['names'][3]['name'];
        }
    }
    let abilities = [gerAbility, korAbility, engAbility, japAbility, spaAbility, itaAbility, fraAbility];
    return abilities;
}