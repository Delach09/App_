import { useState } from "react"
import SearchBar from "../components/SearchBar"
import CharacterList from "../components/CharacterList"
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"
import useCharacters from "../hooks/useCharacters"
import Filter from "../components/Filter";

function Home() {

    const {
        characters,
        loading,
        error
    } = useCharacters()

    const [search, setSearch] = useState("")
    const [type, setType] = useState("")

const filteredCharacters = characters.filter(character => {

    const matchesSearch =
        character.name
            .toLowerCase()
            .includes(search.toLowerCase())

    const matchesType =
        !type ||
        character.types?.some(
            t => t.type.name === type
        )

    return matchesSearch && matchesType;
});



    if (loading) {
        return <Loader />
    }

    if (error) {
        return (
            <ErrorMessage
                message={error}
            />
        )
    }

    return (
        <>
            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <Filter
    type={type}
    setType={setType}
/>

            <CharacterList
                characters={filteredCharacters}
            />
        </>
    )
}

export default Home