import { createContext, useState } from "react"

interface Entry {
    title: string
    value: number
    category: string
    createdOn: Date
}

const [ entries, setEntries ] = useState([])
const localEntries = localStorage.getItem("perxp:entries")

if (localEntries) setEntries(JSON.parse(localEntries))

export const RegistryContext = createContext({
    entries,
    setEntries
})
