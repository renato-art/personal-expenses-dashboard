import { createContext, FormEvent } from "react"

export interface Entry {
    id: string
    title: string
    value: number
    category: string
    createdOn: Date
}

export let entries: Entry[] = []
const defaultEntry: Entry = {
    id: "#0001",
    title: "Supermarket",
    value: 200,
    category: "Alimentation",
    createdOn: new Date()
} 
const localEntries = localStorage.getItem("perxp:entries")

if (localEntries) entries = JSON.parse(localEntries)
entries.push(defaultEntry)

export const RegistryContext = createContext({
    entries,
    setEntries: () => {},
    setNewEntry: (event: FormEvent<HTMLInputElement>) => {},
    entry: {
        id: "",
        title: "",
        category: "",
        value: 0,
        createdOn: new Date()
    }
})
