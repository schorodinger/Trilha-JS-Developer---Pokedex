
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiDetailToPokemonItem(getPokemonItem) {
    const pokemon = new PokemonItem()
    pokemon.number = getPokemonItem.id
    pokemon.name = getPokemonItem.name

    pokemon.height = getPokemonItem.height
    pokemon.weight = getPokemonItem.weight

    pokemon.abilities = getPokemonItem.abilities.map((typeSlot) => typeSlot.ability.name)

    const types = getPokemonItem.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = getPokemonItem.sprites.other.dream_world.front_default

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonItem = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonItem)
}
