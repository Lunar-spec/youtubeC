import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const SearchBar = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")

    // Set initial search text from URL query parameter
    useEffect(() => {
        const query = searchParams.get("search_query")
        if (query) {
            setSearchText(query)
        }
    }, [searchParams])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (searchText.trim()) {
            navigate(`/results?search_query=${encodeURIComponent(searchText.trim())}`)
        }
    }

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="flex">
            <Input
                type="text"
                placeholder="Search"
                className="md:w-96 text-base rounded-l-full shadow-none"
                value={searchText}
                onChange={handleChange}
            />
            <Button
                type="submit"
                variant="outline"
                className="w-14 rounded-r-full bg-gray-100"
            >
                <HiMiniMagnifyingGlass className="text-2xl shadow-none" />
            </Button>
        </form>
    )
}

export default SearchBar