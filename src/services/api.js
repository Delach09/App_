const API = "https://pokeapi.co/api/v2/pokemon?limit=151";

export async function getCharacters() {
try {
    const response = await fetch(API);

    if (!response.ok) {
    throw new Error(
        "No se pudieron obtener los Pokémon"
    );
    }

    const data = await response.json();

    const pokemons = await Promise.all(
    data.results.map(async (pokemon) => {

        const detailResponse = await fetch(
        pokemon.url
        );

        const detailData =
        await detailResponse.json();

        return {
        id: detailData.id,
        name: detailData.name,
        image: detailData.sprites.front_default,
        species: "Pokémon",
        types: detailData.types
        };
    })
    );

    return pokemons;

} catch (error) {

    console.error(error);

    throw new Error(
    "Error al conectar con la API"
    );

}
}