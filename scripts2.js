// https://pokeres.bastionbot.org/images/pokemon/25.png

async function fetchDataAndConvertToJson (url) {
	let response = await fetch(url);
	return await response.json();
}

async function getListOfPokemon (pokedex, list) {
	let url = `https://pokeapi.co/api/v2/pokedex/${pokedex}`;
	let responseJson = await fetchDataAndConvertToJson(url);
	printPokeData(responseJson, list);
}

function printPokeData ({pokemon_entries}, list) {
	for(pokemon of pokemon_entries){
		let ourListItem = document.createElement('li');
		ourListItem.innerText = pokemon.pokemon_species.name;
		let pokeImage = document.createElement('img');
		let pokemonNumber = pokemon.entry_number;
		pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_species.url.slice(42, -1)}.png`;
		pokeImage.classList.add('pokemonImage');
		pokeImage.setAttribute('loading', 'lazy');
		ourListItem.appendChild(pokeImage);
		ourListItem.addEventListener('click', function () {

			fillPokemonDataIntoFields(this.innerText);
			showIndiBox(true);
		});
		list.appendChild(ourListItem);
	}
}

let kantoList = document.createElement('ul');
let johtoList = document.createElement('ul');

getListOfPokemon(2, kantoList);

getListOfPokemon(3, johtoList);

document.addEventListener('DOMContentLoaded', ()=>{
	document.querySelector('.realkantoListContainer').appendChild(kantoList);
	document.querySelector('.realjohtoListContainer').appendChild(johtoList);
	let backButton = document.getElementById('backButton');
	backButton.addEventListener('click', ()=>{
		showIndiBox(false);
	})

});


async function loadPokemonData (pokemonURL) {
	let pokemonData = await fetchDataAndConvertToJson(pokemonURL);	
	return pokemonData;
}


function showIndiBox (show) {
	let indiPokeBox = document.querySelector('.pokeDataContainer');
	let kantoContainer = document.querySelector('.kantoListContainer');
	let johtoContainer = document.querySelector('.johtoListContainer');
	let backButton = document.getElementById('backButton');
	let typeContainer = document.getElementById('typeContainer');
	if (show) {
		backButton.classList.remove('hideMe');
		kantoContainer.classList.add('hideMe');
	johtoContainer.classList.add('hideMe');
	indiPokeBox.classList.remove('hideMe');
	}else{
		backButton.classList.add('hideMe');
		kantoContainer.classList.remove('hideMe');
		johtoContainer.classList.remove('hideMe');
		indiPokeBox.classList.add('hideMe');
		typeContainer.innerHTML = '';
		emptyTheParagraphs();
	}
}




async function fillPokemonDataIntoFields (pokemonURL) {
	let finalUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonURL.toLowerCase()}`;
	console.log(finalUrl);
	let ourPokemonData = await loadPokemonData(finalUrl);
	let pokemonHeading = document.querySelector('#pokeName');
	let ourPokeImage = document.querySelector('.pokeDataContainer img');

	ourPokeImage.src = `https://pokeres.bastionbot.org/images/pokemon/${ourPokemonData.id}.png`;


	pokemonHeading.innerText = ourPokemonData.name;
	let ourParaGraphs = document.getElementsByClassName('stat');
	let index = 0;
	console.log(ourPokemonData);
	for(let stat of ourPokemonData.stats){		
		ourParaGraphs[index].innerText = stat.base_stat;
		index +=1;
	}

	let typeContainer = document.querySelector('#typeContainer');

	for(let type of ourPokemonData.types){
		let typeEntry = document.createElement('p');
		typeEntry.innerText = type.type.name;
		typeContainer.appendChild(typeEntry);
	}
}
